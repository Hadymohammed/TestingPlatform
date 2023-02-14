import db from '../providers/database.provider';
import { Student } from './students.model';
import { Tag } from './tags.model';
import { Test } from './tests.model';
export interface Question {
    question_id?: number;
    test_id?: number;
    language_id:number;
    content: string;
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    correct_answer: string;
    score?: number;
    timer?:number;
    marked?:boolean;
    answer?:string;
}

class QuestionModel {
    async getAll(): Promise<Question[]> {
        const { rows } = await db.query('SELECT * FROM questions');
        return rows;
    }
    async create(question: Question): Promise<Question | null> {
        try{
            const { rows } = await db.query(
                'insert into questions (content,option1,option2,option3,option4,correct_answer,language_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                [
                    question.content,
                    question.option1,
                    question.option2,
                    question.option3,
                    question.option4,
                    question.correct_answer,
                    question.language_id,
                ]
            );
            if(rows.length)return rows[0];
            else return null;
        }catch(err){
            return null;
        }
    }
    async getById(id: number): Promise<Question | null> {
        const { rows } = await db.query('select * from questions where question_id=$1', [
            id,
        ]);
        if(rows.length) return rows[0];
        else return null;
    }
    //* Not used
    async getByTag(tag: Tag,question:Question): Promise<Question[]> {
        const { rows } = await db.query(
            'select * from question_tag where tag_id=$1 and question_id=$2',
            [tag.tag_id,
             question.question_id
            ]
            );
            return rows;
        }
    async updateById(question: Question): Promise<Question  | null> {
        try {
            const { rows } = await db.query(
                'update questions set content=$2,language_id=$3,option1=$4,option2=$5,option3=$6,option4=$7,correct_answer=$8  where question_id=$1 RETURNING *',
                [
                    question.question_id,
                    question.content,
                    question.language_id,
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
                'delete from questions where question_id=$1 RETURNING *',
                [question.question_id]
            );
            if(rows.length)
                return rows[0];
            else return null
        } catch (err) {
            return null;
        }
    }

    //////* Question to test *//////
    async addQuestionToTest(test_id:string, question_id: string,score:string='1',timer:number): Promise<Question|null> {
        try {
            const { rows } = await db.query(
                'insert into test_question (test_id,question_id,score,timer) values ($1,$2,$3,$4) RETURNING *',
                [test_id, question_id, score,timer]
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
                'delete from test_question where test_id=$1 and question_id=$2 RETURNING *',
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
    ): Promise<Question | null> {
        try {
            const { rows } = await db.query(
                'INSERT INTO student_question(question_id,student_id,test_id) values($1,$2,$3) RETURNING *',
                [question.question_id, student.student_id,question.test_id]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async deleteFromStudent(
        student: Student,
        question: Question
        ): Promise<Question | null> {
        try {
            const { rows } = await db.query(
                'delete from student_question where question_id=$1 and student_id=$2 and test_id=$3 RETURNING *',
                [question.question_id, student.student_id,question.test_id]
            );
            if(rows.length) return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
}

export default QuestionModel;
