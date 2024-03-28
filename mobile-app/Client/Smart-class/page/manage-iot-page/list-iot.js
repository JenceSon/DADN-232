import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { manageIOTStyles } from "../../style/manage-iot-style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, globalStyles } from "../../style/global";


export function ListIOT() {
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
    return (
        <View style={manageIOTStyles.container}>
            <Text style={manageIOTStyles.headerRoom}>
                {nameRoom}
            </Text>
            {
                listIOT.map(type => (
                    <View id={type.type}>
                        <Text style={manageIOTStyles.typeText}>
                            {type.type}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <FlatList
                                numColumns={4}
                                key={'listDevice_' + type.type}
                                data={type.listDevice}
                                renderItem={({ item }) => {
                                    let iconName = 'leaf'
                                    if (type.type == 'FAN') iconName = 'leaf'
                                    else iconName = 'sunny'
                                    return (
                                    <Pressable
                                        style={manageIOTStyles.deviceBtn}
                                        onPress={() => { //TODO
                                        //-=====
                                        
                                        }}
                                        id= {item.id}
                                    >
                                        <Ionicons name={iconName} color={'white'} size={15} />
                                        <Text style={manageIOTStyles.idText}>
                                            {item.id}
                                        </Text>
                                    </Pressable>
                                )}}
                            />
                        </View>
                    </View>
                ))
            }
        </View>
    )
}