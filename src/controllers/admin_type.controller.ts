import e, { Request, Response } from "express";
import adminTypeModel, { AdminType } from "../models/admin_type.model";
import missingKeys from "../services/varifyRequestBody.services";

const admin_typeEntity=new adminTypeModel();
const getAll=async(req:Request,res:Response):Promise<void>=>{
    try{
        const types:AdminType[]=await admin_typeEntity.getAll();
        res.send(types);
    }catch(err){
        res.status(500).send("Internal server error");
    }
}
const create=async(req:Request,res:Response):Promise<void>=>{
    const missing = missingKeys(req,["type"]);
    if(missing.length){
        res.status(400).send("Missing parameters : "+missing);
        return;
    }
    try{
        const adminType={
            type:req.body.type
        }
        const dbType=await admin_typeEntity.create(adminType);
        if(dbType){
            res.send(dbType);
        }
        else {
            res.status(500).send("Internal server error");
        }
    }catch(err){
        res.status(500).send("Internal server error");
    }
}
export {getAll,create};