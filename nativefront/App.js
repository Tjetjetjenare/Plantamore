import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
import Profile from './screens/Profile';
import Calendar from './screens/Calendar';
import Nutrition from './screens/Nutrition';
import Replant from './screens/Replant';
import Guide from './screens/Guide';
import CreatePlantSubprofile from './screens/CreatePlantSubprofile';
import Watered from './screens/Watered';
import PlantDatabase from './screens/PlantDatabase';
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

// If problems occur with stacked screens look up "reset stack route "StackActions""


import { MainStackNavigator } from "./navigation/StackNavigator";
import BottomTabNavigator from "./navigation/TabNavigator";
import DrawerNavigator from "./navigation/DrawerNavigator";

 const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}
export default App