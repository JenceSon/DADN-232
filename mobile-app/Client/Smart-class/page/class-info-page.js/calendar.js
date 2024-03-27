import React, { useState } from "react";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";

export function CalendarComponent() {
  const [selected, setSelected] = useState("");

  return (
    <Calendar
      style={{width: 350, height: 370, borderRadius: 20, backgroundColor: 'white', }}
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedDotColor: "red",
        },
      }}
    />
  );
}
