import supertest, { Request, Response } from "supertest";
import request from 'superagent';
import app from "../../app";
import haveProperities from "../../utilities/objectBodyHaveProps.utility";
import { Admin } from "../../models/admins.model";

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
    /*
    !! unique testing should be add
    (username,national_id)
    */
    describe('POST : v0/admin/register',()=>{
        let res:request.Response;
        const admin:Admin={
            arabic_name:'مؤقت',
            english_name:'Temporary',
            username:'temp',
            national_id:'1122',
            password:'12345678',
            phone:'0101313',
            type_id:1,
            faculty_id:1
        }
        beforeAll(async()=>{
            res=await superTest.post('/v0/admin/register').send(admin);
        })
        it("Should response with status(200)",async ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an object (admin) ",async()=>{
            expect(res.body).toBeInstanceOf(Object);
        })
        it("Should response body object has admin_id,type_id,national_id,arabic_name,english_name,username,phone,faculty_id",async()=>{
            const resAdmin=res.body;
            const expectedKeys=["admin_id","type_id","national_id","arabic_name","english_name","username","phone","faculty_id"];
            expect(haveProperities(resAdmin,expectedKeys)).toEqual(true);
        })
        it("Should response body equals to admin object passed in the request",async()=>{
            const resAdmin=res.body;
            delete resAdmin.admin_id;
            delete resAdmin.password;
            
            const tempAdmin=admin;
            delete tempAdmin.password;
            expect(resAdmin).toEqual(admin);
        })

    })
})