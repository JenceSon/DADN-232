import { useEffect } from "react";


export function Interval(){
    useEffect(()=>{
        let timer  = setInterval(async ()=>{
            console.log("Hi")
        },2000)
        return ()=>clearInterval(timer)
    },[])
}