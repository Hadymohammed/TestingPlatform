import { Router } from 'express';
import adminRouter from './admin.router';
import studentRouter from './student.router';
const router = Router();

router.use('/student', studentRouter);
router.use('/admin',adminRouter);
export default router;
