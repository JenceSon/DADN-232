import React, { useState } from "react";
import { FlatList, Text, View, Pressable } from "react-native";
import { globalStyles,colors } from "../../style/global";
import { manageIOTStyles } from "../../style/manage-iot-style";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListIOT } from "./list-iot";



export function ListRoom() {
    const route = useRoute()
    const { listRoom } = route.params
    const navigation = useNavigation()
    const Stack = createNativeStackNavigator()
    return (
        <View style={manageIOTStyles.container}>
            <Stack.Navigator
                initialRouteName="Display"
                screenOptions={({ route }) => ({
                    headerShown : false,
                })}
            >
                <Stack.Screen name = "Display" component={Display} initialParams={{listRoom : listRoom}} />
                {
                    listRoom.map(item =>(
                        <Stack.Screen name = {item.name} component={ListIOT} initialParams={{listIOT : item.listIOT}}/>
                    ))
                }
            </Stack.Navigator>
        </View>
    )
}
export function Display(){
    const route = useRoute()
    const navigation = useNavigation()
    const { listRoom } = route.params
    let buttonText = manageIOTStyles.buttonText1
    let iconColor = 'white'
    return (
        <View style={manageIOTStyles.container}>
            <FlatList
                data={listRoom}
                contentContainerStyle = {manageIOTStyles.containerFlat}
                //contentContainerStyle = {'20%'}
                keyExtractor={(item)=> item.name}
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
                            navigation.navigate(item.name, { listIOT: item.listIOT, nameRoom: item.name });
                        }
                        }
                        //id= {item.name}
                    >
                        <Text
                            style={buttonText}
                        >
                            {item.name}
                        </Text>
                        <Ionicons name='arrow-forward' size={20} color={iconColor}/>
                    </Pressable>
                )}
            />
        </View>
    )
}