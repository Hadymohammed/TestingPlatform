import db from "../providers/database.provider";

export interface Admin{
    id?: number,
    name: string,
    username: string,
    national_id:string,
    password:string,
}

class AdminModel{
   async getAll():Promise<Admin[]> {
        const {rows} =await db.query("SELECT * FROM admins");
        for(const row of rows){
            delete row.password;
        }
        return rows;
   }
   async create(admin:Admin):Promise<Admin[]> {
    const {rows} =await db.query("insert into admins (name,username,password,national_id) values ($1,$2,$3,$4)",[admin.name,admin.username,admin.password,admin.national_id]);
    delete rows[0].password;
    return rows[0];
}
   async getById(id:number):Promise<Admin> {
    const {rows} =await db.query("select * admins where id=$1",[id]);
    delete rows[0].password;
    return rows[0];
}
async getByNational(nid:string):Promise<Admin> {
    const {rows} =await db.query("select * admins where national_id=$1",[nid]);
    delete rows[0].password;
    return rows[0];
}
async getByUsername(username:string):Promise<Admin> {
    const {rows} =await db.query("select * admins where username=$1",[username]);
    delete rows[0].password;
    return rows[0];
}
async updateById(admin:Admin):Promise<Admin> {
    try{
        const {rows} =await db.query("update admins set name=$2 where id=$1",[admin.id]);
        delete rows[0].password;
        return rows[0];
    }
    catch(err){
        admin.id=0;
        return admin }
}
async updateByNationalId(admin:Admin):Promise<Admin> {
    try{
        const {rows} =await db.query("update admins set name=$2 where national_id=$1",[admin.national_id]);
        delete rows[0].password;
        return rows[0];
    }
    catch(err){
        admin.id=0;
        return admin }
}
async deleteById(admin:Admin):Promise<Admin> {
    try{
        const {rows} =await db.query("delete from admins where id=$1",[admin.id]);
        delete rows[0].password;
        return rows[0];
    }
    catch(err){
        admin.id=0;
        return admin }
}
}

export default AdminModel;