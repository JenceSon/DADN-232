import axios from "axios";
import api_key from "../ada_api.js";

async function getLightSensor(req, res) {
  axios
  .get("https://io.adafruit.com/api/v2/phongcute/feeds/light-sensor/data",{
    params: {
      "x-aio-key": api_key,
    }
  })
  .then((response) => {
    res.send(response.data);
  });
  }

async function getTempSensor(req, res) {
  axios
  .get("https://io.adafruit.com/api/v2/phongcute/feeds/hum-sen/data",{
    params: {
      "x-aio-key": api_key,
    }
  })
  .then((response) => {
    res.send(response.data);
  });
  
}
//body :
// { "code": 0 or 1 }
// 0 : turn off
// 1 : turn on
async function controlFan(req, res) {
  const data = req.body.code;
  axios.post("https://io.adafruit.com/api/v2/phongcute/feeds/fan-con/data", {
    "x-aio-key": api_key,
    value: data,

  }).then((response) => {
    res.send("Success");
  });
  }
//body :
// { "code": 0 or 1 }
// 0 : turn off
// 1 : turn on
  async function controlLight(req, res) {
    const data = req.body.code;
    axios.post("https://io.adafruit.com/api/v2/phongcute/feeds/light-con/data", {
      "x-aio-key": api_key,
      value: data,
  
    }).then((response) => {
      res.send("Success");
    });
    }


  export {
    getLightSensor,
    controlFan,
    controlLight,
    getTempSensor
  }