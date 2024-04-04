import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { colors, globalStyles } from "../../style/global";
import { useNavigation, useRoute } from "@react-navigation/native";
import { manageIOTStyles } from "../../style/manage-iot-style";
import { Header } from "react-native/Libraries/NewAppScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListRoom } from "./list-room";
import Ionicons from '@expo/vector-icons/Ionicons';


const listBuilding = [
    {
        //id: "H1",
        name : "H1",
        listRoom: [],
    },
    {
        //id: "H2",
        name : "H2",
        listRoom: [],
    },
    {
        //id: "H3",
        name : "H3",
        listRoom: [],
    },
    {
        //id: "H4",
        name : "H6",
        listRoom: [],
    },
]
const listRoom = [
    {
        //id: "H1-101",
        name : "H1-101",
        listIOT: [],
    },
    {
       // id: "H1-102",
        name : "H1-102",
        listIOT: [],
    },
    {
        //id: "H1-103",
        name : "H1-103",
        listIOT: [],
    },
    {
        //id: "H1-104",
        name : "H1-104",
        listIOT: [],
    },
    {
        //id: "H1-105",
        name : "H1-105",
        listIOT: [],
    },
    {
        //id: "H1-106",
        name : "H1-106",
        listIOT: [],
    },
    {
        //id: "H1-107",
        name : "H1-107",
        listIOT: [],
    },
    {
        //id: "H1-108",
        name : "H1-108",
        listIOT: [],
    },
    {
        //id: "H1-109",
        name : "H1-109",
        listIOT: [],
    },
]
export function ManageIOT() {

    const navigation = useNavigation()
    const Stack = createNativeStackNavigator()
    return (
        <View style={manageIOTStyles.container}>
            <Stack.Navigator
                initialRouteName="List Building"
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: colors.navigationColorActive,
                    tabBarInactiveTintColor: colors.navigatorColorInActive,
                    headerTitleAlign: 'center',
                    headerTintColor: colors.headerColor1,
                    headerStyle: {
                        backgroundColor: colors.bgColor,
                    },
                })}
            >
                <Stack.Screen name = "List Building" component={ListBuilding} initialParams={{listBuilding : listBuilding}} />
                {
                    listBuilding.map(item=>(
                        <Stack.Screen name = {item.name} component={ListRoom} initialParams={{listRoom : listRoom}}/>
                    ))
                }
            </Stack.Navigator>
        </View>
    )
}

function ListBuilding() {
    const route = useRoute()
    const navigation = useNavigation()
    const { listBuilding } = route.params
    return (
        <View style={manageIOTStyles.container}>
            <FlatList
                key={'listBuilding'}
                numColumns={2}
                data={listBuilding}
                keyExtractor={(item)=> item.name}
                contentContainerStyle={{ justifyContent:'flex-start'}}
                columnWrapperStyle={{justifyContent:'space-around' }}
                // contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                renderItem={({ item }) => (
                    <Pressable
                        style={manageIOTStyles.buildingBtn}
                        onPress={() => {
                            navigation.navigate(item.name, { listRoom: listRoom });
                        }
                        }
                        //id= {item.name}
                        //key={item.name}
                    >
                        <Ionicons name='home' color={'#0074CE'} size = {80}/>
                        <Text
                            style={manageIOTStyles.buildingText}
                        >
                            {item.name}
                        </Text>
                    </Pressable>
                )}
            />
        </View>
    )
}