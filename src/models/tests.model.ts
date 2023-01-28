import db from '../providers/database.provider';
import { Question } from './questions.model';
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
        try{
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
        }catch(err){
            return null;
        }
    }
    async getById(id: number): Promise<Test | null> {
        const { rows } = await db.query('select * from tests where id=$1', [
            id,
        ]);
        if(rows.length)return rows[0];
        else return null;
    }
    async updateById(Test: Test): Promise<Test | null> {
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
            else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
    async deleteById(Test: Test): Promise<Test | null> {
        try {
            const { rows } = await db.query(
                'delete from tests where id=$1 RETURNING *',
                [Test.id]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }

    ////////* Test_For_Student *////////
    async addToStudent(test_id:number, student_id: number): Promise<Test|null> {
        try {
            const { rows } = await db.query(
                'insert into testforstudent (test_id,student_id) values ($1,$2) RETURNING *',
                [test_id, student_id]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async deleteFromStudent(test_id:number, student_id: number): Promise<Test|null> {
        try {
            const { rows } = await db.query(
                'delete from testforstudent where student_id=$1 and test_id=$2 RETURNING *',
                [student_id, test_id]
            );
           if(rows.length)return rows[0];
           else return null;
        } catch (err) {
            return null;
        }
    }
    async getStudents(test_id:number):Promise<Student[]>{
        const {rows} = await db.query(
            'select students.name,students.username,students.national_id,students.university_id from testforstudent join students on testforstudent.student_id=students.id where testforstudent.test_id=$1',
            [test_id]
        )
        return rows;
    }
    //////* questions *//////
    async getQuestions(test_id:string): Promise<Question[]|null> {
        try{
            const {rows}=await db.query(
                'select questions.content,questions.option1,questions.option2,questions.option3,questions.option4,questions.correct_answer,testquestion.score,testquestion.test_id,testquestion.question_id from testquestion join questions on testQuestion.question_id=questions.id where testQuestion.test_id=$1',
                [test_id]
            )
            if(rows.length)return rows;
            else return null
        }catch(err){
            return null;
        }
    }
}
export default TestModel;
