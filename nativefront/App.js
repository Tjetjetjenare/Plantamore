import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Image,Button, TouchableOpacity } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import Calendar from './screens/Calendar';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
          component={Home}
          />
      </Stack.Navigator>
    </NavigationContainer>

  );

}

