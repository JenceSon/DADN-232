import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, Switch, Alert } from "react-native";
import Modal from "react-native-modal"
import { manageIOTStyles } from "../../style/manage-iot-style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, globalStyles } from "../../style/global";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ToggleDevice } from "./manage-iot-func";
import api from "../../api/api";


export function ListIOT() {
    const [modalVisible, setModalVisible] = useState(false)
    const [curModal, setCurModal] = useState({
        id: "",
        Status: false,
    })
    const [isEnable, setisEnable] = useState(false)
    const [fetchData, setFetchData] = useState(false)
    const [listIOT, setListIOT] = useState([])

    const route = useRoute()
    const navigation = useNavigation()
    const { nameRoom } = route.params
    const toggleModalAccept = async () => {
        setModalVisible(!modalVisible)
        //call api to save or reject
        const res = await ToggleDevice({
           type: curModal.id.substring(0,3),
           id: curModal.id, 
           status: curModal.Status, 
           building: nameRoom.substring(0, 2),
           classroom: nameRoom,
        })
        //setCurModal(pre => ({...pre,Status: isEnable}))
        console.log(res)
        if (res.success) {
            Alert.alert("Notification", res.success, [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => console.log('OK pressed'),
            }
            ])
        }
        else {
            Alert.alert("Notification", res.msg, [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => console.log('OK pressed'),
            }
            ])
            setCurModal(pre => ({ ...pre, Status: isEnable }))
        }

        setFetchData(!fetchData)
    }
    const toggleModalCancel = () => {
        setModalVisible(!modalVisible)
        //set default switch
        setCurModal(pre => ({ ...pre, Status: isEnable }))
    }
    async function getIOT() {
        try {
            let newList = await api.get("/api/manageIOT/getIOTByRoom", {
                params: {
                    nameRoom: nameRoom,
                }
            })
            newList = await newList.data
            if (newList.msg) {
                console.log(newList.msg)
                setListIOT([])
            }
            else {
                console.log(newList)
                setListIOT(newList)
            }
        } catch (error) {
            console.error("Error Call API : ", error)
        }
    }
    useEffect(() => {
        getIOT();
    }, [fetchData])

    return (
        <View style={manageIOTStyles.container}>
            <Modal
                isVisible={modalVisible}
                //animationIn={'fadeInDown'}
                style={manageIOTStyles.containerModal}

            >
                <Text style={manageIOTStyles.headerModal}>
                    {curModal.id}
                </Text>
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Text style={{ fontSize: RFPercentage(3), color: colors.black }}>
                        Status :
                    </Text>
                    <Switch
                        trackColor={{ false: 'grey', true: 'green' }}
                        value={curModal.Status} //get the item status 
                        onValueChange={() => {
                            setCurModal(pre => ({ ...pre, Status: !curModal.Status }))
                        }}
                    >
                    </Switch>
                </View>
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Pressable
                        style={manageIOTStyles.modalAcceptBtn}
                        onPress={toggleModalAccept}
                    >
                        <Text style={manageIOTStyles.modalBtnTxt}>
                            Accept
                        </Text>
                    </Pressable>
                    <Pressable
                        style={manageIOTStyles.modalCanCelBtn}
                        onPress={toggleModalCancel}
                    >
                        <Text style={manageIOTStyles.modalBtnTxt}>
                            Cancle
                        </Text>
                    </Pressable>
                </View>
            </Modal>
            <Text style={manageIOTStyles.headerRoom}>
                {nameRoom}
            </Text>
            {
                listIOT.map(type => (
                    <View id={type.type}>
                        <Text style={manageIOTStyles.typeText}>
                            {type.type}
                        </Text>
                        <FlatList
                            numColumns={4}
                            key={'listDevice_' + type.type}
                            keyExtractor={(item) => item.id}
                            data={type.listDevice}
                            contentContainerStyle={{ flexDirection: 'column' }}
                            columnWrapperStyle={{ justifyContent: 'space-around' }}
                            renderItem={({ item }) => {
                                let iconName = 'leaf'
                                if (type.type == 'FAN') iconName = 'leaf'
                                else iconName = 'sunny'
                                return (
                                    <Pressable
                                        style={manageIOTStyles.deviceBtn}
                                        onPress={() => { //TODO
                                            setModalVisible(true)
                                            setCurModal(item)
                                            setisEnable(curModal.Status)
                                            //console.log(curModal.Status)
                                        }}
                                        id={item.id}
                                    >
                                        <Ionicons name={iconName} color={'white'} size={15} />
                                        <Text style={manageIOTStyles.idText}>
                                            {item.id}
                                        </Text>
                                    </Pressable>
                                )
                            }}
                        />
                    </View>
                ))
            }
        </View>
    )
}
