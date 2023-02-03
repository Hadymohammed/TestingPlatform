import db from '../providers/database.provider';

export interface Tag {
    tag_id?: number;
    name: string;
}

class TagModel {
    async getAll(): Promise<Tag[]> {
        const { rows } = await db.query('SELECT * FROM tags');
        return rows;
    }
    async create(subject: Tag): Promise<Tag[]> {
        const { rows } = await db.query(
            'insert into tags (name) values ($1) RETURNING *',
            [subject.name]
        );
        return rows[0];
    }
    async getById(id: number): Promise<Tag | null> {
        const { rows } = await db.query('select * from tags where tag_id=$1', [
            id,
        ]);
        if (rows.length) return rows[0];
        else return null;
    }
    async getByName(name: string): Promise<Tag[]> {
        const { rows } = await db.query(
            `select * from tags where name like '%${name}%'`
        );
        return rows;
    }
    async updateById(subject: Tag): Promise<Tag | null> {
        try {
            const { rows } = await db.query(
                'update tags set name=$2 where tag_id=$1 RETURNING *',
                [subject.tag_id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
    async deleteById(subject: Tag): Promise<Tag | null> {
        try {
            const { rows } = await db.query(
                'delete from tags where tag_id=$1 RETURNING *',
                [subject.tag_id]
            );
            if (rows.length) return rows[0];
            else return null;
        } catch (err) {
            return null;
        }
    }
}

export default TagModel;
