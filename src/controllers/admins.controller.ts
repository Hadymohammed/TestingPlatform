import AdminModel, { Admin } from "../models/admins.model";
import { Request,Response } from "express";
import { varifyAdmin } from "../services/varifyUser.services";
import hash from "../services/hash.services";
const adminEntity=new AdminModel();

const index=async (req:Request,res:Response):Promise<void>=>{
    try{
        const admins=await adminEntity.getAll();
        for (const admin of admins) 
            delete admin.password;
        res.send(admins);
    }catch(err){
        res.send(err);
    }
}
const getById=async (req:Request,res:Response):Promise<void>=>{
    try{
        const id=req.body.admin_id;
        const admin=await adminEntity.getById(id);
        if(admin){
            delete admin.password;
            res.send(admin);
        }
        else{
            res.send('Invalid Id');
        }
    }catch(err){
        res.send(err);
    }
}
const getByNational=async (req:Request,res:Response):Promise<void>=>{
    try{
        const nid=req.body.national_id;
        const admin=await adminEntity.getByNational(nid);
        if(admin){
            delete admin.password;
            res.send(admin);
        }
        else{
            res.send('Invalid national_id');
        }
    }catch(err){
        res.send(err);
    }
}
const getByUsername=async (req:Request,res:Response):Promise<void>=>{
    try{
        const username=req.body.username;
        const admin=await adminEntity.getByUsername(username);
        if(admin){
            delete admin.password;
            res.send(admin);
        }
        else{
            res.send('Invalid username');
        }
    }catch(err){
        res.send(err);
    }
}
const login=async(req:Request,res:Response):Promise<void>=>{
    try{
        const national=req.body.national_id;
        const password=req.body.password;
        const admin=await varifyAdmin(national,password);
        if(admin){
            delete admin.password;
            res.send(admin);}
        else
            res.status(401).send('Wrong national Id or password')
        }
        catch(err){
            res.status(500).send(err);
        }
}
const register=async (req:Request,res:Response):Promise<void>=>{
    try{ 
        const admin:Admin={
            name: req.body.name,
            national_id:req.body.national_id,
            password:req.body.password,
            username:req.body.username
        }
        // todo validation
        /*
        unique username,national_id
        */
        admin.password=hash(admin.password as string);
        const dbAdmin=await adminEntity.create(admin);
        if(dbAdmin) {
            delete dbAdmin.password;
            res.send(dbAdmin);
        }else{
            res.send('Missing data');
        }
        }catch(err){
            res.send(err);
        }
}
export {index,getById,getByNational,getByUsername,login,register};