import { Request, Response } from "express";
import facultyModel, { Faculty } from "../models/faculty.model";
import missingKeys from "../services/varifyRequestBody.services";

const facultyEntity=new facultyModel();

const getAll=async (req:Request,res:Response):Promise<void>=> {
    const faculty:Faculty[]=await facultyEntity.getAll();
    res.send(faculty);
}
const create=async (req:Request,res:Response):Promise<void>=> {
    const missing=missingKeys(req,["arabic_name","english_name"]);
    if(missing.length){
        res.status(400).send("Missing parameters : "+missing);
        return;
    }
    try{
        const faculty={
            arabic_name:req.body.arabic_name,
            english_name:req.body.english_name
        }
        const faculty_db=await facultyEntity.create(faculty);
        if(faculty_db){
            res.send(faculty);
        }
        else{
            res.status(500).send("Internal server error");
        }
        
    }catch(err){
        res.status(500).send("Internal server error");
    }
}
export {getAll,create};