import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
import Profile from './screens/Profile';
import Nutrition from './screens/Nutrition';
import Replant from './screens/Replant';
import Calendar from './screens/Calendar';
import CreatePlantSubprofile from './screens/CreatePlantSubprofile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomDrawer from './components/CustomDrawer';
import Watered from './screens/Watered';


const Drawer = createDrawerNavigator();

function DrawerSideMenu() {
  return (
    <Drawer.Navigator drawerContent ={ props => <CustomDrawer {...props} />}
        screenOptions={{
          headerTintColor: '#000',
          drawerActiveBackgroundColor: '#FFF',
          drawerActiveTintColor: '#000',
          headerShown: false,
          drawerLabelStyle: {
            color: '#000',
            fontSize: 15
          },
          drawerStyle: {
          backgroundColor: 'transparent',
          width:240
          },
        }}
      >
        <Drawer.Screen
          name="Plant Cat 1"
          component={Replant}
          // options={{
          //   title:'Plant Cat 1',
          //   headerStyle: {
          //     backgroundColor: '#FFF'
          //   },
          //   drawerIcon: () => (
          //   <Ionicons name="leaf-outline" size={25} color={'#000'} />
          // )}}
        />
        <Drawer.Screen
          name="Plant Cat 2"
          component={PlantDBProfile}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: 'white'
          //   },
          //   drawerIcon: () => (
          //     <Ionicons name="leaf-outline" size={25} color={'#000'} />
          //   ),
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="chevron-back-outline"
          //       color="black"
          //       size={25}
          //       onPress={() => navigation.toggleDrawer()}
          //   />
          //   </View>,
          // })}
        />
        <Drawer.Screen
          name="Homea"
          component={StackNavigator}
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
        //   options={{
        //     title:'Settings',
        //     headerStyle: {
        //       backgroundColor: '#FFF'
        //     },
        //     drawerIcon: () => (
        //     <Ionicons name="settings-outline" size={25} color={'#000'} />
        //   )}}
        // />
        // <Drawer.Screen
        //   name="Guide"
        //   component={Home}
        //   options={{
        //     title:'Guide',
        //     headerStyle: {
        //       backgroundColor: '#FFF'
        //     },
        //     drawerIcon: () => (
        //     <Ionicons name="information-circle-outline" size={25} color={'#000'} />
        //   )}}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: '#7E9B6D'
          //   },
          //   drawerIcon: () => (
          //     <Ionicons name="information-circle-outline" size={25} color={'#000'} />
          //   ),
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="menu-outline"
          //       color="black"
          //       size={25}
          //       onPress={() => navigation.toggleDrawer()}
          //   />
          //   </View>,
          //   headerRight: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="calendar-outline"
          //       color="black"
          //       size={25}
          //       onPress={() => navigation.navigate('Calendar')}
          //   />
          //   </View>,
          // })}

        />
      </Drawer.Navigator>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={({ navigation }) => ({
        headerTintColor: 'white',
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white'
        },
      })
      }
    >

      <Stack.Screen
          name = "Home"
          component={Home}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: 'white'
            },
            headerLeft: () =>
            <View style={{ marginRight: 10 }}>
              <Ionicons
                name="menu-outline"
                color="black"
                size={40}
                onPress={() => navigation.toggleDrawer()}
            />
            </View>,
            headerRight: () => 
            <View style={{ marginLeft: 10 }}>
              <Ionicons
                name="person-outline"
                size={35}
                color="black"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          })}
          />
          <Stack.Screen
          name = "LogIn"
          component={LogIn}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: '#7E9B6D'
          //   },
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="chevron-back-outline"
          //       color="black"
          //       size={35}
          //       onPress={() => navigation.navigate('Home')}
          //   />
          //   </View>,
          // })}
          />
          <Stack.Screen
          name = "SignUp"
          component={SignUp}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: '#7E9B6D'
          //   },
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="chevron-back-outline"
          //       color="black"
          //       size={35}
          //       onPress={() => navigation.navigate('Home')}
          //   />
          //   </View>,
          // })}
          />
          <Stack.Screen
          name = "PlantSub"
          component={PlantSubprofile}
          />
           <Stack.Screen
          name = "Calendar"
          component={Calendar}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: 'white'
          //   },
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="close-outline"
          //       color="black"
          //       size={45}
          //       onPress={() => navigation.navigate('Profile')}
          //   />
          //   </View>,
          // })}
          />
          <Stack.Screen
          name = "Profile"
          component={Profile}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: '#7E9B6D'
          //   },
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="menu-outline"
          //       color="black"
          //       size={40}
          //       onPress={() => navigation.toggleDrawer()}
          //   />
          //   </View>,
          //   headerRight: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="calendar-outline"
          //       color="black"
          //       size={35}
          //       onPress={() => navigation.navigate('Calendar')}
          //   />
          //   </View>,
          // })}
          />

        <Stack.Screen
          name = "PlantDB"
          component={PlantDBProfile}
          />
        <Stack.Screen
          name = "CreateSub"
          component={CreatePlantSubprofile}
          />

          <Stack.Screen
          name = "Watered"
          component={Watered}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerStyle: {
          //     elevation: 0,
          //     shadowOpacity: 0,
          //     borderBottomWidth: 0,
          //     backgroundColor: '#7E9B6D'
          //   },
          //   headerLeft: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="menu-outline"
          //       color="black"
          //       size={40}
          //       onPress={() => navigation.toggleDrawer()}
          //   />
          //   </View>,
          //   headerRight: () =>
          //   <View style={{ marginRight: 10 }}>
          //     <Ionicons
          //       name="calendar-outline"
          //       color="black"
          //       size={35}
          //       onPress={() => navigation.navigate('Calendar')}
          //   />
          //   </View>,
          // })}
          />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <DrawerSideMenu />
    </NavigationContainer>
  );
}

export default App;