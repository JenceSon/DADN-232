import React, { useState } from "react";
import { Pressable, View, Text, Modal, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formRegisClassStyle } from "../../style/regis-class-style";
import { colors } from "../../style/global";
export function RegisterClassModal({ close }) {
  const [form, setForm] = useState({
    startTime: "",
    building: "",
    subject: "",
    classroom: "",
    noStu: "",
    endTime: " ",
  });

  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));
  const [showStartDateTimePicker, setshowStartDateTimePicker] = useState(false);
  const [showEndDateTimePicker, setshowEndDateTimePicker] = useState(false);

  return (
    <View style={formRegisClassStyle.centeredView}>
      <Modal animationType="fade" transparent={true}>
        <View style={formRegisClassStyle.centeredView}>
          <View style={formRegisClassStyle.modalStyle}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              Register class
            </Text>
            <TextInput
              label="Building No"
              placeholder="H1"
              mode="outlined"
              style={formRegisClassStyle.inputStyle}
              onChangeText={(building) => setForm({ ...form, building })}
            />
            <TextInput
              label="Classroom No"
              placeholder="201"
              mode="outlined"
              style={formRegisClassStyle.inputStyle}
              onChangeText={(classroom) => setForm({ ...form, classroom })}
            />
            <TextInput
              label="Subject ID"
              placeholder="CO12345"
              mode="outlined"
              style={formRegisClassStyle.inputStyle}
              onChangeText={(subject) => setForm({ ...form, subject })}
            />
            <TextInput
              label="Number of student"
              placeholder="xxx"
              mode="outlined"
              style={formRegisClassStyle.inputStyle}
              onChangeText={(noStu) => setForm({ ...form, noStu })}
            />
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>From:</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                {Platform.OS === "android" && (
                  <Pressable onPress={() => setshowStartDateTimePicker(true)} style={{backgroundColor:colors.bgColor, padding: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      {startTime.toLocaleTimeString(navigator.language, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Pressable>
                )}
                {Platform.OS === "android" && showStartDateTimePicker && (
                  <DateTimePicker
                    value={startTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={(event, startTime) => {
                      setshowStartDateTimePicker(false);
                      startTime.setMinutes(0, 0);
                      setForm({ ...form, startTime });
                      setStartTime(startTime);
                    }}
                  />
                )}
                {Platform.OS === "ios" && (
                  <DateTimePicker
                    display="default"
                    value={startTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={(event, startTime) => {
                      startTime.setMinutes(0, 0);
                      setForm({ ...form, startTime });
                      setStartTime(startTime);
                      setEndTime(startTime);
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>To:</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                {Platform.OS === "android" && (
                  <Pressable onPress={() => setshowEndDateTimePicker(true)} style={{backgroundColor:colors.bgColor, padding: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      {endTime.toLocaleTimeString(navigator.language, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Pressable>
                )}
                {Platform.OS === "android" && showEndDateTimePicker && (
                  <DateTimePicker
                    display="default"
                    value={endTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={(event, endTime) => {
                      setshowEndDateTimePicker(false);
                      endTime.setMinutes(0, 0);
                      setForm({ ...form, endTime });
                      setEndTime(endTime)
                    }}
                  />
                )}
                {Platform.OS === "ios" && (
                  <DateTimePicker
                    display="default"
                    value={endTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={(event, endTime) => {
                      endTime.setMinutes(0, 0);
                      setForm({ ...form, endTime });
                      setEndTime(endTime);
                    }}
                  />
                )}
              </View>
            </View>
            <Pressable style={formRegisClassStyle.btnStyle} onPress={close}>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
                Register
              </Text>
            </Pressable>
            <Pressable
              style={[
                formRegisClassStyle.btnStyle,
                formRegisClassStyle.cancleBtn,
              ]}
              onPress={close}
            >
              <Text
                style={{ color: "#acacac", fontWeight: "500", fontSize: 16 }}
              >
                Cancle
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}