import  {Request,Response }from 'express'
import SubjectModel, { Subject } from '../models/subjects.model'
import missingKeys from '../services/varifyRequestBody.services';

const subjectEntity=new SubjectModel();

const index=async(req:Request,res:Response):Promise<void>=>{
    try{
        const subjects:Subject[]=await subjectEntity.getAll();
        res.send(subjects);
    }catch(err){
        res.status(500);
    }
}
const addSubject=async(req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['name']);
    if(missing.length){
        res.status(400).send('Missing attribute : '+missing);
        return;
    }
    try{
        const subject:Subject={
            name:req.body.name
        }
        const dbSubject=await subjectEntity.create(subject);
        res.send(dbSubject);
    }catch(err){
        res.status(502);
    }
}
const getById=async(req:Request,res:Response):Promise<void>=>{
    try{
        const id=req.body.id;
        const missing=missingKeys(req,['id']);
        if(missing.length){
            res.status(400).send('Missing attribute : '+missing);
            return;
        }
        const subject=await subjectEntity.getById(id);
        if(subject)res.send(subject);
        else res.status(400).send('No such Id');
    }catch(err){
        res.status(502).send(err);
    }

}
const getByName=async(req:Request,res:Response):Promise<void>=>{
    const missing=missingKeys(req,['name']);
    if(missing.length){
        res.status(400).send('Missing attribute : '+missing);
        return;
    }
    try{
        const name=req.body.name;
        const subject=await subjectEntity.getByName(name);
        if(subject)res.send(subject)
        else res.status(400).send('No such name');
    }catch(err){
        res.send(502);
    }

}

export {index,getById,getByName,addSubject};