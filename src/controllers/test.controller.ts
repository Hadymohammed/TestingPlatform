import { Request, Response } from "express";
import TestModel, { Test } from "../models/tests.model";
import missingKeys from "../services/varifyRequestBody.services";

const testEntity=new TestModel();
const getAllTests=async (req:Request,res:Response):Promise<void>=>{
    const test=await testEntity.getAll();
    res.send(test);
}
const createTest=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['title','total_questions','timer','creator_id','date']);
    if(missing.length){
        res.status(400).send('Missing data: '+missing);
        return;
    }

    const test:Test={
        title:req.body.title,
        total_questions:req.body.total_questions,
        timer:req.body.timer,
        creator_id:req.body.creator_id,
        date:req.body.date
    }
    try{
        const dbTest=await testEntity.create(test);
        if(dbTest)res.send(dbTest);
        else res.status(500);
    }catch(err){
        res.status(500).send(err);
    }
}
const getTestById=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['id']);
    if(missing.length){
        res.status(400).send(missing);
        return;
    }
    try{
        const dbTest=await testEntity.getById(req.body.id);
        if(dbTest)res.send(dbTest);
        else res.status(400).send('Invalid Id');
    }catch(err){
        res.status(500).send(err);
    }
}
const updateTest=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['id','title','total_questions','timer','creator_id','date']);
    if(missing.length){
        res.status(400).send('Missing data: '+missing);
        return;
    }

    const test:Test={
        id:req.body.id,
        title:req.body.title,
        total_questions:req.body.total_questions,
        timer:req.body.timer,
        creator_id:req.body.creator_id,
        date:req.body.date
    }
    try{
        const dbTest=await testEntity.updateById(test);
        if(dbTest)res.send(dbTest);
        else res.status(500),('invalid id');
    }catch(err){
        res.status(500).send(err);
    }
}

export {getAllTests,getTestById,createTest,updateTest};
