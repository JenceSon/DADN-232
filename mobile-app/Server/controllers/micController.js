import multer from 'multer'
import speech2text, {upload} from "../services/micService.js";

async function reqSpeech2text(req, res) {
    //testing
    // encodeToWav(req.body["filename"], "file_recorded.wav");
    // const rs = await speech2text("file_recorded.wav");
    //testing
    const rs = await speech2text(req.body["filename"]);
    // res.send(rs);
}


async function addAudio(req, res) {
    try {
        await upload.single("file_recorded")(req, res, async function (err) {
            if (err) {
                console.log("Error: " + err.message)
                res.send({message: err.message})
            } else {
                const file = req.file;
                console.log(file);
                try {
                    // encodeToWav("audio/" + file.fieldname + ".m4a", "audio/" + "file_recorded.wav");
                    const rs = await speech2text("file_recorded.wav");
                    res.send(rs);
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