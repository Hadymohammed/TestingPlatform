/*import { NextFunction, Request, Response } from 'express';
import mockReqRes, { mockRequest, mockResponse } from "mock-req-res"
import Sinon, { SinonSpy } from 'sinon';
import { Admin } from "../../models/admins.model"
import { Student } from "../../models/students.model"
import { generateAdminToken, generateStudentToken } from "../../services/tokens.services"
import { verifyAuthSuperAdminToken } from "../../utilities/middlewares/authToken.middleware"

const admin:Admin={
    national_id:"12121212",
    admin_id:1,
    arabic_name:"عبدالهادي محمد",
    type:"Super",
    type_id:1,
    username:"hady",
    faculty_id:1
}
const student:Student={
    student_id:1,
    national_id:"112233",
    username:"Mohamed",
    arabic_name:"محمد",
    faculty_id:1
}
const adminToken=generateAdminToken(admin);
const studentToken=generateStudentToken(student);

describe('Verify Tokens middleware suit',()=>{
    describe('Admin Tokens',()=>{
        it('Should be valid token for superAdmin',()=>{
            const req:Request=mockRequest({
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`, 
                }
            });
            const res:Response=mockResponse();
            const obj={
                next:()=>{}
            }
            spyOn(obj,'next');
            verifyAuthSuperAdminToken(req,res,obj.next);
            expect(obj.next).toHaveBeenCalled();
        })
        it('Should be unvalid token for superAdmin',()=>{
            const req:Request=mockRequest({
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${adminToken+'x'}`, 
                }
            });
            const res:Response=mockResponse({
                sendStatus:(code:number)=>{return code}
            });
            const obj={
                next:()=>{}
            }
            spyOn(obj,'next');
            verifyAuthSuperAdminToken(req,res,obj.next);
            console.log(res.statusCode);
            expect(res.statusCode).toEqual(401);
        })
    })
})*/