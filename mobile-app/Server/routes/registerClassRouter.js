import { Router } from "express";
import { getRoomsAvailable, getScheduleUser, registerRoom } from "../controllers/registerClassController.js";


const router = Router();

router.get('/getRoomsAvailable',getRoomsAvailable)
router.get('/getScheduleUser',getScheduleUser)
router.post('/registerRoom',registerRoom)

export default router;