import speech2text, {commandParser, upload} from "../services/micService.js";
import fs from "fs";

async function reqSpeech2text(req, res) {
    const rs = await speech2text("file_recorded.wav");
    if (rs["message"] === "SUCCESS") {
        const parsedCmd = commandParser(rs["transcription"])
        console.log(parsedCmd)
        rs = {...rs, parsedCmd: parsedCmd}
    }
    res.send(rs);
}


async function addAudio(req, res) {
    try {
        await upload.single("file_recorded")(req, res, async function (err) {
            if (err) {
                console.log("Error: " + err.message)
                res.send({message: err.message})
            } else {
                try {
                    speech2text(req["file"]["originalname"]).then(rs => {
                        let rtData = rs;
                        if (rs["message"] === "SUCCESS") {
                            const parsedCmd = commandParser(rs["transcription"])
                            console.log(parsedCmd)
                            rtData["parsedCmds"] =  parsedCmd;
                        }
                        res.send(rtData);
                    }).catch(e => {
                        console.log("Fail to text 2 speech:" + e.message)
                    });
                } catch (e) {
                    const rt_msg = {message: "Fail to translate to text: " + e.message};
                    console.log(rt_msg);
                    res.send(rt_msg);
                }
            }
        })
    } catch (e) {
        console.log("Fail to speech 2 text recorded file: " + e.message)
    }
}

export {
    reqSpeech2text,
    addAudio
}