import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import Modal from "react-native-modal"
import { manageIOTStyles } from "../../style/manage-iot-style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, globalStyles } from "../../style/global";


export function ListIOT() {
    const [modalVisible, setModalVisible] = useState(false)
    const [curModal, setCurModal] = useState({
        id: 'fff'
    })
    const route = useRoute()
    const navigation = useNavigation()
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

    const toggleModal = () => {
        setModalVisible(!modalVisible)
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
                <View style={manageIOTStyles.modalContainerBtn}>
                    <Pressable
                        style={manageIOTStyles.modalCanCelBtn}
                        onPress={toggleModal}
                    >
                    </Pressable>
                    <Pressable
                        style={manageIOTStyles.modalAcceptBtn}
                        onPress={toggleModal}
                    >
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
