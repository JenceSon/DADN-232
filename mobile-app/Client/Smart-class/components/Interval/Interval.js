import React from "react";
import { useEffect, useState } from "react";
import api from "../../api/api"
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import {setIsChange} from "../../features/fetchData/fetchDataSlice"

export function Interval(){
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const fetchDataGlobal = useSelector(state => state.fetchDataGlobal)
    useEffect(()=>{
        
        let timer  = setInterval(async ()=>{
            console.log(user.id+" is listening from server...")
            const response = await api.get("/api/interval/checkNUpdateIOT")
            const message = response.data.message.filter(item => item.schedule.User == user.id)
            console.log(message.length)
            if(message.length == 0){
                console.log("Nothing change in schedules of " + user.id)
            }
            else{
                console.log("Something have changed")
                for (const change of message){
                    Alert.alert("Notification",
                    "All IoT devices in "+
                    change.schedule.Location+
                    " have been "+
                    ((change.turnOn == true)? "turned on !":"turned off !"),[
                        {
                            text : "OK"
                        }
                    ])
                }
                dispatch(setIsChange(!fetchDataGlobal.isChange))
            }
            console.log("Done checking loop !")
        },1000*60)
        return ()=>clearInterval(timer)
    },[])
}