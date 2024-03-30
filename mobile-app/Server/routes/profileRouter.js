import { Router } from "express";
import { getInfoByUser, updateInfo } from "../controllers/profileController.js";


const router = Router();

router.get('/getInfoByUser',getInfoByUser)
router.post('/updateInfo',updateInfo)


export default router;