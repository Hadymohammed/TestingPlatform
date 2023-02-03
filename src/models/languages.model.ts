import db from "../providers/database.provider";

export interface Language{
    language_id?:number;
    name:string;
}

class languageModel{
   async getAll():Promise<Language[]> {
        const {rows} =await db.query("select * from languages",[]);
        return rows;
   }
   async create(lang:Language):Promise<Language|null> {
        const {rows} =await db.query("insert into languages(name) values($1) RETURNING*",[lang.name]);
        if(rows.length)return rows[0];
        else return null;    
    }
}
export default languageModel;