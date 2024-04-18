import React from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles, colors } from "../../style/global";
import { FontAwesome } from "@expo/vector-icons";
import { deleteRegistedClassStyle } from "../../style/regis-class-style";
import { useDispatch, useSelector } from "react-redux";
import { setIsChange } from "../../features/fetchData/fetchDataSlice";
import api from "../../api/api";



export function DeleteClassModal({ close, item }) {
  const dispatch = useDispatch()
  const fetchDataGlobal = useSelector(state=>state.fetchDataGlobal)
  const delSchedule = async () =>{
    try {
      let res = await api.post('/api/registerClass/delSchedule',{
        id : item.id
      })
      res = res.data
      console.log(res)
      if (res.message){
        Alert.alert("Fail",res.message,[{
          text : 'OK'
        }])
      }
      else{
        Alert.alert("Success",res.success,[
          {
            text : 'OK'
          }
        ])
        dispatch(setIsChange(!fetchDataGlobal.isChange))
        close((oldVal)=> !oldVal)
      }
      

    } catch (error) {
      Alert.alert("Fail","Error deleting schedule " + error,[
        {
          text : 'OK'
        }
      ])
    }
  }

  return (
    <View style={deleteRegistedClassStyle.centeredView}>
      <Modal animationType="fade" transparent={true}>
        <View style={deleteRegistedClassStyle.centeredView}>
          <View style={deleteRegistedClassStyle.modalStyle}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome name="warning" size={24} color="#DD5746" />
              <Text
                style={{ fontWeight: "700", fontSize: 18, color: "#DD5746" }}
              >
                Warning
              </Text>
            </View>
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              Do you really want to unschedule class
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                {" "}
                {item.Course}
              </Text>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                {" "}
                from: {(new Date(item.FromTime)).toLocaleString()} - to: {(new Date(item.ToTime)).toLocaleString()}
              </Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Pressable
                onPress={() => close((oldVal) => !oldVal)}
                style={[deleteRegistedClassStyle.submitBtn, deleteRegistedClassStyle.cancleBtn]}
              >
                <Text style={deleteRegistedClassStyle.textBtn}>Cancle</Text>
              </Pressable>
              <Pressable
                onPress={delSchedule}
                style={[deleteRegistedClassStyle.submitBtn, deleteRegistedClassStyle.deleteBtn]}
              >
                <Text style={[deleteRegistedClassStyle.textBtn, {color:'white'}]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

