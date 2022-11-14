import { Router } from 'express';
const router = Router();

router.use('/', ()=>{
    console.log("hi");
});
export default router;
