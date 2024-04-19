import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
//import usestate
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api";

export function CalendarBox() {
  const [today, setToday] = useState({});
  const user = useSelector((state) => state.user);
  const fetchDataGlobal = useSelector((state) => state.fetchDataGlobal)
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
  function isToday(from) {
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
    const toDate = new Date();
    console.log("From date: " + fromDate);
    console.log("To date: " + toDate);

    if (
      fromDate.getDate() === toDate.getDate() &&
      fromDate.getMonth() === toDate.getMonth() &&
      fromDate.getFullYear() === toDate.getFullYear()
    ) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    let today = new Date();
   
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    today = {
      day: day,
      date: today.getDate(),
      month: month,
      year: today.getFullYear(),
    };
    console.log(today);

    setToday(today);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/api/classInfo/getListClassByUser", {
          params: {
            id: user.id,
          },
        });
        console.log("Response2222: " + response.data);
        console.log("Response: " + response.data[0].from);
        let todayList = [];
        response.data.forEach((item) => {
          console.log("Item: " + item.from);
          if (isToday(item.from)) {
            todayList.push(item);
          }
        })
        console.log("Today list: " + todayList);
        let key=0;
        setRoomToday([]);
        let colorList = ["#ffb3ba", "#ffffba", "#bae1ff", "#baffc9"];
        let currentColor = 0;
        todayList.forEach((item) => {
          setRoomToday((roomToday) => [
            ...roomToday,
            {
              room: item.classRoom,
              key: key,
              color: colorList[currentColor%4],
              time: item.from,
            },
          ]);
          key++;
          currentColor++;
        })

        // setListClass(response.data);
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
     
    }

    fetchData();
  }, [fetchDataGlobal]);
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
              {today.day}{" "}
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                marginTop: 12,
                color: "#82e2fa",
              }}
            >
              {today.date}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#98e6fa",
                marginTop: 12,
              }}
            >
              {today.month} - {today.year}
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
              Today upcoming class{" "}
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
                    flexShrink: 1,
                    color: "gray",
                    marginLeft: 10,
                    marginTop: 3,
                  }}
                >
                  {item.room}:{item.time}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
