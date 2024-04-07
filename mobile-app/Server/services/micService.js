import axios from "axios";
import FFmpeg from 'fluent-ffmpeg'
import multer from "multer";
import fs from 'fs'
import {config} from 'dotenv'
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
                        resolve(result);
                    }
                ).on('error', (err) => {
                reject(new Error("FFmpeg error: " + err.message));
            });
        } else {
            try {
                const result = await startSendApi(filename);
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
            //xoa file ghi dc
            // fs.unlinkSync(`audio/${filename}`);
            return {"transcription": transcription, message: "speech 2 text success"};
        } else {
            return {"transcription": "", message: "speech 2 text success but no result text"};
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
export const upload = multer({storage: storage});
