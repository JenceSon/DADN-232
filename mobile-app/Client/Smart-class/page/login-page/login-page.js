import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { loginStyles } from "../../style/login-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CheckLogin } from "./login-func";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { initUser } from "../../features/user/userSlice";
import LottieView from "lottie-react-native";
import { colors } from "../../style/global";

export function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [fetchData, setFetchData] = useState(false);

  const [form, setForm] = useState({
    bkid: "",
    password: "",
  });
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={loginStyles.container}
    >
      <View>
        {fetchData && (
          <Modal>
            <View className="flex flex-1 justify-center items-center">
              <LottieView
                source={require("../../assets/loading_anim.json")}
                autoPlay
                loop
                style={{ width: "70%", aspectRatio: 1 }}
              />
            </View>
          </Modal>
        )}
        <View style={loginStyles.container1}>
          <Image
            style={loginStyles.logoImage}
            source={require("../../assets/logo.png")}
          />
          <Text style={loginStyles.textHeader}>SMART CLASS APP FOR BKU</Text>
          <Text style={loginStyles.textContent}>
            Sign in to manage your class
          </Text>
        </View>
        <View style={loginStyles.container2}>
          <Text style={loginStyles.text}>Input your BKID</Text>
          <TextInput
            style={loginStyles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="School ID: 2110101"
            value={form.bkid}
            placeholderTextColor={"grey"}
            onChangeText={(bkid) => setForm({ ...form, bkid })}
          />
          <Text style={loginStyles.text}>Input your password</Text>
          <TextInput
            style={loginStyles.textInput}
            secureTextEntry
            value={form.password}
            placeholder="Password: 123123"
            onChangeText={(password) => setForm({ ...form, password })}
          />
          <TouchableOpacity
            style={loginStyles.button}
            onPress={async () => {
              setFetchData(true);
              const login_rs = await CheckLogin({
                bkid: form.bkid,
                password: form.password,
              });
              setTimeout(() => {
                setFetchData(false);
              }, 500);
              if (!login_rs.id) {
                console.log("login fail");
              } else {
                //set new user redux state
                dispatch(
                  initUser({
                    id: login_rs.id,
                    Phone: login_rs.Phone ? login_rs.Phone : "",
                    Role: login_rs.Role,
                    Email: login_rs.Email,
                    Faculty: login_rs.Faculty ? login_rs.Faculty : "",
                    Name: login_rs.Name,
                    Status: login_rs.Status,
                    Type: login_rs.Type,
                  })
                );
                if (login_rs.Role == "Admin") {
                  navigation.navigate("Main admin", { admin: login_rs });
                } else
                  navigation.navigate("Main teacher", { teacher: login_rs });
              }
            }}
          >
            <Text style={loginStyles.buttonText}>Sign in</Text>
            <Ionicons name="arrow-forward" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
