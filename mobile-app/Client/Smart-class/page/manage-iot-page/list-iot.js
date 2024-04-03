import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, FlatList, Text, Pressable, Switch } from "react-native";
import Modal from "react-native-modal"
import { manageIOTStyles } from "../../style/manage-iot-style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, globalStyles } from "../../style/global";
import { RFPercentage } from "react-native-responsive-fontsize";
import { toggleDevice } from "./manage-iot-func";


export function ListIOT() {
    const [modalVisible, setModalVisible] = useState(false)
    const [curModal, setCurModal] = useState({
        id: 'fff'
    })
    const [isEnable,setisEnable] = useState(false)

    const route = useRoute()
    const navigation = useNavigation()

    //call api to get the device
    const { nameRoom } = route.params
    const listIOT = [
        {
            type: 'FAN',
            listDevice: [
                {
                    id: 'FA01',
                    //
                },
                {
                    id: 'FAN02',
                    //
                },
                {
                    id: 'FAN03',
                    //
                },
                {
                    id: 'FAN04',
                    //
                },
                {
                    id: 'FAN05',
                    //
                },
            ]
        },
        {
            type: 'LIGHT',
            listDevice: [
                {
                    id: 'LIG01',
                    //
                },
                {
                    id: 'LIG02',
                    //
                },
                {
                    id: 'LIG03',
                    //
                },
                {
                    id: 'LIG04',
                    //
                },
            ]
        },
    ]
    //
    const toggleModalAccept = () => {
        setModalVisible(!modalVisible)
        //call api to save or reject
        toggleDevice()
        //
    }
    const toggleModalCancel = () => {
        setModalVisible(!modalVisible)
        //call api
        toggleDevice()
        //set default switch
        setisEnable(false)
        
    }
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
                <View style = {manageIOTStyles.modalContainerBtn}>
                    <Text style = {{fontSize : RFPercentage(3), color : colors.black}}>
                        Status :                        
                    </Text>
                    <Switch
                        trackColor={{false : 'grey', true : 'green'}}
                        value = {isEnable} //get the item status
                        onValueChange={()=>{
                            setisEnable(!isEnable)
                        }}   
                    >
                    </Switch>
                </View>
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Pressable
                        style={manageIOTStyles.modalCanCelBtn}
                        onPress={toggleModalAccept}
                    >
                        <Text style={manageIOTStyles.modalBtnTxt}>
                            Accept
                        </Text>
                    </Pressable>
                    <Pressable
                        style={manageIOTStyles.modalAcceptBtn}
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
