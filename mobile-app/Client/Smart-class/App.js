import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainPageTeacher } from './page/main-page-teacher/main-page-teacher';
import { globalStyles } from './style/global';


const DefaultPage = MainPageTeacher();
export default function App() {
  return (
      <DefaultPage globalStyle={globalStyles}/>
  );
}

