import db from '../providers/database.provider';

export interface Subject {
    id?: number;
    name: string;
}

class SubjectModel {
    async getAll(): Promise<Subject[]> {
        const { rows } = await db.query('SELECT * FROM subjects');
        return rows;
    }
    async create(subject: Subject): Promise<Subject[]> {
        const { rows } = await db.query(
            'insert into subjects (name) values ($1) RETURNING *',
            [subject.name]
        );
        return rows[0];
    }
    async getById(id: number): Promise<Subject | null> {
        const { rows } = await db.query('select * from subjects where id=$1', [
            id,
        ]);
        if (rows.length) return rows[0];
        else return null;
    }
    async getByName(name: string): Promise<Subject[]> {
        const { rows } = await db.query(
            `select * from subjects where name like '%${name}%'`
        );
        return rows;
    }
    async updateById(subject: Subject): Promise<Subject | null> {
        try {
            const { rows } = await db.query(
                'update subjects set name=$2 where id=$1 RETURNING *',
                [subject.id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            subject.id = 0;
            return subject;
        }
    }
    async deleteById(subject: Subject): Promise<Subject | null> {
        try {
            const { rows } = await db.query(
                'delete from subjects where id=$1 RETURNING *',
                [subject.id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            subject.id = 0;
            return subject;
        }
    }
}

export default SubjectModel;
