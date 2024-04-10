import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Pressable } from "react-native";
import { globalStyles, colors } from "../../style/global";
import { manageIOTStyles } from "../../style/manage-iot-style";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListIOT } from "./list-iot";
import api from "../../api/api";
import { useSelector } from "react-redux";



export function ListRoom() {
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
            let newList = await api.get("/api/manageIOT/getRoomByUser", {
                params: {
                    id: (user.id ? user.id : ""),
                    nameBuilding: (nameBuilding ? nameBuilding : ""),
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
        return (
            <View style={manageIOTStyles.container}>
                <FlatList
                    data={listRoom}
                    contentContainerStyle={manageIOTStyles.containerFlat}
                    //contentContainerStyle = {'20%'}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Pressable
                            style={() => {
                                if (listRoom.indexOf(item) % 2 == 0) {
                                    buttonText = manageIOTStyles.buttonText2
                                    iconColor = 'black'
                                    return manageIOTStyles.button1Room
                                }
                                buttonText = manageIOTStyles.buttonText1
                                iconColor = 'white'
                                return manageIOTStyles.button2Room
                            }}
                            onPress={() => {
                                navigation.navigate(item, { nameRoom: item });
                            }
                            }
                        //id= {item.name}
                        >
                            <Text
                                style={buttonText}
                            >
                                {item}
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
                <Stack.Screen name="Display" component={Display} initialParams={{ listRoom: listRoom }} />
                {
                    listRoom.map(item => (
                        <Stack.Screen name={item} component={ListIOT} />
                    ))
                }
            </Stack.Navigator>
        </View>
    )
}
