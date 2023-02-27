import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Student } from '../models/students.model';
import { Admin } from '../models/admins.model';

dotenv.config();
export interface AdminToken {
    admin_id: number;
    type: string;
    iat:number;
}
export interface StudentToken {
    student_id: number;
    iat:number;
}
const generateStudentToken = (student: Student): string => {
    const secret = process.env.JWT_SECRET as string;
    const student_id=student.student_id;
    return jwt.sign({student_id},secret);
};
const generateAdminToken = (admin: Admin): string => {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign({admin_id:admin.admin_id,type:admin.type},secret);
};
export {generateStudentToken,generateAdminToken};

