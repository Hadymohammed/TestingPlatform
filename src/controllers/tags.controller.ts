import { Request, Response } from 'express';
import TagModel, { Tag } from '../models/tags.model';
import missingKeys from '../services/varifyRequestBody.services';

const tagEntity = new TagModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const tags: Tag[] = await tagEntity.getAll();
        res.send(tags);
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
        const tag: Tag = {
            name: req.body.name,
        };
        const dbTag = await tagEntity.create(tag);
        res.send(dbTag);
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
        const tag = await tagEntity.getById(id);
        if (tag) res.send(tag);
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
        const tag = await tagEntity.getByName(name);
        if (tag) res.send(tag);
        else res.status(422).send('Wrong data');
    } catch (err) {
        res.send(500).send("Internal server error");
    }
};

export { index, getById, getByName, addSubject };
