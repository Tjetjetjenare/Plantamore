import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View,Image,Button, TouchableOpacity, ScrollView, Switch } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
// import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
import CreatePlantSubprofile from './screens/CreatePlantSubprofile'
import Profile from './screens/Profile';
import Calendar from './screens/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './components/CustomDrawer';

const plantbaseUrl = 'http://localhost:8000/api/plants/';
const userbaseUrl = 'http://localhost:8000/api/users/';
import Watered from './screens/Watered';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// error in PlantDBProfile, after recent pull 

export default function App() {

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
          {/* <Stack.Screen
          name = "PlantDB"
          component={PlantDBProfile}
          /> */}
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
          <Stack.Screen
          name = "CreateSub"
          component={CreatePlantSubprofile}
          />
          <Stack.Screen
          name = "Watered"
          component={Watered}
          />
      </Stack.Navigator>
    </NavigationContainer>


    return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent ={ props => <CustomDrawer {...props} />}
        screenOptions={{
          headerTintColor: '#000',
          drawerActiveBackgroundColor: '#FFF',
          drawerActiveTintColor: '#000',
          drawerLabelStyle: {
            color: '#000',
            fontSize: 15
          },
          drawerStyle: {
          backgroundColor: 'transparent',
          borderRadius:20,
          width:240
          },
        }}
      >
        {/* <Drawer.Screen
          name="Plant Cat 1"
          component={PlantDBProfile}
          options={{
            title:'Plant Cat 1',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="leaf-outline" size={25} color={'#000'} />
          )}}
        /> */}
        {/* <Drawer.Screen
          name="Plant Cat 2"
          component={PlantDBProfile}
          options={{
            title:'Plant Cat 2',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="leaf-outline" size={25} color={'#000'} />
          )}}
        /> */}
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title:'Home',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="home-outline" size={25} color={'#000'} />
          )}}
        />
        <Drawer.Screen
          name="Settings"
          component={Home}
          options={{
            title:'Settings',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="settings-outline" size={25} color={'#000'} />
          )}}
        />
        <Drawer.Screen
          name="Get Help"
          component={Home}
          options={{
            title:'Get Help',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="help-circle-outline" size={25} color={'#000'} />
          )}}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            title:'Profile',
            headerStyle: {
              backgroundColor: '#7E9B6D'
            },
            drawerIcon: () => (
            <Ionicons name="person-outline" size={25} color={'#000'} />
          )}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
