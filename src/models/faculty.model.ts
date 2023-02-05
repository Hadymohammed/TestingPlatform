import db from "../providers/database.provider";

export interface Faculty{
    id?:number;
    arabic_name:string;
    english_name?:string;
}

class facultyModel{
    async getAll():Promise<Faculty[]>{
        const {rows}= await db.query("select * from faculty",[]);
        return rows;
    }
    async create(faculty:Faculty):Promise<Faculty | null>{
        const {rows}= await db.query("insert into faculty (arabic_name,english_name) values ($1,$2) RETURNING*",
        [faculty.arabic_name,
        faculty.english_name]);
        if(rows.length)
            return rows[0];
        else return null;
    }
   async getById(id:number):Promise<Faculty | null> {
    const {rows}=await db.query("select * from faculty where faculty_id=$1",[id]);
    if(rows.length)
            return rows[0];
        else return null;
   }
}
export default facultyModel;