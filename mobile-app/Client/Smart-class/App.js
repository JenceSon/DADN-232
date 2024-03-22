import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainTeacher } from './page/main-page-teacher/main-page-teacher';
import { globalStyles } from './style/global';
import { Login } from './page/login-page/login-page';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer  >
      <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown : false,
      }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main teacher" component={MainTeacher} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

