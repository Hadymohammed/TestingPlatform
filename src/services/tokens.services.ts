import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Student } from '../models/students.model';

dotenv.config();
const generateStudentToken = (student: Student): string => {
    const secret = process.env.JWT_SECRET as string;
    const student_id=student.student_id;
    console.log(student.student_id);
    return jwt.sign({student_id},secret);
};
export default generateStudentToken;

