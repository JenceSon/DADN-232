import { Router } from "express";
import { adjustInfoDevice,addDevice,delDevice,getIOTByRoom,getListRoomByBuilding, getAllBuilding, getRoomByUser, autoGenIdDevice } from "../controllers/manageIOTController.js";

const router = Router();

router.post('/adjustInfoDevice',adjustInfoDevice)
router.post('/addDevice',addDevice)
router.post('/delDevice',delDevice)
router.get('/autoGenIdDevice',autoGenIdDevice)
router.get('/getIOTByRoom',getIOTByRoom)
router.get('/getListRoomByBuilding',getListRoomByBuilding)
router.get('/getAllBuilding',getAllBuilding)
router.get('/getRoomByUser',getRoomByUser)


export default router;