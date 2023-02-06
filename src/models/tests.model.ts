import db from '../providers/database.provider';
import { Question } from './questions.model';
import { Student } from './students.model';

export interface Test {
    test_id?: number;
    student_id?: number;
    creator_id: number;
    language_id?: number;
    title: string;
    date?: number;
    total_questions: number;
    timer?: number;
    min_score?:number;
    public?:boolean;
    //score?:number;
}

class TestModel {
    async getAll(): Promise<Test[]> {
        const { rows } = await db.query('SELECT * FROM tests');
        return rows;
    }
    async create(Test: Test): Promise<Test | null> {
        try{
            const { rows } = await db.query(
                'insert into tests (title,total_questions,timer,creator_id,date,min_score,public,language_id) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                [
                    Test.title,
                    Test.total_questions,
                    Test.timer,
                    Test.creator_id,
                    Test.date,
                    Test.min_score,
                    Test.public,
                    Test.language_id
                ]
            );
            if(rows.length)return rows[0];
            else return null;
        }catch(err){
            return null;
        }
    }
    async getById(id: number): Promise<Test | null> {
        const { rows } = await db.query('select * from tests where test_id=$1', [
            id,
        ]);
        if(rows.length)return rows[0];
        else return null;
    }
    async updateById(Test: Test): Promise<Test | null> {
        try {
            const { rows } = await db.query(
                'update tests set title=$2,total_questions=$3,timer=$4,date=$5,public=$6,min_score=$7,language_id=$8 where test_id=$1 RETURNING *',
                [
                    Test.test_id,
                    Test.title,
                    Test.total_questions,
                    Test.timer,
                    Test.date,
                    Test.public,
                    Test.min_score,
                    Test.language_id
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
                [Test.test_id]
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
                'insert into student_test (test_id,student_id) values ($1,$2) RETURNING *',
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
                'delete from student_test where student_id=$1 and test_id=$2 RETURNING *',
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
            'select students.arabic_name,students.english_name,students.username,students.national_id,students.university_id from student_test join students on student_test.student_id=students.student_id where student_test.test_id=$1',
            [test_id]
        )
        return rows;
    }
    //////* questions *//////
    async getQuestions(test_id:string): Promise<Question[]|null> {
        try{
            const {rows}=await db.query(
                'select questions.content,questions.option1,questions.option2,questions.option3,questions.option4,test_question.score,test_question.test_id,test_question.question_id from test_question join questions on test_question.question_id=questions.question_id where test_question.test_id=$1',
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
