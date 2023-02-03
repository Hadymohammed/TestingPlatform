import { Router } from "express";
import { create, getAll } from "../controllers/admin_type.controller";

const admin_typeRouter=Router();

admin_typeRouter.get('/',getAll);
admin_typeRouter.post('/',create);

export default admin_typeRouter;