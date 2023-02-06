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

const studentRouter = Router();

studentRouter.get('/', index);
studentRouter.get('/id', getById);
studentRouter.get('/national', logger, getByNational);
studentRouter.get('/username', getByUsername);
studentRouter.get('/login', login);
studentRouter.get('/test',getStudentTests);

studentRouter.post('/', register);

export default studentRouter;
