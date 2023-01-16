import { Request, Response } from "express";
import QuestionModel, { Question } from "../models/questions.model";

const questionEntity=new QuestionModel;
const getAll=async (req:Request,res:Response):Promise<void>=>{
    try{
        const questions:Question[]=await questionEntity.getAll();
        res.send(questions);
    }catch(err){
        res.send(err);
    }
}