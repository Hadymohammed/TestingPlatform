import jwt, { JwtPayload } from 'jsonwebtoken';
import { Admin } from "../../models/admins.model"
import { generateAdminToken, generateStudentToken } from "../tokens.services"
import dotenv from 'dotenv';
import { Student } from '../../models/students.model';
dotenv.config();
const secret = process.env.JWT_SECRET as string;

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
describe('Generate tokens suit',()=>{
    
    describe('Admin tokens',()=>{
        const token=generateAdminToken(admin);
        it("Should generateAdmintoken be defined",()=>{
            expect(generateAdminToken).toBeDefined();
        })
        it("Should generate token",()=>{
            expect(token).toBeDefined();
        });
        it("Should token be varified successfully",()=>{
            expect(()=>{
                jwt.verify(token, secret)
            }).not.toThrow();
        })
        it("Should change in token be fail in varifing",()=>{
            const tempToken=token+"hh";
            expect(()=>{
                jwt.verify(tempToken, secret)
            }).toThrowError();
        })
        it("Should JWT payload has admin_id , type",()=>{
            const {admin_id,type}=jwt.decode(token,{complete:true})?.payload as JwtPayload;
            
            expect(type).toBeDefined();
            expect(admin_id).toBeDefined();
        })
        it("Should JWT payload admin_id , type matches the admin",()=>{
            const {admin_id,type}=jwt.decode(token,{complete:true})?.payload as JwtPayload;
            
            expect(type).toEqual(admin.type as string);
            expect(admin_id).toEqual(admin.admin_id as number);
        })
    })

    describe('Student tokens',()=>{
        const token=generateStudentToken(student);
        it("Should generateStudentToken be defined",()=>{
            expect(generateStudentToken).toBeDefined();
        })
        it("Should generate token",()=>{
            expect(token).toBeDefined();
        });
        it("Should token be varified successfully",()=>{
            expect(()=>{
                jwt.verify(token, secret)
            }).not.toThrow();
        })
        it("Should change in token be fail in varifing",()=>{
            const tempToken=token+"hh";
            expect(()=>{
                jwt.verify(tempToken, secret)
            }).toThrowError();
        })
        it("Should JWT payload has student_id",()=>{
            const {student_id}=jwt.decode(token,{complete:true})?.payload as JwtPayload;
            
            expect(student_id).toBeDefined();
        })
        it("Should JWT payload student_id matches the student",()=>{
            const {student_id}=jwt.decode(token,{complete:true})?.payload as JwtPayload;
            
            expect(student_id).toEqual(admin.admin_id as number);
        })
    })
})