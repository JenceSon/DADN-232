import React from "react";
import {
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
export function DeleteClassModal({ close, item }) {
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
                {item.subjectID}
              </Text>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                {" "}
                from: {item.from} - to: {item.to}
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
                onPress={() => close((oldVal) => !oldVal)}
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

