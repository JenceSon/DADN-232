import { Router } from "express";
import { checkNUpdateIOT } from "../controllers/intervalController.js";


const router = Router()

router.get('/checkNUpdateIOT',checkNUpdateIOT)

export default router