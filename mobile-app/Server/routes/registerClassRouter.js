import { Router } from "express";
import { getRoomsAvailable, registerRoom } from "../controllers/registerClassController.js";


const router = Router();

router.get('/getRoomsAvailable',getRoomsAvailable)
router.post('/registerRoom',registerRoom)

export default router;