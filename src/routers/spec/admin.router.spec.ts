import supertest, { Request, Response } from "supertest";
import {Headers} from 'node-fetch'
import request from 'superagent';
import app from "../../app";
import haveProperities from "../../utilities/objectBodyHaveProps.utility";
import { Admin } from "../../models/admins.model";

const superTest=supertest(app);

const admin:Admin={
    arabic_name:'مؤقت',
    english_name:'Temporary',
    username:'temporary',
    national_id:'11221122',
    password:'12345678' as string,
    phone:'0101313',
    type_id:1,
    faculty_id:1
}
describe('Admin route suit',()=>{
    describe('GET : v0/admin',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res=await superTest.get('/v0/admin');
        })
        it("Should respond with status(200)",async ()=>{
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
    
    describe('POST : v0/admin/register',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            res=await superTest.post('/v0/admin/register').send(admin);
        })
        it("Should respond with status(200)", ()=>{
            expect(res.status).toEqual(200);
        })
        it("Should return an object (admin) ",()=>{
            expect(res.body).toBeInstanceOf(Object);
        })
        it("Should response body object has admin_id,type_id,national_id,arabic_name,english_name,username,phone,faculty_id",()=>{
            const resAdmin=res.body;
            const expectedKeys=["admin_id","type_id","national_id","arabic_name","english_name","username","phone","faculty_id"];
            expect(haveProperities(resAdmin,expectedKeys)).toEqual(true);
        })
        it("Should response body equals to admin object passed in the request",()=>{
            const resAdmin=res.body;
            delete resAdmin.admin_id;
            delete resAdmin.password;
            
            const tempAdmin={...admin};
            delete tempAdmin.password;
            expect(resAdmin).toEqual(tempAdmin);
        })
        /*
        * unique testing(username,national_id)
        */
        it("Should respond with 400  duo national_id reserved value",async()=>{
            let adminUsername={...admin};
            adminUsername.username='123';
            const resUsername=await superTest.post('/v0/admin/register').send(adminUsername);

            expect(resUsername.status).toEqual(400);
        })
        it("Should respond with 400  duo username reserved value",async()=>{
            let adminNational={...admin};
            adminNational.national_id='123';
            const resNational=await superTest.post('/v0/admin/register').send(adminNational);

            expect(resNational.status).toEqual(400);
        })

    })

    describe('GET : v0/admin/login',()=>{
        let res:request.Response;
        beforeAll(async()=>{
            const loginObj={
                national_id:admin.national_id,
                password:admin.password
            }
            res=await superTest.post('/v0/admin/login').send(loginObj);
        })
        it("Should respond with 200 for varified login",()=>{
            console.log(res.text);
            expect(res.status).toEqual(200);
        })
        it("Should respond with Object (admin)",()=>{
            expect(res.body).toBeInstanceOf(Object);
        })
        it("Should response body object has admin_id,type_id,national_id,arabic_name,english_name,username,phone,faculty_id,faculty",()=>{
            const resAdmin=res.body;
            const expectedKeys=["admin_id","type_id","national_id","arabic_name","english_name","username","phone","faculty_id","faculty"];
            expect(haveProperities(resAdmin,expectedKeys)).toEqual(true);
        })
        it("Should response header contains token",()=>{
            const Header=new Headers(res.headers);
            console.log(Header.get('set-cookie'));
            expect(Header.get('set-cookie')).toBeDefined();
        })
        /*
        * unauthrized login  
        */
        it("Should respond with 401 due wrong national_id and don't get token",async()=>{
            const loginObj={
                national_id:admin.national_id+'123',
                password:admin.password
            }
            const unauthrizedRes=await superTest.post('/v0/admin/login').send(loginObj);
            expect(unauthrizedRes.status).toEqual(401);
            expect(unauthrizedRes.header.token).not.toBeDefined();
        })
        it("Should respond with 401 due wrong password",async()=>{
            const loginObj={
                national_id:admin.national_id,
                password:admin.password+'123'
            }
            const unauthrizedRes=await superTest.post('/v0/admin/login').send(loginObj);
            expect(unauthrizedRes.status).toEqual(401);
            expect(unauthrizedRes.header.token).not.toBeDefined();
        })
    })
})