import bcrypt from 'bcrypt';
import StudentModel, { Student } from '../models/students.model';
import dotenv from 'dotenv';
import AdminModel, { Admin } from '../models/admins.model';

dotenv.config();
const pepper = process.env.PEPPER;

const studentEntity = new StudentModel();
const adminEntity = new AdminModel();
const varifyStudent = async (
    national: string,
    password: string
): Promise<Student | null> => {
    try {
        const dbStudent = await studentEntity.getByNational(national);
        if (
           dbStudent && bcrypt.compareSync(password+pepper,dbStudent.password as string)
        ) {
            delete dbStudent.password;
            return dbStudent;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
    return null;
};
const varifyAdmin = async (
    national: string,
    password: string
): Promise<Admin | null> => {
    try {
        const dbAdmin = await adminEntity.getByNational(national);
        if (bcrypt.compareSync(password + pepper, dbAdmin.password as string)) {
            delete dbAdmin.password;
            return dbAdmin;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
    return null;
};

export { varifyStudent, varifyAdmin };
