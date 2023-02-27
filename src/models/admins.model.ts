import db from '../providers/database.provider';
import { Test } from './tests.model';

export interface Admin {
    admin_id?: number;
    type_id:number;
    type?:string;
    arabic_name: string;
    english_name?: string;
    username: string;
    national_id: string;
    password?: string;
    phone?:string;
    faculty_id:number;
    faculty?:string;
}

class AdminModel {
    async getAll(): Promise<Admin[]> {
        const { rows } = await db.query('SELECT * FROM admins');
        return rows;
    }
    async create(admin: Admin): Promise<Admin | null> {
        try{
            const { rows } = await db.query(
                'insert into admins (arabic_name,username,password,national_id,english_name,phone,faculty_id,type_id) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                [admin.arabic_name,
                admin.username, 
                admin.password, 
                admin.national_id,
                admin.english_name,
                admin.phone,
                admin.faculty_id,
                admin.type_id
                ]
            );
            if (rows.length) return rows[0];
            else return null;
        }catch(err){
            return null;
        }
    }
    async getById(id: number): Promise<Admin | null> {
        const { rows } = await db.query('select * from admins where admin_id=$1', [
            id,
        ]);
        if (rows.length) return rows[0];
        else return null;
    }
    async getByNational(nid: string): Promise<Admin | null> {
        const { rows } = await db.query(
            'select * from admins where national_id=$1',
            [nid]
        );
        if (rows.length) return rows[0];
        else return null;
    }
    async getByUsername(username: string): Promise<Admin | null> {
        const { rows } = await db.query(
            'select * from admins where username=$1',
            [username]
        );
        if (rows.length) return rows[0];
        else return null;
    }
    //! need refactoring
    //* not used
    async updateById(admin: Admin): Promise<Admin | null> {
        try {
            const { rows } = await db.query(
                'update admins set name=$2 where id=$1 RETURNING *',
                [admin.admin_id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    //! need refactoring
    //* not used
    async updateByNationalId(admin: Admin): Promise<Admin | null> {
        try {
            const { rows } = await db.query(
                'update admins set name=$2 where national_id=$1 RETURNING *',
                [admin.national_id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    //! need refactoring
    //* not used
    async deleteById(admin: Admin): Promise<Admin | null> {
        try {
            const { rows } = await db.query(
                'delete from admins where id=$1 RETURNING *',
                [admin.admin_id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async uniqueNational(national_id: string): Promise<boolean> {
        const { rows } = await db.query(
            'select * from admins where national_id=$1',
            [national_id]
        );
        if (rows.length) return false;
        else return true;
    }
    async uniqueUsername(username: string): Promise<boolean> {
        const { rows } = await db.query(
            'select * from admins where username=$1',
            [username]
        );
        if (rows.length) return false;
        else return true;
    }
    //* Admin tests
    async getTests(admin_id:number):Promise<Test[]>{
        const {rows}= await db.query("select * from tests where creator_id=$1 order by date",[admin_id]);
        return rows;
    }
    async getPastTests(admin_id:number):Promise<Test[]>{
        const {rows}= await db.query("select * from tests where creator_id=$1 and date <=  extract(epoch from now()) order by date",[admin_id]);
        return rows;
    }
    async getCommingTests(admin_id:number):Promise<Test[]>{
        const {rows}= await db.query("select * from tests where creator_id=$1 and date >  extract(epoch from now()) order by date",[admin_id]);
        return rows;
    }
}

export default AdminModel;
