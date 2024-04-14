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

//screen name
const profileName = 'Profile';
const manageIOTName = 'Manage IOT';

const Tab = createBottomTabNavigator();

export function MainAdmin({admin}) {
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
                    else if (rn === manageIOTName) {
                        iconName = focused ? 'build' : 'build-outline'
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
            <Tab.Screen name={manageIOTName} component={ManageIOT} />
            <Tab.Screen name={profileName} component={Profile} />
        </Tab.Navigator>
    );
}
