import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Pressable, Alert } from "react-native";
import { globalStyles, colors } from "../../style/global";
import { manageIOTStyles } from "../../style/manage-iot-style";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListIOT } from "./list-iot";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { ListIOTAdmin } from "./list-iot-admin";



export function ListRoomAdmin() {
    const route = useRoute()
    const user = useSelector(state => state.user);
    const { nameBuilding } = route.params
    const navigation = useNavigation()
    const Stack = createNativeStackNavigator()

    const [fetchData, setFetchData] = useState(false)
    const [listRoom, setListRoom] = useState([])

    async function getRooms() {
        try {
            console.log({ id: user.id, nameBuilding: nameBuilding })
            let newList = await api.get("/api/manageIOT/getListRoomByBuilding", {
                params: {
                    id: (nameBuilding) ? nameBuilding : "H6",
                }
            })
            newList = await newList.data
            if (newList.msg) {
                console.log(newList.msg)
                setListRoom([])
            }
            else {
                console.log(newList)
                setListRoom(newList)
            }
        } catch (error) {
            console.error("Error Call API : ", error)
        }

    }

    useEffect(() => {
        getRooms();
    }, [fetchData])


    function Display() {
        let buttonText = manageIOTStyles.buttonText1
        let iconColor = 'white'
        let disPlayList = listRoom.map(item => {
            let note = {
                name: item.name,
                iconStatus: (item.status) ? 'checkmark-circle-sharp' : 'close-circle-sharp',
                iconStatusColor: (item.status) ? 'green' : 'red',
                status: item.status,
            }
            return note
        })
        if (disPlayList == undefined) disPlayList = []
        return (
            <View style={manageIOTStyles.container}>
                <FlatList
                    data={disPlayList}
                    contentContainerStyle={manageIOTStyles.containerFlat}
                    //contentContainerStyle = {'20%'}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <Pressable
                            style={() => {
                                if (disPlayList.indexOf(item) % 2 == 0) {
                                    buttonText = manageIOTStyles.buttonText2
                                    iconColor = 'black'
                                    return manageIOTStyles.button1Room
                                }
                                buttonText = manageIOTStyles.buttonText1
                                iconColor = 'white'
                                return manageIOTStyles.button2Room
                            }}
                            onPress={() => {
                                if (item.status) {
                                    navigation.navigate(item.name, { nameRoom: item.name });
                                }
                                else {
                                    Alert.alert("Notification", item.name + " is not working rightnow !", [
                                        {
                                            onPress: console.log("OK pressed !")
                                        }
                                    ])
                                }
                            }
                            }
                        //id= {item.name}
                        >
                            <Text
                                style={buttonText}
                            >
                                {item.name}
                            </Text>
                            <Ionicons name='arrow-forward' size={20} color={iconColor} />
                        </Pressable>
                    )}
                />
            </View>
        )
    }

    return (
        <View style={manageIOTStyles.container}>
            <Stack.Navigator
                initialRouteName="Display"
                screenOptions={({ route }) => ({
                    headerShown: false,
                })}
            >
                <Stack.Screen name="Display" component={Display} />
                {
                    listRoom.map(item => (
                        <Stack.Screen name={item.name} component={ListIOTAdmin} />
                    ))
                }
            </Stack.Navigator>
        </View>
    )
}
