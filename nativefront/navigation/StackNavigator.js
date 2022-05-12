import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import LogIn from '../screens/LogIn';
import PlantDBProfile from '../screens/PlantDBProfile';
import PlantSubprofile from '../screens/PlantSubprofile';
import CreatePlantSubprofile from '../screens/CreatePlantSubprofile';
import Profile from '../screens/Profile';
import Calendar from '../screens/Calendar';
import Watered from '../screens/Watered';
import Nutrition from '../screens/Nutrition';
import Replant from '../screens/Replant';
import Guide from '../screens/Guide';
import PlantDatabase from '../screens/PlantDatabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

//gör en login stack istället

function sendTo(navigation){
  AsyncStorage.getItem('inloggad').then(value =>{
    var val =value 
    if( val == "true"){
      navigation.navigate('ProfileDrawer', {screen: 'Profile'})
    }
    else{
      navigation.navigate('ProfileDrawer', {screen: 'LogIn'})
    }
  });
  
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        title: '',
      }}
      initialRouteName="Home"
    >
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
            onPress={() => sendTo(navigation)}
          />
        </View>
      })}
      
      />
    
      <Stack.Screen name="PlantDB" component={PlantDBProfile} 
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
                style={{ marginLeft: 10 }}
                name="chevron-back-outline"
                color="black"
                size={35}
                onPress={() => navigation.navigate('PlantDatabase')}
            />
            </View>,
        })}
      />
      <Stack.Screen name="GuideMain" component={GuideStackNavigator} 
        options={({ navigation }) => ({
            headerShown: false,
          })}
      />
    </Stack.Navigator>
  );
}

const PlantDatabaseStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            title: "Plant Database",
        }}
      >
        <Stack.Screen name="PlantDatabase" component={PlantDatabase} 
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
                    style={{ marginLeft: 10 }}
                    name="chevron-back-outline"
                    color="black"
                    size={30}
                    onPress={() => navigation.navigate("Home")}
                />
                </View>,
            })}
        />
      </Stack.Navigator>
    );
  }

  const GuideStackNavigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        title: "",
    }}
      >
        <Stack.Screen name="Guide" component={Guide} 
            options={({ navigation }) => ({
                headerShown: true,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: '#7E9B6D'
                },
                headerLeft: () =>
                <View style={{ marginLeft: 10 }}>
                  <Ionicons
                    name="close-outline"
                    color="black"
                    size={35}
                    onPress={() => navigation.navigate('Home')}
                />
                </View>,
              })}
        />
      </Stack.Navigator>
    );
  }

  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            title: "",
        }}
      >
        <Stack.Screen name="SignUp" component={SignUp} 
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
                style={{ marginLeft: 10 }}
                name="chevron-back-outline"
                color="black"
                size={35}
                onPress={() => navigation.navigate('Home')}
            />
            </View>,
        })}
      />
      <Stack.Screen name="LogIn" component={LogIn} 
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
                style={{ marginLeft: 10 }}
                name="chevron-back-outline"
                color="black"
                size={35}
                onPress={() => navigation.navigate('Home')}
            />
            </View>,
          })}
      />
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
        <Stack.Screen name="PlantSub" component={PlantSubprofile} 
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
                    style={{ marginLeft: 10 }}
                    name="chevron-back-outline"
                    color="black"
                    size={35}
                    onPress={() => navigation.navigate('Profile')}
                />
                </View>,
            })}
        />
        <Stack.Screen name="CreateSub" component={CreatePlantSubprofile} 
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
                style={{ marginLeft: 10 }}
                name="chevron-back-outline"
                color="black"
                size={35}
                onPress={() => navigation.goBack()}
            />
            </View>,
            })}
        />
        <Stack.Screen name="Calendar" component={Calendar} 
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
                    style={{ marginLeft: 5 }}
                    name="close-outline"
                    color="black"
                    size={40}
                    onPress={() => navigation.goBack()}
                />
                </View>,
            })}
        />
        <Stack.Screen name="Watered" component={BottomTabNavigator} 
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
                    style={{ marginLeft: 10 }}
                    name="close-outline"
                    color="black"
                    size={40}
                    
                    onPress={() => navigation.goBack()}
                />
                </View>,
            })}
        />
        <Stack.Screen name="Nutrition" component={BottomTabNavigator} 
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
                    style={{ marginLeft: 10 }}
                    name="close-outline"
                    color="black"
                    size={40}
                    
                    onPress={() => navigation.goBack()}
                />
                </View>,
            })}
        />
        <Stack.Screen name="Replant" component={BottomTabNavigator} 
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
                    style={{ marginLeft: 10 }}
                    name="close-outline"
                    color="black"
                    size={40}
                    
                    onPress={() => navigation.goBack()}
                />
                </View>,
            })}
        />
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
                bottom: 10,
                left: 20,
                right: 20,
                elevation: 0,
                height: 60,
                borderRadius: 10,
            },
        }}
      >
        <Tab.Screen name="WateredTab" component={Watered}  
            options={{
                tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
                    <Image source={require("../assets/wateringCan.png")}
                    resizeMode='contain'
                    style={{width: 40, height: 40, top: Platform.OS === 'ios' ? 10: 0, tintColor: focused? "#7E9B6D" : "black"}}/>
                </View>) 
                }}
        />
        <Tab.Screen name="NutritionTab" component={Nutrition} 
            options={{
                tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
                <Image source={require("../assets/nutritionFlask.png")}
                  resizeMode='contain'
                  style={{width: 40, height: 40, top: Platform.OS === 'ios' ? 10: 0, tintColor: focused? "#7E9B6D" : "black"}}/>
              </View>) 
              }}
        />
        <Tab.Screen name="ReplantTab" component={Replant} 
            options={{
                tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
                <Image source={require("../assets/replant.png")}
                resizeMode='contain'
                style={{width: 40, height: 40, top: Platform.OS === 'ios' ? 10: 0, tintColor: focused? "#7E9B6D" : "black"}}/>
            </View>) 
            }}
          />
      </Tab.Navigator>
    );
  };
  
  export { MainStackNavigator, PlantDatabaseStackNavigator, GuideStackNavigator, ProfileStackNavigator, BottomTabNavigator };