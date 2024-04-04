import fs from "fs";
import axios from "axios";
import FFmpeg from 'fluent-ffmpeg'
import multer from "multer";
// const ffmpg = require('fluent-ffmpeg')
export default async function speech2text(fileName) {
    const apiKey = "AIzaSyD3ztZzLJLyYNybDcIY8wY18z13WjNA9jg";
    const endpoint = "https://speech.googleapis.com/v1/speech:recognize?key=" + apiKey;

    const encoding = "FLAC";
    const sampleRateHertz = 24000;
    const languageCode = 'en-US';
    const config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        model: "latest_short",
    }
    const audio = {
        content: fs.readFileSync(`audio/${fileName}`).toString('base64')
    }
    const request = {
        config: config,
        audio: audio
    }
    const response = await axios.post(endpoint, request);
    console.log(response.data)
    if (response.data.results) {
        const transcription = response.data.results
            .map(rs => {
                console.log(rs.alternatives);
                return rs.alternatives[0].transcript;
            })
            .join('\n');
        return {"transcription": transcription, message: "speech 2 text success"};
    } else {
        return {"transcription": "", message: "speech 2 text success but no result text"};
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "audio/")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.wav');
    }
})
export const upload = multer({storage: storage});
