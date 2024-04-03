import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../../style/global";
import LottieView from "lottie-react-native";
import { styled } from "nativewind";
import CusModal from "../../components/CusModal";

export function Mic() {
    const [isMicOn, setIsMicOn] = useState(false);
    const [rcDone, setRcDone] = useState(false);
    const [modalRpError, setModalRpError] = useState(false);
    const [micError, setMicError] = useState("");
    const micRef = useRef(null)

    const toggleMic = () => {
        if (!isMicOn) {
            setRcDone(false);
            micRef.current.play();
        }

        else {
            setRcDone(true)
            micRef.current.reset();
            Alert.alert("Micro recorded", "Ban do rat vui", [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => { console.log('Ok Pressed') }, style: 'default' }]);
        }
        setIsMicOn(prevState => !prevState);
    };
    function ModalError() {
        return (
            <CusModal title={"Report Micro Error"} isVisible={modalRpError} setVisibleState={() => setModalRpError(state => state = !state)} >
                <View className="flex flex-col gap-4 justify-center mb-4">
                    <View className="bg-slate-200 rounded-3xl">
                        <Picker
                            selectedValue={micError}
                            onValueChange={(itemValue, itemIndex) =>
                                setMicError(itemValue)

                            }
                            className="text-lg"
                        >
                            <Picker.Item label="Micro cannot record my voice" value="Không ghi nhận được giọng nói" />
                            <Picker.Item label="I cannot turn on micro" value="Không mở được mic" />
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
            <ModalError />

            <View className="flex-row justify-end" style={{ backgroundColor: colors.bgColor }}>
                <View className="flex-row items-center gap-2" >
                    <Text className="text-base">Report Error</Text>
                    <TouchableOpacity onPress={() => setModalRpError(true)}>
                        <MaterialIcons name="error-outline" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex flex-col  justify-center items-center" style={{ backgroundColor: colors.bgColor }}>
                <View className="mx-auto flex flex-row justify-center">
                    <Text className={" my-4 font-bold "} style={{ fontSize: 30, fontWeight: 500, color: colors.bgColor }} >
                        {isMicOn ? 'Recording' : 'Idling'}
                    </Text>
                </View>
                <View className="mx-0 flex flex-row justify-center gap-2">
                    <View className={"p-6 rounded-3xl"} style={{ backgroundColor: colors.primary40 }}>
                        <View>

                            <TouchableOpacity onPress={() => { toggleMic() }}
                            >
                                <LottieView ref={micRef} source={require("../../assets/micro_anim.json")} style={{ width: "90%", aspectRatio: 1 }}
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
