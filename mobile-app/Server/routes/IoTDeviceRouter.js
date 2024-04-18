import { Router } from "express";
import { getLightSensor,getTempSensor, controlFan, controlLight } from "../controllers/IoTDeviceController.js";
const router = Router();

router.get('/getTempSensor',getTempSensor)
router.get('/getLightSensor',getLightSensor)
router.post('/controlFan',controlFan)
router.post('/controlLight',controlLight)
export default router;
