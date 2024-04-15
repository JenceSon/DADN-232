import Schedule from "../models/scheduleModel.js";
import User from "../models/userModel.js";


async function getRoomsAvailable(req,res){

}

async function registerRoom(req,res){

}
async function getScheduleUser(req,res){
    const body = req.query;
    try {
        const userRef = body.id? await User.getRef(body.id) :await User.getRef("2110101")
        console.log(userRef)

        const schedules = await Schedule.getByUserRef(userRef)
        let schedulesInfo = []
        for await (const schedule of schedules){

        }
        res.send(schedulesInfo)
        
    } catch (error) {
        res.status(500).json({message : "Error getting schedules : " + error})
    }
}


export {
    getRoomsAvailable,
    registerRoom,
    getScheduleUser,
}