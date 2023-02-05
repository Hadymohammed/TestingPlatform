import bcrypt from 'bcrypt';
import StudentModel, { Student } from '../models/students.model';
import dotenv from 'dotenv';
import AdminModel, { Admin } from '../models/admins.model';
import facultyModel, { Faculty } from '../models/faculty.model';
import db from '../providers/database.provider';
import adminTypeModel, { AdminType } from '../models/admin_type.model';

dotenv.config();
const pepper = process.env.PEPPER;

const studentEntity = new StudentModel();
const facultyEntity=new facultyModel();
const adminEntity = new AdminModel();
const admin_typeEntity=new adminTypeModel();
const varifyStudent = async (
    national: string,
    password: string
): Promise<Student | null> => {
    try {
        const dbStudent = await studentEntity.getByNational(national);
        if (
            dbStudent &&
            bcrypt.compareSync(password + pepper, dbStudent.password as string)
        ) {
          const faculty:Faculty | null=await facultyEntity.getById(dbStudent.faculty_id);
           if(faculty)dbStudent.faculty=faculty.arabic_name;
            return dbStudent;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
};
const varifyAdmin = async (
    national: string,
    password: string
): Promise<Admin | null> => {
    try {
        const dbAdmin = await adminEntity.getByNational(national);
        if (
            dbAdmin &&
            bcrypt.compareSync(password + pepper, dbAdmin.password as string)
        ) {
           const faculty:Faculty | null=await facultyEntity.getById(dbAdmin.faculty_id);
            if(faculty)dbAdmin.faculty=faculty.arabic_name;
           const ttype:AdminType | null=await admin_typeEntity.getById(dbAdmin.type_id);
            if(ttype)dbAdmin.type=ttype.type;
            return dbAdmin;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
};

export { varifyStudent, varifyAdmin };
