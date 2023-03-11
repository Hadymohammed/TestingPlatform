import supertest, { Request, Response } from "supertest";
import {Headers} from 'node-fetch'
import request from 'superagent';
import app from "../../app";
import haveProperities from "../../utilities/objectBodyHaveProps.utility";
import { Question } from "../../models/questions.model";

const superTest=supertest(app);

const question:Question={
    content:'question',
    option1:'op1',
    option2:'op2',
    option3:'op3',
    option4:'op4',
    language_id:2,
    correct_answer:'op1',
}
describe('Question router suit',()=>{
    describe('GET : v0/question',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res=await superTest.get('/v0/question');
        })
        it("Should respond with status(200)",async ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an array of objects (questions) ",async()=>{
            expect(res.body).toBeInstanceOf(Array);
        })
        it("Should question object has question_id,content,option1,option2,option3,option4,correct_answer,language_id,creator_id",async()=>{
            const faculty=res.body[0];
            const expectedKeys=["question_id","content","option1","option2","option3","option4","correct_answer",'language_id','creator_id'];
            expect(haveProperities(faculty,expectedKeys)).toEqual(true);
        })
    })
    
})