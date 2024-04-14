import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, Switch, Alert } from "react-native";
import Modal from "react-native-modal"
import { manageIOTStyles } from "../../style/manage-iot-style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, globalStyles } from "../../style/global";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AddDevice, DelDevice, ToggleDevice } from "./manage-iot-func";
import api from "../../api/api";
import RNPickerSelect from 'react-native-picker-select'

export function ListIOTAdmin() {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleAdd, setModalVisibleAdd] = useState(false)
    const [curTypeAdd, setCurTypeAdd] = useState("Fan")
    const [curStatusAdd, setCurStatusAdd] = useState(false)

    const [curModal, setCurModal] = useState({
        id: "",
        Status: false,
    })
    const [isEnable, setisEnable] = useState(false) //origin enable if cancel adaption
    const [fetchData, setFetchData] = useState(false)
    const [listIOT, setListIOT] = useState([])

    const route = useRoute()
    const navigation = useNavigation()
    const { nameRoom } = route.params

    const toggleModalAccept = async () => {
        setModalVisible(!modalVisible)
        //call api to save or reject
        const res = await ToggleDevice({
            type: curModal.id.substring(0, 3),
            id: curModal.id,
            status: curModal.Status,
            building: nameRoom.substring(0, 2),
            classroom: nameRoom,
        })
        //setCurModal(pre => ({...pre,Status: isEnable}))
        console.log(res)
        if (res.success) {
            Alert.alert("Notification", res.success, [
                {
                    text: 'OK',
                    onPress: () => console.log('OK pressed'),
                }
            ])
        }
        else {
            Alert.alert("Notification", res.msg, [
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

    const delDevice = async () => {
        setModalVisible(!modalVisible)
        console.log(curModal.id)
        const res = await DelDevice({ id: curModal.id, type : curModal.id.substring(0,3) })
        console.log(res)
        if (res.success) {
            Alert.alert("Notification", res.success, [
                {
                    text: 'OK',
                    onPress: () => console.log('OK pressed'),
                }
            ])
        }
        else {
            Alert.alert("Notification", res.msg, [
                {
                    text: 'OK',
                    onPress: () => console.log('OK pressed'),
                }
            ])
        }
        setFetchData(!fetchData)
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
                    <Pressable onPress={delDevice}>
                        <Ionicons name="trash-bin-sharp" color={'red'} size={20} />
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
            <Modal
                isVisible={modalVisibleAdd}
                style={manageIOTStyles.modalContainerAdd}
            >
                <Text style={manageIOTStyles.headerModal}>
                    {"Add " + curTypeAdd}
                </Text>
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Text style={{ fontSize: RFPercentage(3), color: colors.black }}>
                        Building :
                    </Text>
                    <Text style={{ fontSize: RFPercentage(3), color: colors.primary60 }}>
                        {nameRoom.substring(0, 2)}
                    </Text>
                </View>
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Text style={{ fontSize: RFPercentage(3), color: colors.black }}>
                        ClassRoom :
                    </Text>
                    <Text style={{ fontSize: RFPercentage(3), color: colors.primary60 }}>
                        {nameRoom}
                    </Text>
                </View>
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Text style={{ fontSize: RFPercentage(3), color: colors.black }}>
                        Status :
                    </Text>
                    <View style={{ width: '50%' }}>
                        <RNPickerSelect
                            onValueChange={(value) => setCurStatusAdd(value)}
                            items={[
                                { label: 'ON', value: true },
                                { label: 'OFF', value: false },
                            ]}
                            value={curStatusAdd}
                        />
                    </View>
                </View>

                <View style={manageIOTStyles.modalContainerBtn}>
                    <Pressable
                        style={manageIOTStyles.modalAcceptBtn}
                        onPress={async () => {
                            const res = await AddDevice({
                                type: curTypeAdd,
                                status: curStatusAdd,
                                building: nameRoom.substring(0, 2),
                                classroom: nameRoom,
                            })
                            setModalVisibleAdd(false)
                            console.log(res)
                            if (res.success) {
                                Alert.alert("Notification", res.success, [
                                    {
                                        text: 'OK',
                                        onPress: () => console.log('OK pressed'),
                                    }
                                ])
                            }
                            else {
                                Alert.alert("Notification", res.msg, [
                                    {
                                        text: 'OK',
                                        onPress: () => console.log('OK pressed'),
                                    }
                                ])
                            }
                            setCurStatusAdd(false)
                            setFetchData(!fetchData)
                        }}
                    >
                        <Text style={manageIOTStyles.modalBtnTxt}>
                            Accept
                        </Text>
                    </Pressable>
                    <Pressable
                        style={manageIOTStyles.modalCanCelBtn}
                        onPress={() => setModalVisibleAdd(false)}
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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={manageIOTStyles.typeText}>
                                {type.type}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    if (type.type == "FAN") setCurTypeAdd("Fan")
                                    else setCurTypeAdd("Light")
                                    setModalVisibleAdd(true)
                                }}
                            >
                                <Ionicons name="add-sharp" color={colors.primary100} size={20} />
                            </Pressable>
                        </View>
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
