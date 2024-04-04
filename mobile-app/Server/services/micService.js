import axios from "axios";
import FFmpeg from 'fluent-ffmpeg'
import multer from "multer";
import fs from 'fs'

export default async function speech2text() {
    return new Promise((resolve, reject) => {
        FFmpeg().input("audio/file_recorded.m4a")
            .outputOptions([
                '-acodec pcm_s16le',
                '-vn',
                '-ac 1',
                '-ar 16k',
                '-map_metadata -1'
            ])
            .save("audio/file_recorded.wav")
            .on('end', async () => {
                    fs.unlinkSync('audio/file_recorded.m4a');
                    const result = await startSendApi();
                    resolve(result);
                }
            ).on('error', (err) => {
            reject(new Error("FFmpeg error: " + err.message));
        });
    })
    async function startSendApi() {
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
            content: fs.readFileSync(`audio/file_recorded.wav`).toString('base64')
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
            fs.unlinkSync("audio/file_recorded.wav");
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
        cb(null, file.fieldname + '.m4a');
    }
})
export const upload = multer({storage: storage});
