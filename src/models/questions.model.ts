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
    async create(question: Question): Promise<Question[]> {
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
        return rows[0];
    }
    async addToTest(test: Test, question: Question): Promise<Question> {
        try {
            question.score = question.score = null ? 1 : question.score;
            const { rows } = await db.query(
                'insert into testQuestions (test_id,question_id,score) values ($1,$2,$3) RETURNING *',
                [test.id, question.id, question.score]
            );
            return rows[0];
        } catch (err) {
            question.id = 0; //error
            return question;
        }
    }
    async getById(id: number): Promise<Question | null> {
        const { rows } = await db.query('select * from questions where id=$1', [
            id,
        ]);
       if(rows.length) return rows[0];
       else return null;
    }
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
    async deleteById(question: Question): Promise<Question> {
        try {
            const { rows } = await db.query(
                'delete from questions where id=$1 RETURNING *',
                [question.id]
            );
            delete rows[0].password;
            return rows[0];
        } catch (err) {
            question.id = 0; //error
            return question;
        }
    }
    //////Question for student//////
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
