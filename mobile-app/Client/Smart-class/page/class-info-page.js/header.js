import React from "react";
import { globalStyles } from "../../style/global";
import {
  Image,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function Header({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "#82e2fa",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: 150,
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
            style={{
              fontSize: 20,

              color: "white",
              marginTop: 12,
              marginLeft: 10,
            }}
          >
            Welcome
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",

              marginLeft: 10,
            }}
          >
            Chan Hung
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
              marginTop: 5,
            }}
          >
          <MaterialCommunityIcons
              name="badge-account-horizontal"
              size={24}
              color="white"
            />
            <Text
              style={{
                fontSize: 14,
                color: "white",
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              Role: Teacher
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => {
          console.log("Notification");
          //TODO: View notification list
        }}
      >
        <MaterialCommunityIcons
          style={{
            marginTop: 16,
          }}
          name="bell"
          size={28}
          color="white"
        />
      </Pressable>
    </View>


  );
}
