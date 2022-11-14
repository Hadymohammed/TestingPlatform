import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.PEPPER;

const userEntity = new userModel();
const varifyUser = async (id: number, password: string): Promise<boolean> => {
    try {
        const dbUser = await userEntity.getById(id);
        if (bcrypt.compareSync(password + pepper, dbUser.password as string))
            return true;
        else {
            return false;
        }
    } catch (err) {
        return false;
    }
    return false;
};

export default varifyUser;
