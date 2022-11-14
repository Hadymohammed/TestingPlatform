import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET as string;
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(401);
        res.json(error);
    }
};
export default verifyAuthToken;
