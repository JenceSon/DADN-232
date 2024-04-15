import { Router } from "express";
import { getListClassByUser, getInfoClass, getNoti,getNumberStu,postCallRoll } from '../controllers/classInfoController.js';


const router = Router();

router.get('/getListClassByUser',getListClassByUser)
router.get('/getInfoClass',getInfoClass)
router.get('/getNoti',getNoti)
router.post('/getNumberStu',getNumberStu)
router.post('/postCallRoll',postCallRoll)


export default router;