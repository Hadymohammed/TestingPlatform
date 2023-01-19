import { Request, Response } from "express";
import QuestionModel from "../models/questions.model";
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
/****Questions****/
const questionEntity=new QuestionModel();
const getQuestionsInTest=async(req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['test_id']);
    if(missing.length){
        res.status(400).send('missing data : '+missing);
        return;
    }
    try{
        const dbQuestions=await testEntity.getQuestions(req.body.test_id);
        if(dbQuestions)res.send(dbQuestions);
        else res.status(500).send('invalid data');
    }catch(err){
        res.status(500).send(err);
    }

}
const addQuestionToTest=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['test_id','question_id','score']);
    if(missing.length){
        res.status(400).send('missing data : '+missing);
        return;
    }

    try{
        const test_id=req.body.test_id;
        const question_id=req.body.question_id;
        const score=req.body.score;
        const dbQuestion=await questionEntity.addQuestionToTest(test_id,question_id,score);
        if(dbQuestion)res.send(dbQuestion);
        else res.status(400).send('invalid data');
    }catch(err){
        res.status(500).send(err);
    }
}
const removeQuestionFromTest=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['test_id','question_id']);
    if(missing.length){
        res.status(500).send('missing data : '+missing);
        return;
    }

    try{
        const test_id=req.body.test_id;
        const question_id=req.body.question_id;
        const dbQuestion=await questionEntity.deleteQuestionFromTest(test_id,question_id);
        if(dbQuestion)res.send(dbQuestion);
        else res.status(400).send('invalid data');
    }catch(err){
        res.status(500).send(err);
    }
}

export {getAllTests,getTestById,createTest,updateTest,addQuestionToTest,removeQuestionFromTest,getQuestionsInTest};
