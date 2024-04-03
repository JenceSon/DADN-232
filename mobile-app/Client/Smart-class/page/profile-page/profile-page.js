import React, { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, TextInput, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../style/global";
import { setName } from "../../features/user/userSlice";
import { LottieView } from "lottie-react-native/src/LottieView";
import CusModal from "../../components/CusModal";
export function Profile({ navigation }) {
    const user = useSelector(state => state.user); //vao cac states chua trong store, lua ra state ten "user"
    const dispatch = useDispatch();
    const [updateProfile, setUpdateProfile] = useState(false)
    
    //field that user can update
    // const [userName, setUsername] = useState("");
    const userNameUpdate = useRef("")
    
    const UpdateProfileModal = () => {
        return (
            <>
                <CusModal title={"Update Profile"} isVisible={updateProfile} setVisibleState={() => setUpdateProfile(preState => preState = !preState)}
                handleSubmit={() => { dispatch(setName(userNameUpdate.text)) }}
                >
                    <View className="flex flex-col gap-2 ">
                        <View className="bg-slate-200 rounded-2xl p-2">
                            <TextInput
                                ref={userNameUpdate}
                                className="mx-auto text-lg"
                                placeholder="Type new name"
                                onChangeText={newText => userNameUpdate.text = newText}
                            />
                        </View>
                        <View className="bg-slate-200 rounded-2xl p-2">
                            <TextInput
                                className="mx-auto text-lg"
                                placeholder="Type new class"
                            />
                        </View>
                    </View>
                </CusModal>
            </>
        )
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
                            className = "tracking-widest"
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
                                    className = "tracking-widest basis-1/2"
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
                                    <LottieView source={require("../../assets/setting_profile.json")} style={{ width: 100, height: 60 }} autoPlay loop />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>


            </View>


        );
    }
    return (
        <ScrollView style={{ backgroundColor: colors.bgColor }} className="mx-0">
            {updateProfile &&
                <UpdateProfileModal />}
            <AnaHeader />
            <Container type={"row"}>
                <View className="basis-1/3">
                    <Text>{user.Faculty}</Text>
                    <Label labeName={"Falcuty"} />
                </View>
                <View className="basis-1/3">
                    <Text>{user.Type}</Text>
                    <Label labeName={"Type"} />
                </View>
                <View className="basis-1/3">
                    <Text>{user.id}</Text>
                    <Label labeName={"ID"} />
                </View>
            </Container>
            <View>
                {/* <View className="flex flex-col gap-2 mt-1"> */}
                <Container type={"col"} name={"Information"}>
                    <ContanerElemenRow label={"Full Name"} value={user.Name} />
                    <ContanerElemenRow label={"Phone"} value={user.Phone} />
                    <ContanerElemenRow label={"Email"} value={user.Email} />
                    <ContanerElemenRow label={"Status"} value={user.Status} />
                    <ContanerElemenRow label={"Type"} value={user.Type} />
                </Container>
            </View>

        </ScrollView >
    )
}
function Label({ labeName }) {
    return (
        <>
            <Text className="text-gray-400 text-xs font-semibold">{labeName}</Text>
        </>);
}
function Container({ children, type, name }) {
    return (
        <View className={"mx-3 my-4 border border-blue-500 px-2 rounded-2xl"}>
            {
                (name != null) &&
                <View>
                    <Text className="text-xl font-semibold text-gray-400 my-2">{name}</Text>
                </View>
            }
            <View className={(type == "row" ? "flex flex-row" : "flex flex-col") + " container justify-between items-cen gap-3 px-3 py-2"}>
                {children}
            </View>
        </View>
    );
}
function ContanerElemenRow({ label, value }) {
    return (
        <View className="flex flex-row justify-between items-center p-2 border-b border-gray-200">
            <Text className="text-gray-500 text-justify font-medium basis-1/3">{label}</Text>
            <Text className="text-gray-800">{value}</Text>
        </View>
    );
}
