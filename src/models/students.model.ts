import db from "../providers/database.provider";

export interface Student{
    id?: number,
    name: string,
    username: string,
    national_id:string,
    password:string,
    university_id?:string,
}

class StudentModel{
   async getAll():Promise<Student[]> {
        const {rows} =await db.query("SELECT * FROM students");
        for(const row of rows){
            delete row.password;
        }
        return rows;
   }
   async create(student:Student):Promise<Student[]> {
    const {rows} =await db.query("insert into students (name,username,password,national_id,university_id) values ($1,$2,$3,$4,$5)",[student.name,student.username,student.password,student.national_id,student.university_id]);
    delete rows[0].password;
    return rows[0];
    }
   async getById(id:number):Promise<Student> {
    const {rows} =await db.query("select * students where id=$1",[id]);
    delete rows[0].password;
    return rows[0];
    }
    async getByNational(nid:string):Promise<Student> {
        const {rows} =await db.query("select * students where national_id=$1",[nid]);
        delete rows[0].password;
        return rows[0];
    }
    async getByUsername(username:string):Promise<Student> {
        const {rows} =await db.query("select * students where username=$1",[username]);
        delete rows[0].password;
        return rows[0];
    }
    async updateById(student:Student):Promise<Student> {
        try{
            const {rows} =await db.query("update students set name=$2 where id=$1",[student.id]);
            delete rows[0].password;
            return rows[0];
        }
        catch(err){
            student.id=0;
            return student }
    }
    async updateByNationalId(student:Student):Promise<Student> {
        try{
            const {rows} =await db.query("update students set name=$2 where national_id=$1",[student.national_id]);
            delete rows[0].password;
            return rows[0];
        }
        catch(err){
            student.id=0;
            return student }
    }
}

export default StudentModel;