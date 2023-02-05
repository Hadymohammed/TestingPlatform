import { Router } from "express";
import { create, getAll, getById } from "../controllers/faculty.controller";

const facultyRounter=Router();

facultyRounter.get('/',getAll);
facultyRounter.get('/id',getById);
facultyRounter.post('/',create);

export default facultyRounter;