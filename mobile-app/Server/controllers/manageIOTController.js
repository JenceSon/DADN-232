import Building from "../models/buildingModel.js";

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

export {
    adjustInfoDevice,
    addDevice,
    delDevice,
    getIOTByRoom,
    getListRoomByBuilding,
    getAllBuilding,
}