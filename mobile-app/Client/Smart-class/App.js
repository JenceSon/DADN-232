import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainTeacher } from './page/main-page-teacher/main-page-teacher';
import { globalStyles } from './style/global';
import { Login } from './page/login-page/login-page';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import store from './store';
import { MainAdmin } from './page/main-page-admin/main-page-admin';


const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main teacher" component={MainTeacher} />
          <Stack.Screen name="Main admin" component={MainAdmin} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

