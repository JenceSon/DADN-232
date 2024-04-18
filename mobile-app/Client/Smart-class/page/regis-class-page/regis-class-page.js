import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalStyles, colors } from "../../style/global";
import { Entypo } from "@expo/vector-icons";
import { RegisterClassModal } from "./form-regis-class";
import { RegisterClassItem } from "./registered-class-item";
import { registerClassStyle } from "../../style/regis-class-style";
import api from "../../api/api";
import { useSelector } from "react-redux";

export function RegisterClass({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
    //setFetchData(!fetchData)
  };
  const user = useSelector(state => state.user)
  // const regisClass = [
  //   {
  //     id: "0",
  //     building: "H6",
  //     classRoom: "201",
  //     from: "19:00",
  //     to: "21:00",
  //     studentNo: "40",
  //     subjectID: "CO12938",
  //   },
  //   {
  //     id: "1",
  //     building: "H2",
  //     classRoom: "311",
  //     from: "08:00",
  //     to: "09:00",
  //     studentNo: "80",
  //     subjectID: "CO21383",
  //   },
  // ];
  const [regisClass,setRegisClass] = useState([])
  const [fetchData, setFetchData] = useState(false)

  const getRegisClass = async ()=>{
    try {
      let newList = await api.get("/api/registerClass/getScheduleUser",{params : {
        id : user.id,
      }})
      newList = newList.data
      if (newList.message){
        console.log(newList.message)
        setRegisClass([]) 
      }
      else{
        console.log(newList)
        setRegisClass(newList)
      }
    } catch (error) {
      console.error("Error call API : ", error)
    }
  }

  useEffect(()=>{
    getRegisClass()
  }, [fetchData])

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={{width:'100%'}}>
        <FlatList
          data={regisClass}
          style={registerClassStyle.containerListClass}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RegisterClassItem item={item} />}
        ></FlatList>
      </View>
      <Pressable
        style={registerClassStyle.regisClassBtn}
        onPress={toggleShowModal}
      >
        <Entypo name="add-to-list" size={24} color={colors.white} />
        <Text style={{ color: colors.white, fontWeight: "700" }}>Register</Text>
      </Pressable>
      {showModal && (
        <RegisterClassModal close={toggleShowModal} fetchData={fetchData} setFetchData={setFetchData} isVisible={showModal} style={{position:'absolute'}}></RegisterClassModal>
      )}
    </SafeAreaView>
  );
}
