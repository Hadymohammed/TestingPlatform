import AdminModel, { Admin } from '../models/admins.model';
import { Request, Response } from 'express';
import { varifyAdmin } from '../services/varifyUser.services';
import hash from '../services/hash.services';
import missingKeys from '../services/varifyRequestBody.services';
import { generateAdminToken } from '../services/tokens.services';
const adminEntity = new AdminModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const admins = await adminEntity.getAll();
        for (const admin of admins) delete admin.password;
        res.send(admins);
    } catch (err) {
        res.send(err);
    }
};
const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const missing=missingKeys(req,["id"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }
        const id = req.body.id;
        const admin = await adminEntity.getById(id);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else {
            res.status(422).send('Wrong data');
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const getByNational = async (req: Request, res: Response): Promise<void> => {
    try {
        const missing=missingKeys(req,["national_id"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }
        const nid = req.body.national_id;
        const admin = await adminEntity.getByNational(nid);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else {
            res.status(422).send('Wrong data');
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const getByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        const missing=missingKeys(req,["username"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }
        const username = req.body.username;
        const admin = await adminEntity.getByUsername(username);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else {
            res.status(422).send('Wrong data');
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const national = req.body.national_id;
        const password = req.body.password;

        /*param validation*/
        const missing=missingKeys(req,["national_id","password"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }

        const admin = await varifyAdmin(national, password);
        if (admin) {
            delete admin.password;
            const token=generateAdminToken(admin);
            res.header({token}).send(admin);
        } else res.status(401).send('Wrong national Id or password');
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const admin: Admin = {
            type_id:req.body.type_id,
            arabic_name: req.body.arabic_name,
            english_name:req.body.english_name,
            national_id: req.body.national_id,
            password: req.body.password,
            username: req.body.username,
            phone:req.body.phone,
            faculty_id:req.body.faculty_id,
        };
        //params validation
        const missing=missingKeys(req,["arabic_name","english_name","username","national_id","password","phone","faculty_id","type_id"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }
        // unique keys validation
        let uniqueError: string[] = [];
        if ((await adminEntity.uniqueUsername(admin.username)) == false)
            uniqueError.push('username');
        if ((await adminEntity.uniqueNational(admin.national_id)) == false)
            uniqueError.push('national_id');
        if (uniqueError.length) {
            res.status(400).send('reserved keys : ' + uniqueError);
            return;
        }

        admin.password = hash(admin.password as string);
        const dbAdmin = await adminEntity.create(admin);
        if (dbAdmin) {
            delete dbAdmin.password;
            const token=generateAdminToken(admin);
            res.header({token}).send(dbAdmin);
        } else {
            res.status(422).send('Wrong data');
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const getAllTests=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,["admin_id"]);
    if(missing.length){
        res.status(400).send("Missing parameters : "+missing);
        return;
    }
    const admin_id:number=req.body.admin_id;
    try{
        const admin=await adminEntity.getById(admin_id);
        if(admin==null){
            res.status(422).send("Wrong data");
            return;
        }
        const tests=await adminEntity.getTests(admin_id);
        res.send(tests);
    }catch(err){
        res.status(500).send("Internal server error");
    }
}
export { index, getById, getByNational, getByUsername, login, register,getAllTests };
