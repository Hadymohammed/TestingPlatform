import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthStudentToken = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET as string;
    try {
        const token = req.cookies.token;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(401).send({error:"token verification faild"});
    }
};

const verifyAuthSuperAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET as string;
    try {
        const token =req.cookies.token;
        jwt.verify(token, secret);
        const type=jwt.decode(token,{complete:true})?.payload.at('type');
        if(type!=="Super")throw Error ("token verification faild");
        next();
    } catch (error) {
        res.status(401).send({error:"token verification faild"});
    }
};
const verifyAuthAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET as string;
    try {
        const token = req.cookies.token;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(401).send({error:"token verification faild"});
    }
};
export {verifyAuthStudentToken,verifyAuthSuperAdminToken,verifyAuthAdminToken};
