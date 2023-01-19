import { Router } from 'express';
import adminRouter from './admin.router';
import questionRouter from './question.router';
import studentRouter from './student.router';
import subjectRouter from './subject.router';
const router = Router();

router.use('/student', studentRouter);
router.use('/admin', adminRouter);
router.use('/subject', subjectRouter);
router.use('/question',questionRouter);
export default router;
