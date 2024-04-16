import { Router } from "express";
import { delSchedule, getRoomsAvailable, getScheduleUser, registerRoom } from "../controllers/registerClassController.js";


const router = Router();

router.get('/getRoomsAvailable',getRoomsAvailable)
router.get('/getScheduleUser',getScheduleUser)
router.post('/registerRoom',registerRoom)
router.post('/delSchedule',delSchedule)

export default router;