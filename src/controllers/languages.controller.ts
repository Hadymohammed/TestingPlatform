import { Request, Response } from "express";
import languageModel, { Language } from "../models/languages.model";
import missingKeys from "../services/varifyRequestBody.services";


const languageEntity=new languageModel();
const getAll=async (req:Request,res:Response):Promise<void>=>{
    const langs:Language[]=await languageEntity.getAll();
    res.send(langs);
}
const create=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,["name"]);
    if(missing.length){
        res.status(400).send("Missing parameters : "+missing);
        return;
    }
    const lang:Language={
        name:req.body.name
    }
    try{
        const dbLang=await languageEntity.create(lang);
        if(dbLang)res.send(dbLang);
        else res.status(500).send("Internal server error");
    }catch(err){
        res.status(500).send("Internal server error");
    }
}

export {getAll,create};
