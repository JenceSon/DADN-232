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
import { useSelector } from "react-redux";
function parseDatefromString(from, to) {
  //string is in format 4/11/2024, 12:00:00 AM
  const nowDate = new Date();

  const fromdate = from.split(",")[0];

  const fromtime = from.split(",")[1];

  let fromyear = fromdate.split("/")[2];

  let frommonth = fromdate.split("/")[0];

  let fromday = fromdate.split("/")[1];

  let fromhour = fromtime.split(":")[0];
  let fromminute = fromtime.split(":")[1];
  let fromsecond = fromtime.split(":")[2];
  let fromampm = fromsecond.split(" ")[1];

  if (fromampm == "PM") {
    fromhour = parseInt(fromhour) + 12;
  }

  //delete last 3 characters of second
  fromsecond = fromsecond.slice(0, -3);
  const fromDate = new Date(
    fromyear,
    frommonth - 1,
    fromday,
    fromhour,
    fromminute,
    fromsecond
  );

  let todate = to.split(",")[0];

  let totime = to.split(",")[1];

  let toyear = todate.split("/")[2];

  let tomonth = todate.split("/")[0];

  let today = todate.split("/")[1];

  let tohour = totime.split(":")[0];
  let tominute = totime.split(":")[1];
  let tosecond = totime.split(":")[2];
  let toampm = tosecond.split(" ")[1];

  if (toampm == "PM") {
    tohour = parseInt(tohour) + 12;
  }

  //delete last 3 characters of second
  tosecond = tosecond.slice(0, -3);

  const toDate = new Date(
    toyear,
    tomonth - 1,
    today,
    tohour,
    tominute,
    tosecond
  );

  if (nowDate.getTime() > toDate.getTime()) {
    return 0;
  } else if (nowDate.getTime() < fromDate.getTime()) {
    return 2;
  } else {
    return 1;
  }
}
export function RoomList() {
  const user = useSelector((state) => state.user);
  const fetchDataGlobal = useSelector((state) => state.fetchDataGlobal)
  const [lissclass, setListClass] = useState([]);
  const [count, setCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [noStu, setNoStu] = useState("Undefined, click to take picture");
  const [temp, setTemp] = useState(0);
  const [Light, setLight] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/api/classInfo/getListClassByUser", {
          params: {
            id: user.id,
          },
        });
        console.log("Response: " + response.data);

        setListClass(response.data);
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
    }

    fetchData();
  }, [fetchDataGlobal]);
  useEffect(() => {
    console.log("SSSSSSSSSSSSSSSSSSSSSSS");
    async function fetchData() {
      try {
        const temp = await api.get("/api/IoTDevice/getTempSensor");
        console.log("Temp: " + temp.data[0].value);

        setTemp(temp.data[0].value);

        const light = await api.get("/api/IoTDevice/getLightSensor");
        console.log("Light: " + light.data[0].value);

        setLight(light.data[0].value);
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
    }
    fetchData();
  }, [count]);

  const OpenCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setNoStu("Processing...");
        let type = result.assets[0].mimeType;
        let base64String =
          "data:" + type + ";base64," + result.assets[0].base64;

        //send base64String to server
        const response = await api.post("/api/classInfo/getNumberStu", {
          base64String: base64String,
        });
        let data = await response.data;
        console.log(data.noStu);
        setNoStu(data.noStu);
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
          setCount(count + 1);
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
          style={{
            flexDirection: "row",

            width: "100%",
            marginTop: 10,
          }}
        >
          <Text>Status:</Text>
          {parseDatefromString(item.from, item.to) == 0 ? (
            <Text style={{ color: "gray" }}> Expired</Text>
          ) : parseDatefromString(item.from, item.to) == 1 ? (
            <Text style={{ color: "green" }}> Ongoing</Text>
          ) : (
            <Text style={{ color: "yellow" }}> Upcoming</Text>
          )}
        </View>
      </Pressable>
    );
  };

  const toggleModal = () => {
    setCount(count + 1);
    console.log("Count: " + count);
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
              {temp} °
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#bcebf7",
                marginTop: 40,
              }}
            >
              Max: 31.2 ° Min: 29.1 °
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
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Attendance:
              </Text>
              <Text>{noStu}</Text>
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
              <Text>Light</Text>
              <Text>{Light} lux</Text>
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
              <Text>60%</Text>
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
