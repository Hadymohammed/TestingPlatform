import db from '../providers/database.provider';
import { Test } from './tests.model';

export interface Student {
    student_id?: number;
    national_id: string;
    university_id?: string;
    arabic_name: string;
    english_name?: string;
    username: string;
    password?: string;
    phone?: string;
    faculty_id: number;
    faculty?:string;
    grade?:string;
}

class StudentModel {
    async getAll(): Promise<Student[]> {
        const { rows } = await db.query('SELECT * FROM students');
        return rows;
    }
    async create(student: Student): Promise<Student | null> {
        try{
            const { rows } = await db.query(
                'insert into students (arabic_name,username,password,national_id,university_id,english_name,phone,faculty_id,grade) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
                [
                    student.arabic_name,
                    student.username,
                    student.password,
                    student.national_id,
                    student.university_id,
                    student.english_name,
                    student.phone,
                    student.faculty_id,
                    student.grade
                ]
            );
            if(rows.length){
                delete rows[0].password;
                return rows[0];
            }
            else return null;
        }catch(err){
            return null;
        }
    }
    async getById(id: number): Promise<Student | null> {
        const { rows } = await db.query('select * from students where student_id=$1', [
            id,
        ]);
        if (rows.length) {
            delete rows[0].password;
            return rows[0];
        }
        return null;
    }
    async getByNational(nid: string): Promise<Student | null> {
        const { rows } = await db.query(
            'select * from students where national_id=$1',
            [nid]
        );
        if (rows.length) {
            return rows[0];
        }
        return null;
    }
    async getByUsername(username: string): Promise<Student | null> {
        const { rows } = await db.query(
            'select * from students where username=$1',
            [username]
        );
        if(rows.length){
            delete rows[0].password;
            return rows[0];
        }
        else return null;
    }
    
    //! need refactoring
    //* not used
    async updateById(student: Student): Promise<Student> { 
        try {
            const { rows } = await db.query(
                'update students set name=$2 where id=$1 RETURNING *',
                [student.student_id]
            );
            delete rows[0].password;
            return rows[0];
        } catch (err) {
            student.student_id = 0;
            return student;
        }
    }
    //! need refactoring
    //* not used
    async updateByNationalId(student: Student): Promise<Student> {
        try {
            const { rows } = await db.query(
                'update students set name=$2 where national_id=$1 RETURNING *',
                [student.national_id]
            );
            delete rows[0].password;
            return rows[0];
        } catch (err) {
            return student;
        }
    }
    async uniqueNational(national_id: string): Promise<boolean> {
        const { rows } = await db.query(
            'select * from students where national_id=$1',
            [national_id]
        );
        if (rows.length) return false;
        else return true;
    }
    async uniqueUsername(username: string): Promise<boolean> {
        const { rows } = await db.query(
            'select * from students where username=$1',
            [username]
        );
        if (rows.length) return false;
        else return true;
    }
    async uniqueUniversityId(uid: string): Promise<boolean> {
        const { rows } = await db.query(
            'select * from students where university_id=$1',
            [uid]
        );
        if (rows.length) return false;
        else return true;
    }
    //* Test
    async getAllTest(student_id:number):Promise<Test[]>{
        const {rows}= await db.query("select title,tests.test_id,date,score,public from tests join student_test on tests.test_id=student_test.test_id where student_test.student_id=$1",[student_id]);
        return rows;
    }
}

export default StudentModel;
