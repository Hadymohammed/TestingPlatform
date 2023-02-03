import { Router } from 'express';
import adminRouter from './admin.router';
import admin_typeRouter from './admin_type.router';
import facultyRounter  from './faculty.router';
import languageRouter from './languages.router';
import questionRouter from './question.router';
import studentRouter from './student.router';
import tagRouter from './tag.router';
import testRouter from './test.router';
const router = Router();

router.use('/student', studentRouter);
router.use('/admin', adminRouter);
router.use('/tag', tagRouter);
router.use('/question',questionRouter);
router.use('/test',testRouter);
router.use('/faculty',facultyRounter);
router.use('/adminType',admin_typeRouter);
router.use('/language',languageRouter);

export default router;
