import React from "react";
import api from "../../api/api";


export async function toggleDevice({type,id,status,building,classroom}){
    const res = await api.post("/api/manageIOT/adjustInfoDevice", {
        id : id,
        status : status,
        building : building,
        classroom : classroom,
        type : type,
    })
    return res.data
}