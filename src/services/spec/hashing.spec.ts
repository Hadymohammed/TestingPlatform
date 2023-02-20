import hash from '../../services/hash.services'
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.PEPPER;

const pass="12345678";
describe("Hashing suit",()=>{
    describe("Password hashing",()=>{

        it("Should hash function be defined",()=>{
            expect(hash).toBeDefined();
        })
        it("Should return hashed password",()=>{
            const hashed=hash(pass);
            expect(hashed).toBeDefined();
        })
        it("Should matches the original pass in decryption",()=>{
            const hashed=hash(pass);
            expect(bcrypt.compareSync(pass + pepper, hashed as string)).toBe(true);
        })
        it("Should missmatches the original pass in decryption",()=>{
            const hashed=hash(pass);
            const wrongPass=pass+"Hh";
            expect(bcrypt.compareSync(wrongPass + pepper, hashed as string)).toBe(false);
        })
    })

})