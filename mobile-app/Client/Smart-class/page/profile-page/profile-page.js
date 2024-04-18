import React, {useCallback, useRef, useState} from "react";
import {Text, TouchableOpacity, View, Image, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../style/global";
import {setFaculty, setName, setPhone, setStatus, setType} from "../../features/user/userSlice";
import {LottieView} from "lottie-react-native/src/LottieView";
import CusModal from "../../components/CusModal";
import {TextInput} from "react-native-paper";
import {formRegisClassStyle} from "../../style/regis-class-style";
import api from "../../api/api";
import {useNavigation} from "@react-navigation/native";

export function Profile({navigation}) {
    const user = useSelector(state => state.user); //vao cac states chua trong store, lua ra state ten "user"
    const dispatch = useDispatch();
    const [updateProfile, setUpdateProfile] = useState(false)
    const navigator = useNavigation();

    const userUpdate = useRef(
        {Name: "", Phone: "", Faculty: "", Status: "", Type: ""})

    const UpdateProfileModal = () => {
        return (
            <>
                <CusModal title={"Update Profile"} isVisible={updateProfile}
                          setVisibleState={() => setUpdateProfile(preState => preState = !preState)}
                          handleSubmit={() => {
                              handleUpdateProfile();
                          }}
                >
                    <View className={"flex flex-col gap-5"} style={{width: "100%"}}>
                        <TextInput
                            label={"Full Name"}
                            placeholder="Nguyễn Văn An"
                            className={"flex-auto w-64"}
                            value={userUpdate["name"]}
                            onChangeText={newText => userUpdate.current["Name"] = newText}
                        />
                        <TextInput
                            label={"Phone"}
                            className={"flex-auto w-64"}
                            placeholder="0913990009"
                            value={userUpdate["phone"]}
                            onChangeText={newText => userUpdate.current["Phone"] = newText}
                        />
                        <TextInput
                            label={"Faculty"}
                            className={"flex-auto w-64"}
                            placeholder="CSE"
                            value={userUpdate["Faculty"]}
                            onChangeText={newText => userUpdate.current["Faculty"] = newText}
                        />
                        <TextInput
                            label={"Status"}
                            className={"flex-auto w-64"}
                            placeholder="On Learning"
                            value={userUpdate["Status"]}
                            onChangeText={newText => userUpdate.current["Status"] = newText}
                        />
                        <TextInput
                            label={"Type"}
                            className={"flex-auto w-64"}
                            placeholder="Formal"
                            value={userUpdate["Type"]}
                            onChangeText={newText => userUpdate.current["Type"] = newText}
                        />
                    </View>
                </CusModal>
            </>
        )
    }

    async function handleUpdateProfile() {
        console.log(userUpdate)
        try {
            //send api for update
            let data = user;
            const keys = Object.keys(userUpdate.current);
            keys.forEach((key) => {
                if (userUpdate.current[key] !== "") {
                    data[key] = userUpdate.current[key];
                }
            })
            console.log(data)
            const updResp = await api.post("/api/profile/updateInfo",
                data)
            dispatch(setName(userUpdate.current["Name"]));
            dispatch(setPhone(userUpdate.current["Phone"]));
            dispatch(setFaculty(userUpdate.current["Faculty"]));
            dispatch(setStatus(userUpdate.current["Status"]));
            dispatch(setType(userUpdate.current["Type"]));
        } catch (e) {
            console.log("Update user profile fail:" + e.message);
        }
    }

    function AnaHeader(params) {
        return (
            <View
                style={{
                    backgroundColor: "#82e2fa",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 5,
                    paddingHorizontal: 12,
                    paddingBottom: 0

                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                    }}
                >
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            marginTop: 10,
                            marginLeft: 5,
                        }}
                        source={require("../../assets/profile.png")}
                    />
                    <View>

                        <Text
                            className="tracking-widest"
                            style={{
                                fontSize: 20,
                                fontWeight: "semibold",
                                color: "white",

                                marginLeft: 10,
                            }}
                        >
                            {user.Name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginLeft: 10,
                                gap: 30,
                                marginEnd: 2,
                                marginTop: 5,
                            }}
                        >
                            <View className="flex flex-row">
                                <MaterialCommunityIcons
                                    name="badge-account-horizontal"
                                    size={24}
                                    color="white"
                                />
                                <Text
                                    className="tracking-widest basis-1/2"
                                    style={{
                                        fontSize: 14,
                                        color: "white",
                                        marginLeft: 10,
                                        marginTop: 5,
                                    }}
                                >
                                    Role: {user.Role}
                                </Text>
                                <TouchableOpacity
                                    className="m-0 p- basis-1/3 "
                                    onPress={() => {
                                        setUpdateProfile(true)
                                    }}
                                >
                                    <LottieView source={require("../../assets/setting_profile.json")}
                                                style={{width: 100, height: 60}} autoPlay loop/>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>


            </View>


        );
    }

    return (
        <ScrollView style={{backgroundColor: colors.bgColor}} className="mx-0">
            {updateProfile &&
                <UpdateProfileModal/>}
            <AnaHeader/>
            <Container type={"row"}>
                <View className="basis-1/3">
                    <Text>{user.Faculty}</Text>
                    <Label labeName={"Faculty"}/>
                </View>
                <View className="basis-1/3">
                    <Text>{user.Type}</Text>
                    <Label labeName={"Type"}/>
                </View>
                <View className="basis-1/3">
                    <Text>{user.id}</Text>
                    <Label labeName={"ID"}/>
                </View>
            </Container>
            <View>
                {/* <View className="flex flex-col gap-2 mt-1"> */}
                <Container type={"col"} name={"Information"}>
                    <ContanerElemenRow label={"Full Name"} value={user.Name}/>
                    <ContanerElemenRow label={"Phone"} value={user.Phone}/>
                    <ContanerElemenRow label={"Email"} value={user.Email}/>
                    <ContanerElemenRow label={"Status"} value={user.Status}/>
                    <ContanerElemenRow label={"Type"} value={user.Type}/>
                </Container>
            </View>
        </ScrollView>
    )
}

function Label({labeName}) {
    return (
        <>
            <Text className="text-gray-400 text-xs font-semibold">{labeName}</Text>
        </>);
}

function Container({children, type, name}) {
    return (
        <View className={"mx-3 my-4 border border-blue-500 px-2 rounded-2xl"}>
            {
                (name != null) &&
                <View>
                    <Text className="text-xl font-semibold text-gray-400 my-2">{name}</Text>
                </View>
            }
            <View
                className={(type === "row" ? "flex flex-row" : "flex flex-col") + " container justify-between items-cen gap-3 px-3 py-2"}>
                {children}
            </View>
        </View>
    );
}

function ContanerElemenRow({label, value}) {
    return (
        <View className="flex flex-row justify-between items-center p-2 border-b border-gray-200">
            <Text className="text-gray-500 text-justify font-medium basis-1/3">{label}</Text>
            <Text className="text-gray-800">{value}</Text>
        </View>
    );
}

