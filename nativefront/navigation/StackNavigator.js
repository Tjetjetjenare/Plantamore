import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import LogIn from '../screens/LogIn';
import PlantDBProfile from '../screens/PlantDBProfile';
import PlantSubprofile from '../screens/PlantSubprofile';
import Profile from '../screens/Profile';
import Calendar from '../screens/Calendar';
import Watered from '../screens/Watered';
import Nutrition from '../screens/Nutrition';
import Replant from '../screens/Replant';
import Guide from '../screens/Guide';
import PlantDatabase from '../screens/PlantDatabase';
import { DrawerNavigator } from "./DrawerNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

const screenOptionStyle = {
    headerShown: true,
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
      options={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: 'white'
        },
        headerLeft: () =>
        <View>
          <Ionicons
            style={{marginLeft: 10}}
            name="menu-outline"
            color="black"
            size={40}
            onPress={() => navigation.toggleDrawer()}
        />
        </View>,
        headerRight: () => 
        <View style={{ marginRight: 10 }}>
          <Ionicons
            style={{marginRight: 10}}
            name="person-outline"
            size={35}
            color="black"
            onPress={() => navigation.navigate('ProfileDrawer')}
          />
        </View>
      })}
      
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="PlantDBProfile" component={PlantDBProfile} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      {/* <Stack.Screen name="Calendar" component={Calendar} /> */}
      {/* <Stack.Screen name="Watered" component={Watered} />
      <Stack.Screen name="Nutrition" component={Nutrition} />
      <Stack.Screen name="Replant" component={Replant} /> */}

    </Stack.Navigator>
  );
}

const PlantDatabaseStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="PlantDatabase" component={PlantDatabase} />
      </Stack.Navigator>
    );
  }

  const GuideStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Guide" component={Guide} />
      </Stack.Navigator>
    );
  }

  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Profile" component={Profile} 
            options={({ navigation }) => ({
                headerShown: true,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: '#7E9B6D'
                },
                headerLeft: () =>
                <View>
                  <Ionicons
                    style={{marginLeft: 10}}
                    name="menu-outline"
                    color="black"
                    size={40}
                    onPress={() => navigation.toggleDrawer()}
                />
                </View>,
                headerRight: () =>
                <View>
                  <Ionicons
                    style={{marginRight: 10}}
                    name="calendar-outline"
                    color="black"
                    size={35}
                    onPress={() => navigation.navigate('Calendar')}
                />
                </View>,
              })}
        />
        <Stack.Screen name="PlantSubprofile" component={PlantSubprofile} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Watered" component={BottomTabNavigator} />
        <Stack.Screen name="Nutrition" component={BottomTabNavigator} />
        <Stack.Screen name="Replant" component={BottomTabNavigator} />
      </Stack.Navigator>
    );
  }
  
  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { 
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                elevation: 0,
                height: 60,
                borderRadius: 10,
            },
           
        }}
      >
        <Tab.Screen name="Watered" component={Watered}  
            options={{
                tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
                    <Image source={require("../assets/wateringCan.png")}
                    resizeMode='contain'
                    style={{width: 40, height: 40, tintColor: focused? "#7E9B6D" : "black"}}/>
                </View>) 
                }}
        />
        <Tab.Screen name="Nutrition" component={Nutrition} 
            options={{
                tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
                <Image source={require("../assets/nutritionFlask.png")}
                  resizeMode='contain'
                  style={{width: 40, height: 40, tintColor: focused? "#7E9B6D" : "black"}}/>
              </View>) 
              }}
        />
        <Tab.Screen name="Replant" component={Replant} 
            options={{
                tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
                <Image source={require("../assets/replant.png")}
                resizeMode='contain'
                style={{width: 40, height: 40, tintColor: focused? "#7E9B6D" : "black"}}/>
            </View>) 
            }}
          />
      </Tab.Navigator>
    );
  };
  
  export { MainStackNavigator, PlantDatabaseStackNavigator, GuideStackNavigator, ProfileStackNavigator, BottomTabNavigator };