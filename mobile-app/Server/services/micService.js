import axios from "axios";
import FFmpeg from 'fluent-ffmpeg'
import multer from "multer";
import fs from 'fs'
import api_key from "../ada_api.js";

export default async function speech2text(filename) {
    const fileArr = filename.split(".");
    const fileExt = fileArr.pop();
    const fileDes = fileArr.join("") + ".wav"
    return new Promise(async (resolve, reject) => {
        if (fileExt !== "wav") {
            FFmpeg().input("audio/" + filename)
                .outputOptions([
                    '-acodec pcm_s16le',
                    '-vn',
                    '-ac 1',
                    '-ar 16k',
                    '-map_metadata -1'
                ])
                .save("audio/" + fileDes)
                .on('end', async () => {
                    fs.unlinkSync('audio/' + filename);
                    const result = await startSendApi(fileDes);
                    fs.unlinkSync(`audio/${fileDes}`);
                    resolve(result);
                }
                ).on('error', (err) => {
                    reject(new Error("FFmpeg error: " + err.message));
                });
        } else {
            try {
                const result = await startSendApi(filename);
                fs.unlinkSync(`audio/${filename}`);
                resolve(result);
            } catch (e) {
                console.log("Fail to send api text 2 speech:" + e.message);
            }
        }

    })

    async function startSendApi(filename) {
        const apiKey = "AIzaSyD3ztZzLJLyYNybDcIY8wY18z13WjNA9jg";
        const endpoint = "https://speech.googleapis.com/v1/speech:recognize?key=" + apiKey;

        const encoding = "LINEAR16";
        const sampleRateHertz = 16000;
        const languageCode = 'en-US';
        const config = {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
            model: "latest_short",
        }
        const audio = {
            content: fs.readFileSync(`audio/${filename}`).toString('base64')
        }
        const request = {
            config: config,
            audio: audio
        }
        const response = await axios.post(endpoint, request);
        if (response.data.results) {
            const transcription = response.data.results
                .map(rs => {
                    return rs.alternatives[0].transcript;
                })
                .join('\n');
            return { "transcription": transcription, message: "SUCCESS" };
        } else {
            return { "transcription": "", message: "NO_TEXT_FOUND" };
        }
    }

}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "audio/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
export const upload = multer({ storage: storage });

export function commandParser(text) {
    const textClean = text.trim().toLowerCase();
    let textArr = textClean.split(" ");
    textArr = textArr.filter(w => w !== "") //remote white space
    let rt_cmdDevice = [];
    let rt_cmdArg = [];
    for (let i = 0; i < textArr.length; i++) {
        const element = textArr[i];
        if (element in preDefineValidCmds) {
            rt_cmdDevice.push(element);
        }
        if (preDefineValidArgs.includes(element)) {
            rt_cmdArg.push(element);
        }
    }
    const validCmd = [];
    if (rt_cmdArg.length === 0 || rt_cmdDevice.length === 0) throw new Error("Can not parse command");
    rt_cmdDevice.forEach(cmd => {
        rt_cmdArg.forEach(arg => {
            console.log("[-] candidate cmd:" + cmd + " " + arg)
            if (arg in preDefineValidCmds[cmd]) {
                //invoke
                preDefineValidCmds[cmd][arg]();
                validCmd.push(cmd + " " + arg);
            }
        });
    });
    return validCmd;
}
///////
const preDefineValidArgs = ["on", "off", "start", "end"]
const preDefineValidCmds = {
    "light": {
        "on": () => lightControl(1),
        "off": () => lightControl(0)
    },
    "fan": {
        "on": () => fanControl(1),
        "off": () => fanControl(0)
    },
}

async function fanControl(code) {
    try {
        const resp = await axios.post("https://io.adafruit.com/api/v2/phongcute/feeds/fan-con/data", {
            "x-aio-key": api_key,
            value: code,
        });
        console.log("success:" + resp.data)
    } catch (error) {
        console.log("Fail to control IoT fan:" + error.message)
    }

}
async function lightControl(code) {
    try {
        const resp = await axios.post("https://io.adafruit.com/api/v2/phongcute/feeds/light-con/data", {
            "x-aio-key": api_key,
            value: code,
        })
        console.log("success:" + resp.data)
    } catch (error) {
        console.log("Fail to control IoT light:" + error.message)
    }
}


