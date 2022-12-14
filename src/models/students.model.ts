import db from '../providers/database.provider';

export interface Student {
    id?: number;
    name: string;
    username: string;
    national_id: string;
    password?: string;
    university_id?: string;
}

class StudentModel {
    async getAll(): Promise<Student[]> {
        const { rows } = await db.query('SELECT * FROM students');
        /*for(const row of rows){
            delete row.password;
        }*/
        return rows;
    }
    async create(student: Student): Promise<Student> {
        const { rows } = await db.query(
            'insert into students (name,username,password,national_id,university_id) values ($1,$2,$3,$4,$5) RETURNING *',
            [
                student.name,
                student.username,
                student.password,
                student.national_id,
                student.university_id,
            ]
        );
        delete rows[0].password;
        return rows[0];
    }
    async getById(id: number): Promise<Student | null> {
        const { rows } = await db.query('select * from students where id=$1', [
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
    async getByUsername(username: string): Promise<Student> {
        const { rows } = await db.query(
            'select * from students where username=$1',
            [username]
        );
        delete rows[0].password;
        return rows[0];
    }
    async updateById(student: Student): Promise<Student> {
        try {
            const { rows } = await db.query(
                'update students set name=$2 where id=$1 RETURNING *',
                [student.id]
            );
            delete rows[0].password;
            return rows[0];
        } catch (err) {
            student.id = 0;
            return student;
        }
    }
    async updateByNationalId(student: Student): Promise<Student> {
        try {
            const { rows } = await db.query(
                'update students set name=$2 where national_id=$1 RETURNING *',
                [student.national_id]
            );
            delete rows[0].password;
            return rows[0];
        } catch (err) {
            student.id = 0;
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
}

export default StudentModel;
