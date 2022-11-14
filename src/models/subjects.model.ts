import db from "../providers/database.provider";

export interface Subject{
    id?: number,
    name: string,
}

class SubjectModel{
   async getAll():Promise<Subject[]> {
        const {rows} =await db.query("SELECT * FROM subjects");
        return rows;
   }
   async create(subject:Subject):Promise<Subject[]> {
    const {rows} =await db.query("insert into subjects (name) values ($1,$2,$3,$4)",[subject.name]);
    return rows[0];
  }
   async getById(id:number):Promise<Subject> {
    const {rows} =await db.query("select * subjects where id=$1",[id]);
    return rows[0];
  }
async updateById(subject:Subject):Promise<Subject> {
    try{
        const {rows} =await db.query("update subjects set name=$2 where id=$1",[subject.id]);
        delete rows[0].password;
        return rows[0];
    }
    catch(err){
        subject.id=0;
        return subject }
  }
async deleteById(subject:Subject):Promise<Subject> {
    try{
        const {rows} =await db.query("delete from subjects where id=$1",[subject.id]);
        delete rows[0].password;
        return rows[0];
    }
    catch(err){
        subject.id=0;
        return subject }
  }
}

export default SubjectModel;