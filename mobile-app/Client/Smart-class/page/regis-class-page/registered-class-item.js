import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles, colors } from "../../style/global";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { DeleteClassModal } from "./delete-registed-class";
import { registerClassItemStyle } from "../../style/regis-class-style";
export function RegisterClassItem({ item }) {
  const [deleteItem, setDeleteItem] = useState(false);
  return (
    <>
      <View style={registerClassItemStyle.container}>
        <View style={registerClassItemStyle.iconContainer}>
          <FontAwesome name="building" size={24} color="black" />
        </View>
        <View
          style={[
            registerClassItemStyle.insideContainer,
            { flexDirection: "col", flex: 1, gap: 8 },
          ]}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            {item.building} - {item.classRoom} {item.subjectID}
          </Text>
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: colors.black }}
          >
            Student Number:{" "}
            <Text style={{ fontWeight: "700" }}>{item.studentNo}</Text>
          </Text>
        </View>
        <View style={{ flexDirection: "column", flex: 0.5, gap: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: "400" }}>
            From: <Text style={{ fontWeight: "700" }}>{item.from}</Text>{" "}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: "400" }}>
            To: <Text style={{ fontWeight: "700" }}>{item.to}</Text>{" "}
          </Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Entypo
            name="circle-with-cross"
            size={24}
            color="red"
            onPress={() => {
              setDeleteItem((oldVal) => !oldVal);
            }}
          />
        </View>
      </View>
      {deleteItem && (
        <DeleteClassModal close={setDeleteItem} item={item} />
      )}
    </>
  );
}