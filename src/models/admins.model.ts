import db from '../providers/database.provider';

export interface Admin {
    id?: number;
    name: string;
    username: string;
    national_id: string;
    password?: string;
}

class AdminModel {
    async getAll(): Promise<Admin[]> {
        const { rows } = await db.query('SELECT * FROM admins');
        return rows;
    }
    async create(admin: Admin): Promise<Admin | null> {
        const { rows } = await db.query(
            'insert into admins (name,username,password,national_id) values ($1,$2,$3,$4) RETURNING *',
            [admin.name, admin.username, admin.password, admin.national_id]
        );
        if(rows.length)return rows[0];
        else return null
    }
    async getById(id: number): Promise<Admin | null> {
        const { rows } = await db.query('select * from admins where id=$1', [id]);
        if(rows.length)return rows[0];
        else return null;
    }
    async getByNational(nid: string): Promise<Admin | null> {
        const { rows } = await db.query(
            'select * from admins where national_id=$1',
            [nid]
        );
        if(rows.length)return rows[0];
        else return null;
    }
    async getByUsername(username: string): Promise<Admin | null> {
        const { rows } = await db.query('select * from admins where username=$1', [
            username,
        ]);
        if(rows.length)return rows[0];
        else return null;
    }
    async updateById(admin: Admin): Promise<Admin | null> {
        try {
            const { rows } = await db.query(
                'update admins set name=$2 where id=$1 RETURNING *',
                [admin.id]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async updateByNationalId(admin: Admin): Promise<Admin | null> {
        try {
            const { rows } = await db.query(
                'update admins set name=$2 where national_id=$1 RETURNING *',
                [admin.national_id]
            );
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async deleteById(admin: Admin): Promise<Admin | null> {
        try {
            const { rows } = await db.query('delete from admins where id=$1 RETURNING *', [
                admin.id,
            ]);
            if(rows.length)return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async uniqueNational(national_id:string):Promise<boolean>{
        const { rows } = await db.query('select * from admins where national_id=$1', [national_id]);
        if(rows.length)return false;
        else return true;
    }
    async uniqueUsername(username:string):Promise<boolean>{
        const { rows } = await db.query('select * from admins where username=$1', [username]);
        if(rows.length)return false;
        else return true;
    }
}

export default AdminModel;
