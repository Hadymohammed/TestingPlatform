import { Router } from 'express';
import adminRouter from './admin.router';
import facultyRounter  from './faculty.router';
import questionRouter from './question.router';
import studentRouter from './student.router';
import subjectRouter from './subject.router';
import testRouter from './test.router';
const router = Router();

router.use('/student', studentRouter);
router.use('/admin', adminRouter);
router.use('/subject', subjectRouter);
router.use('/question',questionRouter);
router.use('/test',testRouter);
router.use('/faculty',facultyRounter);
export default router;
