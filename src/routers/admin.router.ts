import { Router } from 'express';
import {
    getById,
    getByNational,
    getByUsername,
    index,
    login,
    register,
} from '../controllers/admins.controller';

const adminRouter = Router();

adminRouter.get('/', index);
adminRouter.get('/id', getById);
adminRouter.get('/national', getByNational);
adminRouter.get('/username', getByUsername);
adminRouter.get('/login', login);

adminRouter.post('/register', register);

export default adminRouter;
