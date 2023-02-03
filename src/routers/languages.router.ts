import { Router } from "express";
import { create, getAll } from "../controllers/languages.controller";

const languageRouter=Router();

languageRouter.get('/',getAll);
languageRouter.post('/',create);

export default languageRouter;