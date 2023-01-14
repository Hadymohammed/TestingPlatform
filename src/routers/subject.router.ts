import { Router } from "express";
import { index,addSubject, getById, getByName } from "../controllers/subjects.controller";

const subjectRouter=Router();

subjectRouter.get('/',index);
subjectRouter.get('/id',getById);
subjectRouter.get('/name',getByName);

subjectRouter.post('/create',addSubject);
export default subjectRouter;