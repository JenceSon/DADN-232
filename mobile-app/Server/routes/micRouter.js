import { Router } from "express";
import { getVoiceString,postOnOff } from "../controllers/micController.js";

const router = Router();

router.get('/getVoiceString',getVoiceString)
router.post('/postOnOff',postOnOff)


export default router;