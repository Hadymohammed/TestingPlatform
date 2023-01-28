import { Request, Response } from "express";
import QuestionModel, { Question } from "../models/questions.model";
import missingKeys from "../services/varifyRequestBody.services";

const questionEntity=new QuestionModel;
const getAll=async (req:Request,res:Response):Promise<void>=>{
    try{
        const questions:Question[]=await questionEntity.getAll();
        res.send(questions);
    }catch(err){
        res.send(err);
    }
}
const addQuestion=async(req:Request,res:Response):Promise<void>=>{
   const missing=missingKeys(req,['content','subject_id','option1','option2','option3','option4','correct_answer']);
   if(missing.length){
        res.status(400).send('Missing data : '+missing);
        return;
   }
   const question:Question={
    content:req.body.content,
    subject_id:req.body.subject_id,
    option1:req.body.option1,
    option2:req.body.option2,
    option3:req.body.option3,
    option4:req.body.option4,
    correct_answer:req.body.correct_answer
   }
   try{
   const dbQ=await questionEntity.create(question);
    if(dbQ)
        res.send(dbQ);
    else 
        res.status(422).send("Wrong data");
   }catch(err){
    res.status(500).send("Internal server error");
   }
}
const getById =async(req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['id']);
    if(missing.length){
        res.status(400).send('Missing data : '+missing);
        return;
   }
   try{
        const id=req.body.id;
        const question=await questionEntity.getById(id);
        if(question)res.send(question);
        else res.status(422).send('Wrong data');
   }catch(err){
        res.status(500).send("Internal server error");
   }
}
const updateQuestion=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['id','content','subject_id','option1','option2','option3','option4','correct_answer']);
    if(missing.length){
        res.status(400).send('Missing data : '+missing);
        return;
   }
   const question:Question={
    id:req.body.id,
    content:req.body.content,
    subject_id:req.body.subject_id,
    option1:req.body.option1,
    option2:req.body.option2,
    option3:req.body.option3,
    option4:req.body.option4,
    correct_answer:req.body.correct_answer
   }
   try{
   const dbQ=await questionEntity.updateById(question);
   if(dbQ)res.send(dbQ);
   else res.status(422).send('Wrong data');
   }catch(err){
    res.status(500).send("Internal server error");
   }
}

export {getAll,getById,addQuestion,updateQuestion};
