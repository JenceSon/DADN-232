import { query } from "express";
import Building from "../models/buildingModel.js";
import Schedule from "../models/scheduleModel.js";
import Fan from "../models/fanModel.js";

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
    const body = req.query;
    try {
        let fans = await Fan.getAll();
        res.send(fans)
        
    } catch (error) {
        res.send({msg : "Error loading IOT device"})
    }
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
        if (buildings == undefined) {
            res.send([])
        }
        else res.send(buildings)
    }
    catch (e){
        res.send({msg : "Error in finding list buildings"})
    }
}
//user only
async function getRoomByUser(req,res){
    //const body = req.body;
    try {
        console.log(req.query)
        let schedules = await Schedule.getAll();
        //take of comment after fixbug
        schedules = schedules.filter(
            (item) => (item.User == req.query.id && 
            item.Location.substring(0,2) == req.query.nameBuilding
        
            ))
        let rooms = schedules.map(item=>item.Location)
        rooms = [...new Set(rooms)]
        console.log(rooms)
        if (rooms == undefined){
            //console.error("null list")
            res.send([])
        } 
        else res.send(rooms)
    } catch (error) {
        res.send({msg : "Error in finding schedules"})
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
}