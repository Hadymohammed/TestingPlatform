import { Router } from 'express';
import {
    getAllTests,
    getById,
    getByNational,
    getByUsername,
    getAdminProfile,
    index,
    login,
    register,
} from '../controllers/admins.controller';
import { verifyAuthAdminToken, verifyAuthSuperAdminToken } from '../utilities/middlewares/authToken.middleware';

const adminRouter = Router();

adminRouter.get('/', index);
adminRouter.get('/id',verifyAuthAdminToken, getById);
adminRouter.get('/national',verifyAuthAdminToken, getByNational);
adminRouter.get('/username',verifyAuthAdminToken, getByUsername);
adminRouter.get('/test',verifyAuthAdminToken,getAllTests);

adminRouter.get('/profile',verifyAuthAdminToken,getAdminProfile);

adminRouter.post('/login', login);
adminRouter.post('/register', register);

export default adminRouter;
