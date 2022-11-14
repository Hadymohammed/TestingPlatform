import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user.model';

dotenv.config();
const generateToken = (user: User): string => {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign({ sub: user.id }, secret);
};
export default generateToken;
