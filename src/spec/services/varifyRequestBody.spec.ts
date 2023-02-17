import missingKeys from '../../services/varifyRequestBody.services'
import { Request } from 'express';
import { mockRequest } from 'mock-req-res';
describe('varifyRequestBody Function',()=>{
    it('Should return list with required parameters when get empty request',()=>{
        const req:Request=mockRequest({
            body:{ }
        })
        const missing= missingKeys(req,["Name","Password"]);
        expect(missing).toEqual(["Name","Password"]);
    })
    it('Should return list with required parameters even in misspelling paramters in request',()=>{
        const req:Request=mockRequest({
            body:{
                Nam:"Hady",
                Password:"1234"
             }
        })
        const missing= missingKeys(req,["Name","Password"]);
        expect(missing).toEqual(["Name"]);
    })
    it('Should be case sensitive',()=>{
        const req:Request=mockRequest({
            body:{
                name:"Hady",
                Password:"1234"
             }
        })
        const missing= missingKeys(req,["Name","Password"]);
        expect(missing).toEqual(["Name"]);
    })
})