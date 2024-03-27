import React, { useState } from "react";
import { Text, View, ScrollView,  } from "react-native";
import { globalStyles } from "../../style/global";

import { Header } from "./header";
import { CalendarBox } from "./calendar_box";
import { RoomList } from "./room_list";

export function ClassInfo({ navigation }) {
  return (
    <View>
      <Header navigation={navigation} />
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
      <CalendarBox />
      <RoomList />
      
      


        
      </View>
    </View>
  );
}
