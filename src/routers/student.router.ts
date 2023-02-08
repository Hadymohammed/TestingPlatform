import { Router } from 'express';
import {
    index,
    getById,
    getByNational,
    getByUsername,
    login,
    register,
    getStudentTests,
} from '../controllers/students.controllers';
import logger from '../services/logger.services';
import verifyAuthStudentToken from '../utilities/middlewares/authToken.middleware';

const studentRouter = Router();

studentRouter.get('/', index);
studentRouter.get('/id',verifyAuthStudentToken, getById);
studentRouter.get('/national',verifyAuthStudentToken,getByNational);
studentRouter.get('/username',verifyAuthStudentToken, getByUsername);
studentRouter.get('/login', login);
studentRouter.get('/test',verifyAuthStudentToken,getStudentTests);

studentRouter.post('/', register);

export default studentRouter;
