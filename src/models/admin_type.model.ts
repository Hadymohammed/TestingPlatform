import db from "../providers/database.provider";

export interface AdminType{
    admin_type_id?:number;
    type:string;
}
class adminTypeModel{
   async getAll ():Promise<AdminType[]>{
    const {rows}=await db.query('select * from admin_type',[]);
    return rows;
   }
  async create (adminType:AdminType):Promise<AdminType | null> {
    const {rows}=await db.query('insert into admin_type(type) values ($1) returning *',
    [adminType.type]);
    if(rows.length){
        return rows[0];
    }
    else return null;
  }
}
export default adminTypeModel;