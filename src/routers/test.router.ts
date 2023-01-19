import { Router } from "express";
import { addQuestionToTest, createTest, getAllTests, getQuestionsInTest, getTestById, removeQuestionFromTest, updateTest } from "../controllers/test.controller";
import { addTestToStudent, getStudentsInTest, removeStudentFromTest } from "../controllers/testToStudent.controller";

const testRouter=Router();
testRouter.get('/',getAllTests);
testRouter.get('/id',getTestById);

testRouter.patch('/update',updateTest);
testRouter.post('/create',createTest);

testRouter.get('/question',getQuestionsInTest);
testRouter.post('/question',addQuestionToTest);
testRouter.delete('/question',removeQuestionFromTest);

testRouter.get('/student',getStudentsInTest);
testRouter.post('/student',addTestToStudent);
testRouter.delete('/student',removeStudentFromTest);

export default testRouter;