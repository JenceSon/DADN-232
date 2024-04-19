import React, {useRef, useState} from "react";
import {View, Text, TouchableOpacity, TextInput, ScrollView} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {colors} from "../../style/global";
import LottieView from "lottie-react-native";
import CusModal from "../../components/CusModal";
import {Audio} from "expo-av";
import {useSelector} from "react-redux";
import {formRequest} from "../../api/api";
import {MaterialIcons} from '@expo/vector-icons';

export function Mic() {
    const [isMicOn, setIsMicOn] = useState(false);
    const [recording, setRecording] = useState(null);
    const [fetchP2TDone, setFetchP2TDone] = useState(true); //true: fetch done, false: await fetching
    const [modalRpError, setModalRpError] = useState(false);
    const [micError, setMicError] = useState("");
    const micRef = useRef(null)
    const [permissRes, requestPermiss] = Audio.usePermissions();
    const [rcText, setRcText] = useState("");
    const [parsedCmd, setParsedCmd] = useState("");
    const user = useSelector(state => state.user);

    const toggleMic = async () => {
        if (!isMicOn) {
            setParsedCmd("");
            setRcText("");
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
                setIsMicOn(prevState => !prevState);
            } catch (e) {
                console.log("Recording fail: " + e.message);
            }
        }
        //stop recording
        else {
            //reset animation micro
            micRef.current.reset();
            console.log("Stopping recording");
            await recording.stopAndUnloadAsync();
            setIsMicOn(prevState => !prevState);
            setFetchP2TDone(prevState => !prevState);
            const uri = recording.getURI();
            setRecording(null);
            console.log('Recording stopped and stored ad', uri);
            const date = new Date();
            const timeStamp = `-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            const recordedAudio = {
                uri,
                name: `recorded-${user.id + timeStamp}.` + "m4a",
                type: "audio/" + "m4a"
            };
            await speech2text(recordedAudio);
        }
    };

    async function speech2text(recordedAudio) {
        console.log("recorded audio:", recordedAudio);
        const fd = new FormData();
        fd.append("file_recorded", recordedAudio);
        try {
            const reps = await formRequest.post("/api/mic/send-audio", fd);
            console.log(reps.data);
            if (reps.data["transcription"] != null) {
                setRcText(prevStat => prevStat = reps.data["transcription"]);
                if (reps.data["parsedCmds"] != null) {
                    const parsedCmds = reps.data["parsedCmds"];
                    let parsedCmdsStr = "";
                    parsedCmds.forEach(cmd => {parsedCmdsStr += cmd + " | "});
                    setParsedCmd(parsedCmdsStr);
                }
            } else {
                setRcText(prevState => prevState = "");
            }
        } catch (e) {
            console.error("Fail to translate to text: " + e.message);
        }
        setFetchP2TDone(prevState => !prevState);
    }

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
            <ScrollView>

                <ModalError/>

                <View className="h-screen" style={{backgroundColor: colors.bgColor}}>
                    <View className="flex-row justify-end">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-base">Report Error</Text>
                            <TouchableOpacity onPress={() => setModalRpError(true)}>
                                <MaterialIcons name="error-outline" size={40} color="black"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-col items-center">
                        <View className="mx-auto flex flex-row justify-center">
                            <Text className={" my-4 font-bold "} style={{fontSize: 30, fontWeight: 500}}>
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
                        {!fetchP2TDone && <LottieView source={require("../../assets/loading_anim.json")} autoPlay loop
                                                      style={{height: "80", aspectRatio: 1}}/>}
                        <View className="mx-1 gap-1 flex flex-col justify-start">
                            <Text className="text-lg text-blue-600 font-bold">Recorded text:</Text>
                            {!fetchP2TDone ?
                                <LottieView source={require("../../assets/loading_dot.json")} autoPlay loop
                                            style={{height: 60, width: 200}}/> :
                                <Text className="text-xl text-gray-400 font-medium">{rcText}</Text>}
                            <Text className="text-lg  font-bold">Parsed command:</Text>
                            {!fetchP2TDone ?
                                <LottieView source={require("../../assets/loading_dot.json")} autoPlay loop
                                            style={{height: 60, width: 200}}/> :
                                <Text className="text-lg text-gray-400 font-bold">{parsedCmd}</Text>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
} 
