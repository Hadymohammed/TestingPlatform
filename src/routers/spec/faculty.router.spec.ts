import { Response } from 'express';
import request from 'superagent';
import supertest from 'supertest';
import app from '../../app';
import { Faculty } from '../../models/faculty.model';
import haveProperities from '../../utilities/objectBodyHaveProps.utility';

const superTest=supertest(app);
describe("Faculty routes suit",()=>{
    describe("GET : v0/faculty/ ",()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res= await superTest.get('/v0/faculty/');
        })
        it("Should response with status(200)",async ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an array of objects (faculties) ",async()=>{
            expect(res.body).toBeInstanceOf(Array);
        })
        it("Should faculty object has faculty_id,arabic_name,english_name",async()=>{
            const faculty=res.body[0];
            const expectedKeys=['faculty_id','arabic_name','english_name'];
            expect(haveProperities(faculty,expectedKeys)).toEqual(true);
        })
    })
    describe("POST : v0/faculty ",()=>{
        let res:request.Response;
        const faculty:Faculty={
            arabic_name:"مؤقت",
            english_name:"Temporary"
        }
        beforeAll(async()=>{
            res= await superTest.post('/v0/faculty').send(faculty);
        })
        it("Should response with status(200)",async ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should response body has arabic_name,english_name",async()=>{
            const resFaculty=res.body;
            const expectedKeys=['arabic_name','english_name'];
            expect(haveProperities(resFaculty,expectedKeys)).toEqual(true);
        })
        it("Should response body equals to faculty object passed in the request",async()=>{
            const resFaculty=res.body;
            delete resFaculty.faculty_id;
            expect(resFaculty).toEqual(faculty);
        })
    })
})