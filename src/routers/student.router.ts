import { Router } from 'express';
import {
    index,
    getById,
    getByNational,
    getByUsername,
    login,
    register,
    getStudentTests,
    getStudentTestQuestions,
    getStudentProfile,
} from '../controllers/students.controllers';
import {verifyAuthStudentToken} from '../utilities/middlewares/authToken.middleware';

const studentRouter = Router();

studentRouter.get('/', index);
studentRouter.get('/id',verifyAuthStudentToken, getById);
studentRouter.get('/national',verifyAuthStudentToken,getByNational);
studentRouter.get('/username',verifyAuthStudentToken, getByUsername);
studentRouter.get('/test',verifyAuthStudentToken,getStudentTests);
studentRouter.get('/test/question',verifyAuthStudentToken,getStudentTestQuestions);
studentRouter.get('/profile',verifyAuthStudentToken,getStudentProfile);

studentRouter.post('/login', login);
studentRouter.post('/register', register);

export default studentRouter;
