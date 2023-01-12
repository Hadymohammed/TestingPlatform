import AdminModel, { Admin } from '../models/admins.model';
import { Request, Response } from 'express';
import { varifyAdmin } from '../services/varifyUser.services';
import hash from '../services/hash.services';
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
        const id = req.body.admin_id;
        if (id == null) {
            res.status(400).send('admin_id is missing');
            return;
        }
        const admin = await adminEntity.getById(id);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else {
            res.send('Invalid Id');
        }
    } catch (err) {
        res.send(err);
    }
};
const getByNational = async (req: Request, res: Response): Promise<void> => {
    try {
        const nid = req.body.national_id;
        if (nid == null) {
            res.status(400).send('national_id is missing');
            return;
        }
        const admin = await adminEntity.getByNational(nid);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else {
            res.send('Invalid national_id');
        }
    } catch (err) {
        res.send(err);
    }
};
const getByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        const username = req.body.username;
        if (username == null) {
            res.status(400).send('username is missing');
            return;
        }
        const admin = await adminEntity.getByUsername(username);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else {
            res.send('Invalid username');
        }
    } catch (err) {
        res.send(err);
    }
};
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const national = req.body.national_id;
        const password = req.body.password;

        /*param validation*/
        let missingParam: string[] = [];
        if (national == null) missingParam.push('national_id');
        if (password == null) missingParam.push('password');
        if (missingParam.length) {
            res.status(400).send('Missing Parameters : ' + missingParam);
            return;
        }

        const admin = await varifyAdmin(national, password);
        if (admin) {
            delete admin.password;
            res.send(admin);
        } else res.status(401).send('Wrong national Id or password');
    } catch (err) {
        res.status(500).send(err);
    }
};
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const admin: Admin = {
            name: req.body.name,
            national_id: req.body.national_id,
            password: req.body.password,
            username: req.body.username,
        };
        //params validation
        let missingParam: string[] = [];
        if (admin.name == null) missingParam.push('name');
        if (admin.national_id == null) missingParam.push('national_id');
        if (admin.password == null) missingParam.push('password');
        if (admin.username == null) missingParam.push('username');

        if (missingParam.length) {
            res.status(400).send('Missing Parameters : ' + missingParam);
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
            res.send(dbAdmin);
        } else {
            res.send('Missing data');
        }
    } catch (err) {
        res.send(err);
    }
};
export { index, getById, getByNational, getByUsername, login, register };
