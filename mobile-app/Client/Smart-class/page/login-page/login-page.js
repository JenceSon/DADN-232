import React, { useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import { initUser } from "../../features/user/userSlice";
import LottieView from "lottie-react-native";
import { RadioButton, TextInput as Input } from "react-native-paper";
import { Pressable } from "react-native";
import CusModal from "../../components/CusModal";
import api from "../../api/api";

export function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState(false);
  const signUpInfo = useRef({ id: "", Email: "", Pw: "", Role: "" });
  const [form, setForm] = useState({
    bkid: "",
    password: "",
  });
  const [signUpModal, setSignUpModal] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  function SignUpModal() {
    return (
      <>
        <CusModal
          title={"Sign Up"}
          isVisible={signUpModal}
          setVisibleState={() => setSignUpModal((preState) => !preState)}
          handleSubmit={handleSignUp}
        >
          <View
            className={"my-2 flex flex-col justify-center gap-5"}
            style={{ width: "100%" }}
          >
            <Input
              label={"Id"}
              placeholder={"2110913"}
              className={"flex-auto w-64"}
              keyboardType="numeric"
              mode="outlined"
              value={signUpInfo["id"]}
              onChangeText={(id) =>
                (signUpInfo.current = { ...signUpInfo.current, id })
              }
            />
            <Input
              label={"Email"}
              placeholder={"khuongduy429@gmail.com"}
              className={"flex-auto w-64"}
              //="Email"
              keyboardType="email-address"
              mode="outlined"
              onChangeText={(Email) =>
                (signUpInfo.current = { ...signUpInfo.current, Email })
              }
            />
            <Input
              label={"Password"}
              placeholder={""}
              className={"flex-auto w-64"}
              mode="outlined"
              secureTextEntry={true}
              onChangeText={(Pw) =>
                (signUpInfo.current = { ...signUpInfo.current, Pw })
              }
            />
            <RadioButton.Group
              onValueChange={(newValue) => {
                signUpInfo.current = { ...signUpInfo.current, Role: newValue };
                setCurrentRole((prev) => newValue);
              }}
              value={currentRole}
            >
              <View className="flex flex-row justify-start gap-5 mx-0.5 my-0.5">
                <View>
                  <Text>Student</Text>
                  <RadioButton value="Student" />
                </View>
                <View>
                  <Text>Teacher</Text>
                  <RadioButton value="Teacher" />
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </CusModal>
      </>
    );
  }

  async function handleSignUp() {
    try {
      const postResp = await api.post("/api/profile/add", signUpInfo.current);
      console.log(postResp.data);
    } catch (e) {
      console.log("Sign up fail:" + e.message);
    }
  }

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
            placeholder="Fill your BK ID"
            value={form.bkid}
            placeholderTextColor={"grey"}
            onChangeText={(bkid) => setForm({ ...form, bkid })}
          />
          <Text style={loginStyles.text}>Input your password</Text>
          <TextInput
            style={loginStyles.textInput}
            secureTextEntry
            value={form.password}
            placeholder="Fill your password"
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
                setFetchData(false);
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
                if (login_rs.Role === "Admin") {
                  navigation.navigate("Main admin", { admin: login_rs });
                } else
                  navigation.navigate("Main teacher", { teacher: login_rs });
              }
            }}
          >
            <Text style={loginStyles.buttonText}>Sign in</Text>
            <Ionicons name="arrow-forward" size={20} color={"white"} />
          </TouchableOpacity>
          <Pressable
            style={loginStyles.buttonUp}
            onPress={() => setSignUpModal((prevSt) => !prevSt)}
          >
            <Text style={loginStyles.buttonTextUp}>Sign Up</Text>
          </Pressable>
        </View>
        {signUpModal && <SignUpModal />}
      </View>
    </ScrollView>
  );
}
