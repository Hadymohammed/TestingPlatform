import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { ENV, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_NAME_TEST } = process.env;

let db: Pool = new Pool();
if (ENV === 'dev') {
    db = new Pool({
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME,
        password: DB_PASS,
    });
}

if (ENV === 'test') {
    db = new Pool({
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME_TEST,
        password: DB_PASS,
    });
}

export default db;
