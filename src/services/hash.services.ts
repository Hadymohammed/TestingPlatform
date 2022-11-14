import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.PEPPER;
const salt = process.env.SALT_ROUNDS as string;

const hash = (password: string): string => {
    return bcrypt.hashSync(password + pepper, parseInt(salt));
};

export default hash;
