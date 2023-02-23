import supertest, { Request, Response } from "supertest";
import request from 'superagent';
import app from "../../app";
import haveProperities from "../../utilities/objectBodyHaveProps.utility";

const superTest=supertest(app);

describe('Admin route suit',()=>{
    describe('GET : v0/admin',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res=await superTest.get('/v0/admin');
        })
        it("Should response with status(200)",async ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an array of objects (admins) ",async()=>{
            expect(res.body).toBeInstanceOf(Array);
        })
        it("Should admin object has admin_id,type_id,national_id,arabic_name,english_name,username,phone,faculty_id",async()=>{
            const faculty=res.body[0];
            const expectedKeys=["admin_id","type_id","national_id","arabic_name","english_name","username","phone","faculty_id"];
            expect(haveProperities(faculty,expectedKeys)).toEqual(true);
        })
    })
})