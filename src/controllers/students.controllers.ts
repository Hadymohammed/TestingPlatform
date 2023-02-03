import StudentModel, { Student } from '../models/students.model';
import { Response, Request } from 'express';
import { defaults } from 'pg';
import { varifyStudent } from '../services/varifyUser.services';
import hash from '../services/hash.services';
import missingKeys from '../services/varifyRequestBody.services';

const studentEntity = new StudentModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const students = await studentEntity.getAll();
        res.send(students);
    } catch (err) {
        res.status(500).send(err);
    }
};
const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const missing=missingKeys(req,["id"]);
        if (missing.length) {
            res.status(400).send('Missing parameters : '+missing);
            return;
        }
        const student_id = req.body.id;
        const student = await studentEntity.getById(student_id);
        if (student) res.send(student);
        else res.status(422).send('Wrong data');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};
const getByNational = async (req: Request, res: Response): Promise<void> => {
    const missing=missingKeys(req,["national_id"]);
    if(missing.length){
        res.status(400).send("Missing parameters : "+missing);
        return;
    }
    const student_nid = req.body.national_id;
    try {
        const student = await studentEntity.getByNational(student_nid);
        if (student) {
            delete student.password;
            res.send(student);
        } else {
            res.status(422).send('Wrong data');
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const getByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        const missing=missingKeys(req,["username"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }
        const username = req.body.username;
        const student = await studentEntity.getByUsername(username);
        if(student)res.send(student);
        else res.status(422).send("Wrong data");
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        //params validation
        const missing=missingKeys(req,["national_id","password"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }
        const national = req.body.national_id;
        const password = req.body.password;

        const student = await varifyStudent(national, password);
        if (student != null) {
            res.send(student);
        } else res.status(401).send('Wrong national Id or password');
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const student: Student = {
            arabic_name: req.body.arabic_name,
            english_name: req.body.english_name,
            national_id: req.body.national_id,
            password: req.body.password,
            university_id: req.body.university_id,
            username: req.body.username,
            phone: req.body.phone,
            faculty_id: req.body.faculty_id,
        };
        //params validation
        const missing=missingKeys(req,["arabic_name","english_name","national_id","password","username","phone","faculty_id","university_id"]);
        if(missing.length){
            res.status(400).send("Missing parameters : "+missing);
            return;
        }

        // unique keys validation
        let uniqueError: string[] = [];
        if ((await studentEntity.uniqueUsername(student.username)) == false)
            uniqueError.push('username');
        if ((await studentEntity.uniqueNational(student.national_id)) == false)
            uniqueError.push('national_id');
        if (
            student.university_id != null &&
            (await studentEntity.uniqueUniversityId(student.university_id)) ==
                false
        )
            uniqueError.push('university_id');
        if (uniqueError.length) {
            res.status(400).send('reserved keys : ' + uniqueError);
            return;
        }

        student.password = hash(student.password as string);
        const dbStudent = await studentEntity.create(student);
        if(dbStudent)res.send(dbStudent);
        else res.status(422).send("Wrong data");
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
export { index, getById, getByNational, getByUsername, login, register };
