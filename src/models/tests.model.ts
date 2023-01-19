import db from '../providers/database.provider';
import { Student } from './students.model';

export interface Test {
    id?: number;
    student_id?: number;
    title: string;
    date?: Date;
    total_questions?: number;
    timer: number;
    creator_id: number;
}

class TestModel {
    async getAll(): Promise<Test[]> {
        const { rows } = await db.query('SELECT * FROM tests');
        return rows;
    }
    async create(Test: Test): Promise<Test | null> {
        const { rows } = await db.query(
            'insert into tests (title,total_questions,timer,creator_id,date) values ($1,$2,$3,$4,$5) RETURNING *',
            [
                Test.title,
                Test.total_questions,
                Test.timer,
                Test.creator_id,
                Test.date,
            ]
        );
        if(rows.length)return rows[0];
        else return null;
    }
    async getById(id: number): Promise<Test | null> {
        const { rows } = await db.query('select * from tests where id=$1', [
            id,
        ]);
        if(rows.length)return rows[0];
        else return null;
    }
    async updateById(Test: Test): Promise<Test|null> {
        try {
            const { rows } = await db.query(
                'update tests set title=$2,total_questions=$3,timer=$4,date=$5 where id=$1 RETURNING *',
                [
                    Test.id,
                    Test.title,
                    Test.total_questions,
                    Test.timer,
                    Test.date,
                ]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async deleteById(Test: Test): Promise<Test> {
        try {
            const { rows } = await db.query(
                'delete from tests where id=$1 RETURNING *',
                [Test.id]
            );
            return rows[0];
        } catch (err) {
            Test.id = 0;
            return Test;
        }
    }
    ///////Test_For_Student////////
    async addToStudent(test: Test, student: Student): Promise<Test> {
        try {
            const { rows } = await db.query(
                'insert into tests_for_student (test_id,student_id) values ($1,$2) RETURNING *',
                [test.id, student.id]
            );
            test.student_id = rows[0].student_id;
            return test;
        } catch (err) {
            test.id = 0; //error
            return test;
        }
    }
    async deleteFromStudent(test: Test, student: Student): Promise<Test> {
        try {
            const { rows } = await db.query(
                'delete from tests_for_student where student_id=$1 and test_id=$2 RETURNING *',
                [student.id, test.id]
            );
            test.student_id = rows[0].student_id;
            return test;
        } catch (err) {
            test.id = 0; //error
            return test;
        }
    }
}
export default TestModel;
