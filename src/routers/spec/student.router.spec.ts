import supertest, { Request, Response } from "supertest";
import {Headers} from 'node-fetch'
import request from 'superagent';
import app from "../../app";
import haveProperities from "../../utilities/objectBodyHaveProps.utility";
import { Student } from "../../models/students.model";

const superTest=supertest(app);

const student:Student={
    arabic_name:'مؤقت',
    english_name:'Temporary',
    username:'temporary',
    national_id:'11221122',
    password:'12345678' as string,
    phone:'0101313',
    university_id:'2020191056',
    grade:'SENIOR',
    faculty_id:1
}
describe('Student route suit',()=>{
    describe('GET : v0/student',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res=await superTest.get('/v0/student');
        })
        it("Should respond with status(200)",async ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an array of objects (students) ",async()=>{
            expect(res.body).toBeInstanceOf(Array);
        })
        it("Should student object has student_id,national_id,arabic_name,english_name,username,phone,faculty_id,university_id,grade",async()=>{
            const faculty=res.body[0];
            const expectedKeys=["student_id","national_id","arabic_name","english_name","username","phone","faculty_id",'university_id','grade'];
            expect(haveProperities(faculty,expectedKeys)).toEqual(true);
        })
    })
    
    describe('POST : v0/student/register',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res=await superTest.post('/v0/student/register').send(student);
        })
        it("Should respond with status(200)", ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an object (student) ",()=>{
            expect(res.body).toBeInstanceOf(Object);
        })
        it("Should response body object has student_id,national_id,arabic_name,english_name,username,phone,faculty_id,university_id,grade",()=>{
            const resStudent=res.body;
            const expectedKeys=["student_id","national_id","arabic_name","english_name","username","phone","faculty_id","university_id","grade"];
            expect(haveProperities(resStudent,expectedKeys)).toEqual(true);
        })
        it("Should response body equals to student object passed in the request",()=>{
            const resStudent=res.body;
            delete resStudent.student_id;
            delete resStudent.password;
            
            const tempStudent={...student};
            delete tempStudent.password;
            expect(resStudent).toEqual(tempStudent);
        })
        /*
        * unique testing(username,national_id)
        */
        it("Should respond with 400  duo national_id reserved value",async()=>{
            let studentUsername={...student};
            studentUsername.username='123';
            const resUsername=await superTest.post('/v0/student/register').send(studentUsername);

            expect(resUsername.status).toEqual(400);
        })
        it("Should respond with 400  duo username reserved value",async()=>{
            let studentNational={...student};
            studentNational.national_id='123';
            const resNational=await superTest.post('/v0/student/register').send(studentNational);

            expect(resNational.status).toEqual(400);
        })

    })

    describe('GET : v0/student/login',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            const loginObj={
                national_id:student.national_id,
                password:student.password
            }
            res=await superTest.post('/v0/student/login').send(loginObj);
        })
        it("Should respond with 200 for varified login",()=>{
            expect(res.status).toEqual(200);
        })
        it("Should respond with Object (student)",()=>{
            expect(res.body).toBeInstanceOf(Object);
        })
        it("Should response body object has student_id,national_id,arabic_name,english_name,username,phone,faculty_id,faculty,university_id,grade",()=>{
            const resStudent=res.body;
            const expectedKeys=["student_id","national_id","arabic_name","english_name","username","phone","faculty_id","faculty","university_id","grade"];
            expect(haveProperities(resStudent,expectedKeys)).toEqual(true);
        })
        it("Should response header contains token",()=>{
            const Header=new Headers(res.headers);
            expect(Header.get('set-cookie')).toBeDefined();
        })
        /*
        * unauthrized login  
        */
        it("Should respond with 401 due wrong national_id and don't get token",async()=>{
            const loginObj={
                national_id:student.national_id+'123',
                password:student.password
            }
            const unauthrizedRes=await superTest.post('/v0/student/login').send(loginObj);
            expect(unauthrizedRes.status).toEqual(401);
            expect(unauthrizedRes.header.token).not.toBeDefined();
        })
        it("Should respond with 401 due wrong password",async()=>{
            const loginObj={
                national_id:student.national_id,
                password:student.password+'123'
            }
            const unauthrizedRes=await superTest.post('/v0/student/login').send(loginObj);
            expect(unauthrizedRes.status).toEqual(401);
            expect(unauthrizedRes.header.token).not.toBeDefined();
        })
    })
})