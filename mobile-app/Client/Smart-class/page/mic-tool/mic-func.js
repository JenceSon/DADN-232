import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export function Mic() {
    const [isMicOn, setIsMicOn] = useState(false);
    const [rcDone, setRcDone] = useState(false);
    const [modalRpError, setModalRpError] = useState(false);
    const [micError, setMicError] = useState("");
    useEffect(() => {
        let animationInterval;
        if (isMicOn) {
            animationInterval = setInterval(() => {
                setRcDone(prevState => !prevState);
            }, 1000);
        } else {
            clearInterval(animationInterval);
            setRcDone(false);
        }
        return () => clearInterval(animationInterval);
    }, [isMicOn]);

    const toggleMic = () => {
        if (!isMicOn)
            setRcDone(false);
        else {
            setRcDone(true)
            Alert.alert("Nội dung micro thu được", "Ban do rat vui", [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => { console.log('Ok Pressed') }, style: 'default' }]);
        }
        setIsMicOn(prevState => !prevState);
    };
    function ModalError() {
        return (
            <Modal
                animationType="slice"
                transparent={true}
                visible={modalRpError}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalRpError(!modalRpError);
                }}>
                <View className="flex flex-1 justify-center items-center">
                    <View className="w-64 bg-sky-500/75 rounded-xl p-3.5">
                        <Text className="text-white font-bold text-lg mx-auto">Báo cáo lỗi micro</Text>
                        <View className="flex flex-col gap-4 justify-center mb-4">
                            <Picker
                                selectedValue={micError}

                                onValueChange={(itemValue, itemIndex) =>
                                    setMicError(itemValue)
                                }
                            >
                                <Picker.Item label="Không ghi nhận được giọng nói" value="Không ghi nhận được giọng nói" />
                                <Picker.Item label="Không mở được mic" value="Không mở được mic" />
                            </Picker>
                            <View className="bg-gray-100 rounded-2xl">
                                <TextInput
                                    className="mx-auto rounded-xl"
                                    placeholder="Nhập lý do khác"
                                />
                            </View>
                        </View>
                        <View className="flex flex-row justify-end gap-4">
                            <Pressable
                                className="rounded-xl p-4 bg-red-400"
                                onPress={() => setModalRpError(false)}>
                                <Text className="text-white font-semibold" >Huỷ</Text>
                            </Pressable>
                            <Pressable
                                className="rounded-xl p-4 bg-green-400"
                                onPress={() => setModalRpError(false)}>
                                <Text className="text-white font-semibold">Gửi</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
    return (
        <>
            <ModalError />
            <View className="flex-row justify-end">
                <View className="flex-row items-center gap-2">
                    <Text className="text-base">Báo lỗi</Text>
                    <TouchableOpacity onPress={() => setModalRpError(true)}>
                        <MaterialIcons name="error-outline" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex flex-1 justify-center items-center">
                <View className="items-center">
                    <View className="p-3 mx-auto flex-row justify-between">
                        <Text className="text-xl font-semibold  basis-1/3">Micro: </Text>
                        <View
                            className={`w-5 h-5 rounded-full bg-${isMicOn ? 'red' : 'gray'} ml-2`}
                        />
                        <Text className="text-xl ml-1 basis-1/2">
                            {isMicOn ? 'Recording' : 'Not Recording'}
                        </Text>
                    </View>
                    <View className="flex flex-row gap-2">
                        <View className={"h-100 p-5 rounded-full " + (isMicOn ? 'bg-green-500' : 'bg-red-400')}>
                            <TouchableOpacity onPress={toggleMic} className="mx-4 my-1"
                            >
                                <FontAwesome6 name="microphone" size={120} color="green" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {(!rcDone && isMicOn) && (
                                <View
                                    className="w-4 h-4 bg-red-500 rounded-full absolute top-2 right-2 animate-ping"
                                />
                            )}
                        </View>
                    </View>
                </View>

            </View>
        </>
    );
} 
