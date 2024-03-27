import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../../style/global";

export function Profile({navigation}){
    return (
        <View style = {globalStyles.container}>
            <Text>Profile</Text>
            <View className={"flex-1 justify-center items-center bg-cyan-500"}>
                <Text className="">Hehe</Text>
            </View>
        </View>
    )
}