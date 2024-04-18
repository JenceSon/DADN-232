import React from "react";
import { View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
//import usestate
import { useState } from "react";

export function CalendarBox() {
  const [roomToday, setRoomToday] = useState([
    {
      room: "H6-202",
      key: "2",
      color: "#ffffba",
      time: "15:00 - 16:00  19/4/2024",
    },
    {
      room: "H6-301",
      key: "3",
      color: "#baffc9",
      time: "18:00 - 20:00 22/4/2024",
    },
  ]);
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "95%",
          flexDirection: "row",
          justifyContent: "space-between",

          borderRadius: 20,
          marginTop: -40,
          height: 170,
          shadowColor: "#171717",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 20,
            backgroundColor: "white",

            shadowColor: "#171717",
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 3,
            flexGrow: 1,
          }}
        >
          <View
            style={{
              marginTop: 20,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#98e6fa",
                marginTop: 12,
              }}
            >
              Friday{" "}
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                marginTop: 12,
                color: "#82e2fa",
              }}
            >
              1
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#98e6fa",
                marginTop: 12,
              }}
            >
              October - 2024
            </Text>
          </View>
        </View>

        <View
          style={{
            flexBasis: 220,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "light",
                color: "gray",
                marginTop: 4,
              }}
            >
              Upcoming{" "}
            </Text>
          </View>
          {roomToday.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  marginTop: 10,
                }}
                key={item.key}
              >
                <Octicons name="dot-fill" size={20} color={item.color} />
                <Text
                  style={{
                    fontSize: 15,

                    color: "gray",
                    marginLeft: 10,
                    marginTop: 3,
                  }}
                >
                  {item.room}: {item.time}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
