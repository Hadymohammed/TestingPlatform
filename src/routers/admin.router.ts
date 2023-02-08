import { Router } from 'express';
import {
    getAllTests,
    getById,
    getByNational,
    getByUsername,
    index,
    login,
    register,
} from '../controllers/admins.controller';
import { verifyAuthAdminToken, verifyAuthSuperAdminToken } from '../utilities/middlewares/authToken.middleware';

const adminRouter = Router();

adminRouter.get('/', index);
adminRouter.get('/login', login);
adminRouter.get('/id',verifyAuthAdminToken, getById);
adminRouter.get('/national',verifyAuthAdminToken, getByNational);
adminRouter.get('/username',verifyAuthAdminToken, getByUsername);
adminRouter.get('/test',verifyAuthAdminToken,getAllTests);

adminRouter.post('/register', register);

export default adminRouter;
