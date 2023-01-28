import { Request, Response } from 'express';
import SubjectModel, { Subject } from '../models/subjects.model';
import missingKeys from '../services/varifyRequestBody.services';

const subjectEntity = new SubjectModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const subjects: Subject[] = await subjectEntity.getAll();
        res.send(subjects);
    } catch (err) {
        res.status(500);
    }
};
const addSubject = async (req: Request, res: Response): Promise<void> => {
    const missing = missingKeys(req, ['name']);
    if (missing.length) {
        res.status(400).send('Missing data : ' + missing);
        return;
    }
    try {
        const subject: Subject = {
            name: req.body.name,
        };
        const dbSubject = await subjectEntity.create(subject);
        res.send(dbSubject);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
};
const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.body.id;
        const missing = missingKeys(req, ['id']);
        if (missing.length) {
            res.status(400).send('Missing data : ' + missing);
            return;
        }
        const subject = await subjectEntity.getById(id);
        if (subject) res.send(subject);
        else res.status(422).send('Wrong data');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};
const getByName = async (req: Request, res: Response): Promise<void> => {
    const missing = missingKeys(req, ['name']);
    if (missing.length) {
        res.status(400).send('Missing data : ' + missing);
        return;
    }
    try {
        const name = req.body.name;
        const subject = await subjectEntity.getByName(name);
        if (subject) res.send(subject);
        else res.status(422).send('Wrong data');
    } catch (err) {
        res.send(500).send("Internal server error");
    }
};

export { index, getById, getByName, addSubject };
