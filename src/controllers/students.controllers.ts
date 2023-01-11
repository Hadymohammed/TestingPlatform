import StudentModel, { Student } from "../models/students.model";
import { Response,Request } from "express";
import { defaults } from "pg";
import { varifyStudent } from "../services/varifyUser.services";
import hash  from "../services/hash.services";

const studentEntity = new StudentModel();

const index=async(req:Request,res:Response):Promise<void>=>{
    try{
    const students= await studentEntity.getAll();
    res.send(students);
    }
    catch(err){
        res.status(500).send(err);
    }
};8
const getById=async(req:Request,res:Response):Promise<void>=>{
    try{
        const student_id=req.body.student_id;
        const student= await studentEntity.getById(student_id);
        if(student)
            res.send(student);
        else
            res.send('Invalid Id');
        }
        catch(err){
            res.send(err);
        }
}
const getByNational=async(req:Request,res:Response):Promise<void>=>{
    const student_nid=req.body.national_id;
    try{
        const student= await studentEntity.getByNational(student_nid);
        if(student){
            delete student.password
             res.send(student);}
        else{
            res.send("Invalid national Id");
        }
        }
        catch(err){
            res.send(err);
        }
}
const getByUsername=async(req:Request,res:Response):Promise<void>=>{
    try{
        const username=req.body.username;
        const student:Student= await studentEntity.getByUsername(username);
        res.send(student);
        }
        catch(err){
            res.status(500).send('Invalid username');
        }
}
const login=async(req:Request,res:Response):Promise<void>=>{
    try{
        const national=req.body.national_id;
        const password=req.body.password;
        const student=await varifyStudent(national,password);
        console.log(student);
        if(student!=null){
            res.send(student);}
        else
            res.send('Wrong national Id or password')
        }
        catch(err){
            res.status(500).send(err);
        }
}
const register=async (req:Request,res:Response):Promise<void>=>{
    try{ 
        const student:Student={
            name: req.body.name,
            national_id:req.body.national_id,
            password:req.body.password,
            university_id:req.body.university_id,
            username:req.body.username
        }
        // todo validation
        /*
        unique username,national_id
        */
        student.password=hash(student.password as string);
        const dbStudent=await studentEntity.create(student);
        res.send(dbStudent);
        }catch(err){
            res.send(err);
        }
}
export {index,getById,getByNational,getByUsername,login,register};