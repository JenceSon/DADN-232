import React, { useState, useEffect } from "react";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import api from "../../api/api";
import {useSelector} from 'react-redux'
function parseDatefromString(date_str) {
  //string is in format 4/11/2024, 12:00:00 AM
  const nowDate = new Date();
  const date = date_str.split(",")[0];
  const time = date_str.split(",")[1];

  let year = date.split("/")[2];
  let month = date.split("/")[0];
  let day = date.split("/")[1];

  let hour = time.split(":")[0];
  let minute = time.split(":")[1];
  let second = time.split(":")[2];
  //delete last 3 characters of second
  second = second.slice(0, -3);
  const newDate = new Date(year, month, day, hour, minute, second);
  console.log("Now date: " + nowDate);
  console.log("New date: " + newDate);

  if (nowDate.getDate() < newDate.getDate()) {
    console.log("Now date is less than new date");
    return true;
    
  }
  console.log("Now date is greater than new date");
  return false;


}
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
    },
  ];
  
  
  const user = useSelector((state) => state.user);
  const [lissclass, setListClass] = useState([]);
  useEffect( () => {
    async function fetchData() {
      try {
        const response = await api.get("/api/classInfo/getListClassByUser",{
          params: {
            id: user.id,
          },
        });


        setListClass(response.data);
  
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
    }
    fetchData();

  }, []);

  
  
  
  

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const OpenCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        let type = result.assets[0].mimeType;
        console.log("Type: " + type);
      }
    } catch (error) {
      console.log("Error in OpenCamera: " + error);
    }
  };
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
          {item.classRoom}
        </Text>
        <Text>
          From: {item.from} {"\n"}To: {item.to}
        </Text>
        <View
        style ={{
          flexDirection: "row",
          
          width: "100%",
          marginTop: 10,
        
        }}>
        <Text>
        Status:  
        </Text>
        {parseDatefromString(item.from) ? <Text style={{

          color: "green",

        }}> Available</Text> : <Text
        style={{
          color: "red",
        
        }}
        
        > Class is over</Text>}
        </View>

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
          <TouchableOpacity
            style={{
              flexDirection: "row",
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
            onPress={OpenCamera}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Attendance
              </Text>
            </View>
          </TouchableOpacity>

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
          data={lissclass}
          renderItem={renderItem}
          keyExtractor={(item) => item.from}
          style={{
            height: 321,
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
