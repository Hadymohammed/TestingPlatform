import { Router } from "express";
import { create, getAll } from "../controllers/faculty.controller";

const facultyRounter=Router();

facultyRounter.get('/',getAll);
facultyRounter.post('/',create);

export default facultyRounter;