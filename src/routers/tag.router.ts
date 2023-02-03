import { Router } from 'express';
import {
    index,
    addSubject,
    getById,
    getByName,
} from '../controllers/tags.controller';

const tagRouter = Router();

tagRouter.get('/', index);
tagRouter.get('/id', getById);
tagRouter.get('/name', getByName);

tagRouter.post('/create', addSubject);
export default tagRouter;
