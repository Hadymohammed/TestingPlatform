import db from '../providers/database.provider';
import { Student } from './students.model';
import { Subject } from './subjects.model';
import { Test } from './tests.model';
export interface Question {
    id?: number;
    content: string;
    test_id?: number;
    score?: number;
    subject_id: number;
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    correct_answer: string;
}

class QuestionModel {
    async getAll(): Promise<Question[]> {
        const { rows } = await db.query('SELECT * FROM questions');
        return rows;
    }
    async create(question: Question): Promise<Question | null> {
        try{
            const { rows } = await db.query(
                'insert into questions (content,subject_id,option1,option2,option3,option4,correct_answer) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                [
                    question.content,
                    question.subject_id,
                    question.option1,
                    question.option2,
                    question.option3,
                    question.option4,
                    question.correct_answer,
                ]
            );
            if(rows.length)return rows[0];
            else return null;
        }catch(err){
            return null;
        }
    }
    async getById(id: number): Promise<Question | null> {
        const { rows } = await db.query('select * from questions where id=$1', [
            id,
        ]);
        if(rows.length) return rows[0];
        else return null;
    }
    //* Not used
    async getBySubject(subject: Subject): Promise<Question[]> {
        const { rows } = await db.query(
            'select * from questions where subject_id=$1',
            [subject.id]
            );
            return rows;
        }
    async updateById(question: Question): Promise<Question  | null> {
        try {
            const { rows } = await db.query(
                'update questions set content=$2,subject_id=$3,option1=$4,option2=$5,option3=$6,option4=$7,correct_answer=$8  where id=$1 RETURNING *',
                [
                    question.id,
                    question.content,
                    question.subject_id,
                    question.option1,
                    question.option2,
                question.option3,
                question.option4,
                question.correct_answer,
            ]
        );
        if(rows.length)return rows[0];
        return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    async deleteById(question: Question): Promise<Question |null> {
        try {
            const { rows } = await db.query(
                'delete from questions where id=$1 RETURNING *',
                [question.id]
            );
            if(rows.length)
            return rows[0];
            else return null
        } catch (err) {
            return null;
        }
    }

    //////* Question to test *//////
    async addQuestionToTest(test_id:string, question_id: string,score:string='1'): Promise<Question|null> {
        try {
            const { rows } = await db.query(
                'insert into testQuestion (test_id,question_id,score) values ($1,$2,$3) RETURNING *',
                [test_id, question_id, score]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async deleteQuestionFromTest(test_id:number,question_id:number):Promise<Question | null>{
        try {
            const { rows } = await db.query(
                'delete from testQuestion where test_id=$1 and question_id=$2 RETURNING *',
                [test_id, question_id]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    
    //////* Question for student *//////
    async addToStudent(
        student: Student,
        question: Question
    ): Promise<Question> {
        try {
            const { rows } = await db.query(
                'INSERT INTO studentQuestion(question_id,student_id) values($1,$2) RETURNING *',
                [question.id, student.id]
            );
            return rows[0];
        } catch (err) {
            question.id = 0; //error
            return question;
        }
    }
    async deleteFromStudent(
        student: Student,
        question: Question
        ): Promise<Question> {
        try {
            const { rows } = await db.query(
                'delete from studentQuestion where question_id=$1 and student_id=$2) RETURNING *',
                [question.id, student.id]
            );
            return rows[0];
        } catch (err) {
            question.id = 0; //error
            return question;
        }
    }
}

export default QuestionModel;
