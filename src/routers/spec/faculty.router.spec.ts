import { response } from 'express';
import supertest from 'supertest';
import app from '../../app';

const request=supertest(app);
describe("Faculty routes suit",()=>{
    describe("GET : v0/test/ ",()=>{

        it("Should response with array of faculty",async ()=>{
            const res= await request.get('v0/test/');

            console.log(res.body);
            expect(res.status).toEqual(200);
        })

    })
})