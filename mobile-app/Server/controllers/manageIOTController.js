import { application, query } from "express";
import Building from "../models/buildingModel.js";
import Schedule from "../models/scheduleModel.js";
import Fan from "../models/fanModel.js";
import Light from "../models/lightModel.js";

//admin
async function getListRoomByBuilding(req,res){
    const body = req.query;
    try{
        let rooms = await Building.getClass((body.id)? body.id : "H6")
        if (rooms == undefined) res.send([])
        else res.send(rooms)
    }
    catch (e){
        res.send({msg : "Error getting list of rooms : " + e })
    }
}
async function getIOTByRoom(req,res){
    const body = req.query;
    try {
        let fans = await Fan.getAll();
        let lights = await Light.getAll();
        fans = {
            type : "FAN",
            listDevice : fans.filter(item => item.Location == body.nameRoom)
        }
        lights = {
            type : "LIGHT",
            listDevice : lights.filter(item => item.Location == body.nameRoom)
        }
        res.send([fans,lights])
        
    } catch (error) {
        res.send({msg : "Error loading IOT device : " + error})
    }
}

async function adjustInfoDevice(req,res){
    //type = "Fan" or not
    const body = req.body;
    try {
        console.log(body)
        if (body.type == "Fan"){
            await Fan.update(body.id,body.status,body.building,body.classroom)
        }
        else {
            await Light.update(body.id,body.status,body.building,body.classroom)
        }
        res.send({success : "Update " + body.id+" sucessfully" })
    } catch (error) {
        res.send({msg : "Error update IOT device : "+ error})
    }
}

//admin only
async function autoGenIdDevice(req,res){
    const body = req.query;
    try {
        if (body.type == "Fan"){
            let listFanId = (await Fan.getAll()).map(item => item.id);
            
            if (listFanId == undefined){
                res.send({id:"Fan0000"})
            } 
            else{
                listFanId = listFanId.map(item => parseInt(item.substring(3,7)))
                console.log(listFanId)
                let newID = Math.max(...listFanId) + 1
                console.log(newID)
                newID = newID.toString()
                while (newID.length < 4) {
                    newID = "0" + newID
                }
                res.send({id : "Fan" + newID})
            }
            
        }
        else{
            let listLightId = (await Light.getAll()).map(item => item.id);
            console.log(listLightId)
            if (listLightId == undefined){
                res.send({id:"Light0000"})
            } 
            else{
                listLightId = listLightId.map(item => parseInt(item.substring(5,9)))
                console.log(listLightId)
                let newID = Math.max(...listLightId) + 1
                console.log(newID)
                newID = newID.toString()
                while (newID.length < 4) {
                    newID = "0" + newID
                }
                res.send({id : "Light" + newID})
            }
        }
        
    } catch (error) {
        res.send({msg : "Error gen ID : " + error})
    }
}
async function addDevice(req,res){
    //type and id
    const body = req.body;
    try {
        console.log(body)
        
        if (body.type == "Fan"){
            let listFanId = (await Fan.getAll()).map(item => item.id);
            listFanId = (listFanId == undefined)? []: listFanId;
            if (listFanId.includes(body.id)){
                res.send({msg : "The id of device has already existed !"})
            }
            else{
                if(await Fan.add(body.id,body.status,body.building,body.classroom) == true){
                    res.send({success : "Add " + body.id+ " successfully !"})
                }
                else res.send({msg : "Error add IOT device in firebase"})
            }
        }
        else{
            let listLightId = (await Light.getAll()).map(item => item.id);
            listLightId = (listLightId == undefined)? []: listLightId;
            if (listLightId.includes(body.id)){
                res.send({msg : "The id of device has already existed !"})
            }
            else{
                if(await Light.add(body.id,body.status,body.building,body.classroom)==true){
                    res.send({success : "Add " + body.id+ " successfully !"})
                }
                else res.send({msg : "Error add IOT device in firebase"})
            }
        }
        
    } catch (error) {
        res.send({msg : "Error add IOT device : " + error})
    }
}

async function delDevice(req,res){
    const body = req.body;
    try {
        console.log(body)
        
        if (body.type == "Fan"){
            let listFanId = (await Fan.getAll()).map(item => item.id);
            listFanId = (listFanId == undefined)? []: listFanId;
            if (!listFanId.includes(body.id)){
                res.send({msg : "Invalid IOT device !"})
            }
            else{
                if(await Fan.delete(body.id) == true){
                    res.send({success : "Delete " + body.id+ " successfully !"})
                }
                else res.send({msg : "Error delete IOT device in firebase "})
            }
        }
        else{
            let listLightId = (await Light.getAll()).map(item => item.id);
            listLightId = (listLightId == undefined)? []: listLightId;
            if (!listLightId.includes(body.id)){
                res.send({msg : "Invalid IOT device !"})
            }
            else{
                if(await Light.delete(body.id) == true){
                    res.send({success : "Delete " + body.id+ " successfully !"})
                }
                else res.send({msg : "Error delete IOT device in firebase "})
            }
        }
        
    } catch (error) {
        res.send({msg : "Error delete IOT device : " + error})
    }
}

async function getAllBuilding(req,res){
    const body = req.body;
    try {
        let buildings = await Building.all();
        if (buildings == undefined) {
            res.send([])
        }
        else res.send(buildings)
    }
    catch (e){
        res.send({msg : "Error in finding list buildings : "+ e})
    }
}
//user only
async function getRoomByUser(req,res){
    //const body = req.body;
    try {
        console.log(req.query)
        let schedules = await Schedule.getAll();
        console.log(schedules)
        //take of comment after fixbug
        schedules = schedules.filter( //filter of userid, building and toTime > now (mean is ready or on working)
            (item) => (item.User == req.query.id && 
            item.Location.substring(0,2) == req.query.nameBuilding &&
            item.ToTime > new Date()
            ))
        let rooms = schedules.map(item=>{
            let note = {
                name : item.Location,
                status : (new Date() < item.ToTime && new Date() >= item.FromTime) ? true : false, //true : on going, false : is ready
            }
            return note
        })

        console.log(rooms)
        if (rooms == undefined){
            //console.error("null list")
            res.send([])
        } 
        else {
            //resolve duplicate
            let removeDupRooms = []

            for (const room of rooms){
                if(removeDupRooms.some(x => (x.name == room.name))){ //has same name
                    console.log(room)
                    let idx = removeDupRooms.findIndex(x => x.name == room.name)
                    console.log(removeDupRooms[idx])
                    if (room.status == true) {
                        removeDupRooms[idx].status = true //check if new room has been on => set on
                        console.log(removeDupRooms)
                    }
                }
                else{
                    removeDupRooms.push(room)
                }
            }
            console.log(removeDupRooms)
            res.send(removeDupRooms)
        }
    } catch (error) {
        res.send({msg : "Error in finding schedules : " + error})
    }
}

export {
    adjustInfoDevice,
    addDevice,
    delDevice,
    getIOTByRoom,
    getListRoomByBuilding,
    getAllBuilding,
    getRoomByUser,
    autoGenIdDevice,
}