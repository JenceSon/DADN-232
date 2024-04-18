import Building from "../models/buildingModel.js";
import Schedule from "../models/scheduleModel.js";
import User from "../models/userModel.js";


async function getRoomsAvailable(req,res){

}

async function delSchedule(req,res){
    const body = req.body
    try {
        if (body.id){
            if (await Schedule.delete(body.id) == true){
                res.send({success : "The schedule " + body.id + " has been deleted !"})
            }
            else {
                res.send({message : "Error deleting "+ body.id+" in firebase"})
            }
        }
        else{
            res.send({message : "Null id"})
        }
    } catch (error) {
        res.send({message : "Error delecting : ", error})
    }
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
        console.log(body)
        const allSchedules = await Schedule.getAll();
        const idSchedules = allSchedules.map(item => parseInt(item.id))
        const id = String(Math.max(...idSchedules) + 1)
        let invalid = []
        const now = new Date()
        //check valid input
        const listBuilding = await Building.all()
        if(!listBuilding.some(x => x.name == body.Building)){
            invalid.push("Invalid building input")
        }
        else{
            const roomsByBuilding = await Building.getClass(body.Building)
            if (roomsByBuilding == undefined) roomsByBuilding = []
            if (!roomsByBuilding.some(x => x.name == body.Classroom)){
                invalid.push("Invalid room id input")
            }
        }

        if (body.FromTime <= now){
            invalid.push("From-time must after 1 hour from system time")
        }
        if (body.FromTime >= body.ToTime){
            invalid.push("From-time can not be after to-time")
        }

        //check conflict
        for (const schedule of allSchedules){
            if (schedule.Location == body.Classroom){
                if ((schedule.FromTime <= body.FromTime && body.FromTime <= schedule.ToTime) || 
                (schedule.FromTime <= body.ToTime && body.ToTime <= schedule.ToTime) ){
                    invalid.push("Conflict with range from "+schedule.FromTime.toLocaleString() + " to " + schedule.ToTime.toLocaleString())                   
                }
            }
        }
        console.log(String(body.FromTime))
        console.log(String(body.ToTime))
        if (invalid.length == 0){
            if (await Schedule.add(
                id,
                String(body.FromTime),
                body.Building,
                body.Classroom,
                body.NoStu,
                String(body.ToTime),
                body.User,
                body.Course,
                body.Class) == true){
                res.send({success : "Successfully register classroom"})
            }
            else{
                res.send({message : "Fail register classroom in firebase "})
            }    
        }
        else{
            res.send({message : "Invalid input !", validate : invalid })
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
        if (schedules != [])schedules = schedules.filter(item => item.User == userRef && item.ToTime > (new Date()))

        res.send(schedules)
        
    } catch (error) {
        res.status(500).json({message : "Error getting schedules : " + error})
    }
}


export {
    getRoomsAvailable,
    registerRoom,
    getScheduleUser,
    delSchedule,
}