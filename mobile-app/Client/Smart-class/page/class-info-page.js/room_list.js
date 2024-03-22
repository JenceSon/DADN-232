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
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            width: 380,
            elevation: 3,
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
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: 20,
            height: 600,
          }}
          onPress={toggleModal}
        >
          <Text>{selectedRoom.title}</Text>
        </Pressable>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: 20,
            height: 600,
          }}
        >
          <Text>{selectedRoom.title}</Text>
        </View> */}
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
          marginTop: 20,
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
