import React, { useState } from "react";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import { Text, View, ScrollView } from "react-native";

export function RoomList() {


  return (
    <View style={{
        marginTop: 20,
        marginLeft: 20,
    }}>
        <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color:"gray",
        
        }}>Registered room</Text>
    </View>

   
  );
}
