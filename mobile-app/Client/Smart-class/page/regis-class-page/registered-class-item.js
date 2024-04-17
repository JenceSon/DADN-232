import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles, colors } from "../../style/global";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { DeleteClassModal } from "./delete-registed-class";
import { registerClassItemStyle } from "../../style/regis-class-style";


// "FromTime": "2024-04-11T02:00:00.423Z",
// "ToTime": "2024-04-23T16:00:00.666Z",
// "Date": "4/11/2024",
// "NoStu": 30,
// "Location": "H6-201",
// "User": "2110101",
// "Course": "CO3002",
// "Class": "L02",
// "id": "1",
// "endDate": "4/23/2024"
// (new Date).toLocaleString()
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
            {item.Location} {item.Course}-{item.Class}
          </Text>
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: colors.black }}
          >
            Student Number:{" "}
            <Text style={{ fontWeight: "700" }}>{item.NoStu}</Text>
          </Text>
        </View>
        <View style={{ flexDirection: "column", flex: 0.5, gap: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: "400" }}>
            From:{"\n"}<Text style={{ fontWeight: "700" }}>{(new Date(item.FromTime)).toLocaleString()}</Text>{" "}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: "400" }}>
            To:{"\n"}<Text style={{ fontWeight: "700" }}>{(new Date(item.ToTime)).toLocaleString()}</Text>{" "}
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