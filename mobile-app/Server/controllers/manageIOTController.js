import Building from "../models/buildingModel.js";
import Schedule from "../models/scheduleModel.js";

//admin
async function getListRoomByBuilding(req,res){
    const params = req.body;
    try{
        if (params == null){
            
        }
        else{

        }
    }
    catch (e){

    }
}
async function getIOTByRoom(req,res){
    //no need, dlt later
}

async function adjustInfoDevice(req,res){

}

//admin only
async function addDevice(req,res){

}

async function delDevice(req,res){

}

async function getAllBuilding(req,res){
    const body = req.body;
    try {
        let buildings = await Building.all();
        res.send(buildings)
    }
    catch (e){
        res.send("Error in finding list buildings")
    }
}
//user only
async function getRoomBySchedule(req,res){
    const body = req.body;
    try {
        console.log(body)
        let schedules = await Schedule.getAll();
        //take of comment after fixbug
        //if (body != null) schedules = schedules.filter((item) => item.User == req.body.id && item.Location.subString(0,3) == req.body.nameBuilding)
        if (schedules == undefined){
            console.error("null list")
            res.send([])
        } 
        else res.send(schedules)
    } catch (error) {
        res.send("Error in finding schedules")
    }
}

export {
    adjustInfoDevice,
    addDevice,
    delDevice,
    getIOTByRoom,
    getListRoomByBuilding,
    getAllBuilding,
    getRoomBySchedule,
}