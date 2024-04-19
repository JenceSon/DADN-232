import { Router } from "express";
import {getInfoByUser, updateInfo, allUsers, deleteUser, addUser} from "../controllers/profileController.js";


const router = Router();

router.get('/getInfoByUser',getInfoByUser)
router.post('/updateInfo',updateInfo)
router.post('/add', addUser)
router.get('/all', allUsers)
router.post('/delete', deleteUser)


export default router;