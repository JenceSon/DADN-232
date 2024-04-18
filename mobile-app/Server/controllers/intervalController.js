import api_key from "../ada_api.js"
import Fan from "../models/fanModel.js"
import Light from "../models/lightModel.js"
import Schedule from "../models/scheduleModel.js"
import axios from "axios"

async function checkNUpdateIOT(req, res) {
    res.send({ message: hasChangedGlobal })
}


async function intervalAutoControlDevice() {
    try {
        //clear the buffer
        //console.log(hasChangedGlobal)
        console.log("Clear buffer")
        hasChangedGlobal = []

        //get and check schedules that is not expired
        let now = new Date((new Date()).setSeconds(0,0))
        
        const allSchedules = (await Schedule.getAll()).filter(item => item.ToTime >= (new Date(now.setMinutes(now.getMinutes()-10))))
        
        now = new Date((new Date()).setSeconds(0,0))
        console.log(now.toLocaleString())
        /*
            FromTime: FromTime,
            ToTime: ToTime,
            Date: FromDate,
            NoStu: parseInt(doc.data().NoStu),
            Location: String(doc.data().Location._key.path.segments[8]),
            User: String(doc.data().User._key.path.segments[6]),
            Course: String(doc.data().Course),
            Class: String(doc.data().Class),
            //use only for demo and interval
            id : doc.id,
            endDate : To.toDate().toLocaleDateString(),
        */
        if (allSchedules == []) {
            console.log("No schedule to check")
            return
        }
        for (const schedule of allSchedules) {
            //start a schedule => turn on all IOT device
            /**
             * id
             * Type
             * Status
             * Location
             */
            console.log("Checking...")
            console.log(schedule.FromTime.toLocaleString())
            console.log(schedule.ToTime.toLocaleString())
            if (schedule.FromTime.toLocaleString() == now.toLocaleString()) {
                console.log("Satisfy FromTime")
                await updateRoom({turnOn : true, schedule : schedule})
            }
            else if (schedule.ToTime.toLocaleString() == now.toLocaleString()){
                console.log("Statisfy ToTime")
                await updateRoom({turnOn : false, schedule : schedule})
            }
        }

    } catch (error) {
        console.error("Error checking schedule ", error)
    }
}

async function updateRoom({ turnOn, schedule }) {
    try {
        console.log("Start update on at " + schedule.Location)
        let fans = (await Fan.getAll()).filter(item => item.Location == schedule.Location)
        let lights = (await Light.getAll()).filter(item => item.Location == schedule.Location)
        for (const fan of fans) {
            //update on db and axios
            console.log("Update "+ fan.id)
            await Fan.update(fan.id, turnOn, fan.Location.substring(0, 2), fan.Location)
            await axios.post("https://io.adafruit.com/api/v2/phongcute/feeds/fan-con/data", {
                "x-aio-key": api_key,
                value: (turnOn == true)? 1 : 0,

            }).then((response) => {
                console.log("Success update Fan")
            });
        }
        for (const light of lights) {
            console.log("Updaye " + light.id)
            await Light.update(light.id, turnOn, light.Location.substring(0, 2), light.Location)
            await axios.post("https://io.adafruit.com/api/v2/phongcute/feeds/light-con/data", {
                "x-aio-key": api_key,
                value: (turnOn == true)? 1 : 0,

            }).then((response) => {
                console.log("Success update Light")
            });
        }
        hasChangedGlobal.push({
            turnOn : turnOn,
            schedule : schedule,
        })
        console.log(hasChangedGlobal)
    } catch (error) {
        console.error("Error checking schedule", error)
    }
}

export {
    checkNUpdateIOT,
    intervalAutoControlDevice,
}