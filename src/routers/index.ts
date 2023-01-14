import { Router } from 'express';
import adminRouter from './admin.router';
import studentRouter from './student.router';
import subjectRouter from './subject.router';
const router = Router();

router.use('/student', studentRouter);
router.use('/admin', adminRouter);
router.use('/subject',subjectRouter);
export default router;
