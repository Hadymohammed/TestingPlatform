import { Request, Response } from "express";
import { rmSync } from "fs";
import QuestionModel from "../models/questions.model";
import { Student } from "../models/students.model";
import TestModel from "../models/tests.model";
import missingKeys from "../services/varifyRequestBody.services";

const testEntity=new TestModel();
const questionEntity=new QuestionModel();

const getStudentsInTest=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['test_id']);
    if(missing.length){
        res.status(400).send('missing data : '+missing);
        return;
    }
    try{
        const students:Student[]=await testEntity.getStudents(req.body.test_id);
        res.send(students);
    }catch(err){
        res.status(500).send(err);
    }
}
const addTestToStudent=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['test_id','student_id']);
    if(missing.length){
        res.status(500).send('missing data : '+missing);
        return;
    }

    try{
        const test_id=req.body.test_id;
        const student_id=req.body.student_id;
        const dbTest=await testEntity.addToStudent(test_id,student_id);
        if(dbTest)res.send(dbTest);
        else res.status(400).send('invalid data');
    }catch(err){
        res.status(500).send(err);
    }
}
const removeStudentFromTest=async (req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['test_id','student_id']);
    if(missing.length){
        res.status(400).send('missing data : '+missing);
        return;
    }

    try{
        const test_id=req.body.test_id;
        const student_id=req.body.student_id;
        const dbTest=await testEntity.deleteFromStudent(test_id,student_id);
        if(dbTest)res.send(dbTest);
        else res.status(400).send('invalid data');
    }catch(err){
        res.status(500).send(err);
    }
}

export {addTestToStudent,removeStudentFromTest,getStudentsInTest};