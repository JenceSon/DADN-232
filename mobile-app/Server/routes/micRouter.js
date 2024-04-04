import {Router} from "express";
import {reqSpeech2text, addAudio} from "../controllers/micController.js";

const router = Router();

router.post('/speech2text', reqSpeech2text)
router.post("/send-audio", addAudio);
export default router;