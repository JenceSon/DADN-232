import { Router } from "express";
import { checkRole, login } from "../controllers/loginController.js";


const router = Router()

router.route('/login').post(login).get(checkRole)

export default router