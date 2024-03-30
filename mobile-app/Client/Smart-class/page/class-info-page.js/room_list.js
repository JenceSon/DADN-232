import React, { useState } from "react";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import { Text, View, ScrollView, FlatList, Pressable } from "react-native";
import Modal from "react-native-modal";

export function RoomList() {
  const DATA = [
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
    {
      id: "4",
      title: "Fourth Item",
    },
    {
      id: "5",
      title: "Fifth Item",
    },
    {
      id: "6",
      title: "Sixth Item",
    },
    {
      id: "7",
      title: "Seventh Item",
    },
    {
      id: "8",
      title: "Eighth Item",
    },
    {
      id: "9",
      title: "Ninth Item",
    },
    {
      id: "10",
      title: "Tenth Item",
    },
    {
      id: "11",
      title: "Eleventh Item",
    },
    {
      id: "12",
      title: "Twelfth Item",
    }
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          console.log("Pressed on " + item.title + " room.");
          setSelectedRoom(item);
          toggleModal();
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#d4d4d4" : "white",
          },
          {
            flexDirection: "column",
            marginBottom: 10,
            borderRadius: 10,

            padding: 40,
            shadowColor: "#171717",
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            width: 380,
            elevation: 5,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 16,
            color: "gray",
          }}
        >
          {item.title}
        </Text>
      </Pressable>
    );
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Modal isVisible={modalVisible}>
        <Pressable
          style={{
            flexDirection: "column",
            // justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: 20,
            height: 600,
          }}
          onPress={toggleModal}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "#82e2fa",
              marginTop: 60,
            }}
          >
            Room: {selectedRoom.title}
          </Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: "bold",
                color: "#82e2fa",
              }}
            >
              {" "}
              32 °
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#bcebf7",
                marginTop: 40,
              }}
            >
              Max: 32 ° Min: 32 °
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 40,
              width: "90%",
              height: 100,

              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Attendance
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 150,
              width: "90%",
              // backgroundColor: "red",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: 100,
                width: "45%",
                borderRadius: 20,
                shadowColor: "#171717",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>light</Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                height: 100,
                width: "45%",
                borderRadius: 20,
                shadowColor: "#171717",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Humidity</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "gray",
          marginLeft: 20,
        }}
      >
        Registered room
      </Text>

      <View
        style={{
          marginTop: 5,
        }}
      >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{
            height: 320,
          }}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
}
