import { Router } from "express";
import { addQuestion, getAll, getById, updateQuestion } from "../controllers/questions.controller";

const questionRouter=Router();

questionRouter.get('/',getAll);
questionRouter.get('/id',getById);
questionRouter.patch('/update',updateQuestion);
questionRouter.post('/create',addQuestion);

export default questionRouter;