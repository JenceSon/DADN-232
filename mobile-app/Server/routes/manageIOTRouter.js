import { Router } from "express";
import { adjustInfoDevice,addDevice,delDevice,getIOTByRoom,getListRoomByBuilding, getAllBuilding } from "../controllers/manageIOTController.js";

const router = Router();

router.post('/adjustInfoDevice',adjustInfoDevice)
router.post('/addDevice',addDevice)
router.post('/delDevice',delDevice)
router.get('/getIOTByRoom',getIOTByRoom)
router.get('/getListRoomByBuilding',getListRoomByBuilding)
router.get('/getAllBuilding',getAllBuilding)


export default router;