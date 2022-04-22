import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Image,Button, TouchableOpacity } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
import Profile from './screens/Profile';
import Calendar from './screens/Calendar';
import CreatePlantSubprofile from './screens/CreatePlantSubprofile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Watered from './screens/Watered';
const plantbaseUrl = 'http://localhost:8000/api/plants/';
const userbaseUrl = 'http://localhost:8000/api/users/';
const Stack = createNativeStackNavigator();

export default function App() {
  

  return ( 
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name = "Home"
          component={Home}
          />
          <Stack.Screen
          name = "LogIn"
          component={LogIn}
          />
          <Stack.Screen
          name = "SignUp"
          component={SignUp}
          />
          <Stack.Screen
          name = "PlantDB"
          component={PlantDBProfile}
          />
          <Stack.Screen
          name = "PlantSub"
          component={PlantSubprofile}
          />
           <Stack.Screen
          name = "Calendar"
          component={Calendar}
          />
          <Stack.Screen
          name = "Profile"
          component={Profile}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

