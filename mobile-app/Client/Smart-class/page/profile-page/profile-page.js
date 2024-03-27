import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
export function Profile({ navigation }) {
    const user = useSelector(state => state.user); //vao cac states chua trong store, lua ra state ten "user"
    const nameArr = user.name.split(" ");
    const shortName = nameArr[nameArr.length - 2] + " " + nameArr[nameArr.length - 1]
    const dispatch = useDispatch();

    return (
        <View className="mx-8 my-2">
            <View className="flex flex-row justify-between mb-2 items-center ">
                <View className="">
                    <Text className="text-xl font-bold ">{shortName}</Text>
                    <Text className="text-gray-400 font-medium">{user.role}</Text>
                </View>
                <TouchableOpacity onPress={() => { console.log("click icon pencil") }} >
                    <View className="">
                        <FontAwesome name="pencil-square-o" size={35} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <Container type={"row"}>
                <View className="basis-1/3">
                    <Text>CSE</Text>
                    <Label labeName={"Khoa"} />
                </View>
                <View className="basis-1/3">
                    <Text>MTKH02</Text>
                    <Label labeName={"Lớp"} />
                </View>
                <View className="basis-1/3">
                    <Text>2110913</Text>
                    <Label labeName={"ID"} />
                </View>
            </Container>
            <View>
                {/* <View className="flex flex-col gap-2 mt-1"> */}
                <Container type={"col"} name={"Thông tin"}>
                    <ContanerElemenRow label={"Tên"} value={"Nguyễn 'Ego' Khánh Hoà"} />
                    <ContanerElemenRow label={"SĐT"} value={"0910090999"} />
                    <ContanerElemenRow label={"Email"} value={"hoa.dathu@hcmut.edu.vn"} />
                    <ContanerElemenRow label={"Tình trạng"} value={"Đang học"} />
                    <ContanerElemenRow label={"Hệ"} value={"Chính quy"} />
                </Container>
            </View>

        </View>
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
        // <View className={(type == "row" ? "flex flex-row" : "flex flex-col") + " container justify-between gap-3 mb-10 border border-gray-400 p-4 rounded-2xl"}>
        <View className={"my-4 border border-gray-400 px-2 rounded-2xl"}>
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