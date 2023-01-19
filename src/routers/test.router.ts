import { Router } from "express";
import { createTest, getAllTests, getTestById, updateTest } from "../controllers/test.controller";

const testRouter=Router();
testRouter.get('/',getAllTests);
testRouter.get('/id',getTestById);

testRouter.patch('/update',updateTest);
testRouter.post('/create',createTest);

export default testRouter;