import { Router } from 'express';
import studentRouter from './student.router';
const router = Router();

router.use('/student', studentRouter);
export default router;
