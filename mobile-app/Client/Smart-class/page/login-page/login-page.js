import React, { useState } from "react";
import { Image, View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { globalStyles } from "../../style/global";
import { loginStyles } from "../../style/login-style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CheckLogin } from "./login-func";
import { MainTeacher } from "../main-page-teacher/main-page-teacher";
import { useNavigation } from "@react-navigation/native";



export function Login() {
    const navigation = useNavigation()
    const [form, setForm] = useState({
        bkid: '',
        password: '',
    });
    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true} style={loginStyles.container}>
            <View style={loginStyles.container1}>
                <Image
                    style={loginStyles.logoImage}
                    source={require('../../assets/logo.png')}
                />
                <Text style={loginStyles.textHeader}>
                    SMART CLASS APP FOR BKU
                </Text>
                <Text style={loginStyles.textContent}>
                    Sign in to manage your class
                </Text>
            </View>
            <View style={loginStyles.container2}>
                <Text style={loginStyles.text}>
                    Input your BKID
                </Text>
                <TextInput
                    style={loginStyles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="example.example"
                    value={form.bkid}
                    placeholderTextColor={'grey'}
                    onChangeText={bkid => setForm({ ...form, bkid })}
                />
                <Text style={loginStyles.text}>
                    Input your password
                </Text>
                <TextInput
                    style={loginStyles.textInput}
                    secureTextEntry
                    value={form.password}
                    placeholder="Password"
                    onChangeText={password => setForm({ ...form, password })}
                />
                <Pressable
                    style={loginStyles.button}
                    onPress={() => {
                        let object = CheckLogin(bkid = form.bkid, pwd = form.password);
                        //do transaction screen here
                        console.log(form.bkid)
                        //console.log(form.password)
                        navigation.navigate("Main teacher", { teacher: object });
                    }
                    }
                >
                    <Text style={loginStyles.buttonText}>Sign in</Text>
                    <Ionicons name='arrow-forward' size={20} color={'white'} />
                </Pressable>
            </View>
        </ScrollView>

    )
}