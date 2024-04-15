import Schedule from "../models/scheduleModel.js";
import User from "../models/userModel.js";


async function getRoomsAvailable(req,res){

}

async function registerRoom(req,res){
    const body = req.body;
    /*
        FromTime : date
        ToTime : date
        NoStu : number
        Course : string
        Class : String
        Building : String
        Classroom : string
        User: string

    */
    try {
        const allSchedules = await Schedule.getAll();
        const idSchedules = allSchedules.map(item => parseInt(item.id))
        const id = String(Math.max(...idSchedules) + 1)
        let invalid = []
        //check valid input
        if (body.FromTime <= new Date()){
            invalid.push("From time can not be before system date")
        }
        if (body.FromTime >= body.ToTime){
            invalid.push("From time can not be after to time")
        }

        //check conflict
        for (const schedule of allSchedules){
            if (schedule.Location == body.Classroom){
                if (schedule.FromTime <= body.FromTime || schedule.ToTime >= body.ToTime){
                    invalid.push("Conflict with range from "+schedule.FromTime.toLocaleString() + " to " + schedule.ToTime.toLocaleString())                   
                }
            }
        }
        if (await Schedule.add(
            id,
            body.FromTime,
            body.Building,
            body.Classroom,
            body.NoStu,
            body.ToTime,
            body.User,
            body.Course,
            body.Class) == true && 
            invalid.length == 0){
            res.send({success : "Successfully register classroom"})
        }
        else{
            res.send({message : "Fail register classroom : \n", error : invalid})
        }

    } catch (error) {
        console.error("Error registering classroom : ", error)
        res.send({message : "Fail register classroom : " + error})
    }
}
async function getScheduleUser(req,res){
    const body = req.query;
    try {
        const userRef = body.id? body.id : "2110101"
        console.log(userRef)

        let schedules = await Schedule.getAll()
        if (schedules != [])schedules = schedules.filter(item => item.User == userRef)

        res.send(schedules)
        
    } catch (error) {
        res.status(500).json({message : "Error getting schedules : " + error})
    }
}


export {
    getRoomsAvailable,
    registerRoom,
    getScheduleUser,
}