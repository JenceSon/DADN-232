import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { mainTeacherStyles } from "../../style/main-page-teacher-style";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { globalStyles, colors } from "../../style/global";

//screen
import { Profile } from "../profile-page/profile-page";
import { ManageIOT } from "../manage-iot-page/manage-iot-page";
import { RegisterClass } from "../regis-class-page/regis-class-page";
import { ClassInfo } from "../class-info-page.js/class-info-page";
import { Mic } from "../mic-tool/mic-func";


//screen name
const profileName = 'Profile';
const classInfoName = 'Anaylyst class';
const manageIOTName = 'Manage IOT';
const regisName = 'Register class'

const Tab = createBottomTabNavigator();

export function MainTeacher({ teacher }) {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            initialRouteName={manageIOTName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === profileName) {
                        iconName = focused ? 'person' : 'person-outline'
                    }
                    else if (rn === classInfoName) {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                    }
                    else if (rn === manageIOTName) {
                        iconName = focused ? 'build' : 'build-outline'
                    }
                    else if (rn === regisName) {
                        iconName = focused ? 'pencil' : 'pencil-outline'
                    }
                    else {
                        iconName = focused ? 'mic-circle' : 'mic-circle-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: colors.navigationColorActive,
                tabBarInactiveTintColor: colors.navigatorColorInActive,
                headerTitleAlign: 'center',
                headerTintColor: colors.headerColor,
                headerStyle: {
                    backgroundColor: colors.navigationColorActive,
                }
            })}
        >
            <Tab.Screen name={classInfoName} component={ClassInfo} />
            <Tab.Screen name={manageIOTName} component={ManageIOT} />
            <Tab.Screen name={'Mic'} component={Mic} />
            <Tab.Screen name={regisName} component={RegisterClass} />
            <Tab.Screen name={profileName} component={Profile} />
        </Tab.Navigator>
    );
}

