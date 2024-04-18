import React from "react";
import api from "../../api/api";


export async function ToggleDevice({type,id,status,building,classroom}){
    //type is "Fan" or not
    const res = await api.post("/api/manageIOT/adjustInfoDevice", {
        id : id,
        status : status,
        building : building,
        classroom : classroom,
        type : type,
    })
    let resAda =""
    if(type == "Fan") resAda =  await api.post("/api/IoTDevice/controlFan", {
        code : (status == true)? 1 : 0,
    })
    else resAda =  await api.post("/api/IoTDevice/controlLight",{
        code : (status == true)? 1 : 0
    })
    console.log(resAda.data)
    return res.data
}

export async function AddDevice({type,status,building,classroom}){
    const id = await api.get("/api/manageIOT/autoGenIdDevice",{
        params : {
            type : type,
        }
    })
    if (id.data.msg) return id.data
    else{
        const res = await api.post("/api/manageIOT/addDevice",{
            id : (id.data.id)? id.data.id : type + "ffff",
            type : type,
            status : status,
            building : building,
            classroom : classroom,
        })
        return res.data
    } 
}

export async function DelDevice({id, type}){
    const res = await api.post("/api/manageIOT/delDevice",{
        id : id,
        type : type,
    })
    return res.data
}