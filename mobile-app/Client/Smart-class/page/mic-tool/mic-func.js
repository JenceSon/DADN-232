import React, {useRef, useState} from "react";
import {View, Text, TouchableOpacity, Alert, Modal, Pressable, TextInput, Button} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {MaterialIcons} from '@expo/vector-icons';
import {colors} from "../../style/global";
import LottieView from "lottie-react-native";
import CusModal from "../../components/CusModal";
import {Audio} from "expo-av";
import {useSelector} from "react-redux";
import {FFmpegKit, FFprobeKit, ReturnCode} from "ffmpeg-kit-react-native";
import { makeDirectoryAsync, getInfoAsync, cacheDirectory } from "expo-file-system";

export function Mic() {
    const [isMicOn, setIsMicOn] = useState(false);
    const [modalRpError, setModalRpError] = useState(false);
    const [micError, setMicError] = useState("");
    const micRef = useRef(null)
    const [permissRes, requestPermiss] = Audio.usePermissions();
    const [recording, setRecording] = useState(null);
    const user = useSelector(state => state.user);
    const getResultPath = async () => {
        const audioDir = `${cacheDirectory}video/`;

        async function ensureDirExists() {
            const dirInfo = await getInfoAsync(audioDir);
            if (!dirInfo.exists) {
                console.log("tmp directory doesn't exist, creates one");
                await makeDirectoryAsync(audioDir, {intermediates: true});
            }
        }
        await ensureDirExists();
        `${audioDir}file_recorded.wav`;
    }
    const toggleMic = async () => {
        if (!isMicOn) {
            micRef.current.play();
            //recording voice 
            try {
                if (permissRes.status !== 'granted') {
                    console.log('Requesting permission for recording voice...');
                    await requestPermiss();
                }
                if (permissRes) {
                    await Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        playsInSilentModeIOS: true
                    })
                }

                console.log("Start recording...");
                const {recording} = await Audio.Recording.createAsync(
                    {
                        android: {
                            extension: '.m4a',
                            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
                            audioEncoder: Audio.AndroidAudioEncoder.AAC,
                            sampleRate: 24000,
                            numberOfChannels: 1,
                            bitRate: 320000
                        },
                        ios: {
                            bitRate: 320000,
                            numberOfChannels: 1,
                            extension: '.m4a',
                            sampleRate: 24000,
                            outputFormat: Audio.IOSOutputFormat.MPEG4AAC
                        }
                    }
                );
                setRecording(recording);
                console.log("Recording started success");

            } catch (e) {
                console.log("Recording fail: " + e.message);
            }
        }
        //stop recording
        else {
            //reset animation micro
            micRef.current.reset();
            console.log("Stopping recording");
            // setRecording(undefined);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
             
            //convert to wav
            // const pathArr = uri.split("/");
            // pathArr.pop();
            // const path = pathArr.join("");
            // const newUri = path + "/recorded.wav"
            // console.log("new uri: " + newUri)
            const {sound} = await new Audio.Sound.createAsync(
                {uri: uri,},
                {shouldPlay: false}
            );
            const resultAudio = getResultPath();
            console.log("Local uri:" + sound);
            const ffmpegSession = await FFmpegKit
            .execute(`-i ${sound} -vn -acodec pcm_s16le -ar 24000 -ac 1 -y ${resultAudio}`)
            const result = await ffmpegSession.getReturnCode();
            if (ReturnCode.isSuccess(result)) {
                console.log(sound);
                console.log(resultAudio);
            }
            
            // setRecording(null);
            // console.log('Recording stopped and stored ad', uri);
            // const {sound} = new Audio.Sound.createAsync(
            //     {uri: newUri,},
            //     {shouldPlay: true}
            // );
            // const fileExt = uri.split(".")[1];
            // const recordedAudio = {
            //     uri,
            //     name: `recording-${user.id + Date.now()}.` + fileExt,
            //     type: "audio/" + fileExt
            // };
            // const fd = new FormData();
            // fd.append("file_recorded", recordedAudio);
            // try {
            //     const reps = await formRequest.post("/api/mic/send-audio", fd);
            //     console.log(reps.data);
            //
            // } catch (e) {
            //     console.error("Fail to translate to text: " + e.message);
            // }
        }
        setIsMicOn(prevState => !prevState);
    };

    function ModalError() {
        return (
            <CusModal title={"Report Micro Error"} isVisible={modalRpError}
                      setVisibleState={() => setModalRpError(state => state = !state)}>
                <View className="flex flex-col gap-4 justify-center mb-4">
                    <View className="bg-slate-200 rounded-3xl">
                        <Picker
                            selectedValue={micError}
                            onValueChange={(itemValue, itemIndex) =>
                                setMicError(itemValue)

                            }
                            className="text-lg"
                        >
                            <Picker.Item label="Micro cannot record my voice" value="Không ghi nhận được giọng nói"/>
                            <Picker.Item label="I cannot turn on micro" value="Không mở được mic"/>
                        </Picker>
                    </View>
                    <View className="bg-slate-200 rounded-2xl p-2">
                        <TextInput
                            className="mx-auto text-lg"
                            placeholder="Type another error"
                        />
                    </View>
                </View>

            </CusModal>
        );
    }

    return (
        <>
            <ModalError/>

            <View className="flex-row justify-end" style={{backgroundColor: colors.bgColor}}>
                <View className="flex-row items-center gap-2">
                    <Text className="text-base">Report Error</Text>
                    <TouchableOpacity onPress={() => setModalRpError(true)}>
                        <MaterialIcons name="error-outline" size={40} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex flex-col  justify-center items-center" style={{backgroundColor: colors.bgColor}}>
                <View className="mx-auto flex flex-row justify-center">
                    <Text className={" my-4 font-bold "} style={{fontSize: 30, fontWeight: 500, color: colors.bgColor}}>
                        {isMicOn ? 'Recording' : 'Idling'}
                    </Text>
                </View>
                <View className="mx-0 flex flex-row justify-center gap-2">
                    <View className={"p-6 rounded-3xl"} style={{backgroundColor: colors.primary40}}>
                        <View>

                            <TouchableOpacity onPress={() => {
                                toggleMic()
                            }}
                            >
                                <LottieView ref={micRef} source={require("../../assets/micro_anim.json")}
                                            style={{width: "90%", aspectRatio: 1}}
                                            className="mx-auto"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </>
    );
} 
