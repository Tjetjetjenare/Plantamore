import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import Watered from '../screens/Watered';
import Nutrition from '../screens/Nutrition';
import Replant from '../screens/Replant';

const Tab = createBottomTabNavigator(); 

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Watered" component={Watered} />
      <Tab.Screen name="Nutrition" component={Nutrition} />
      <Tab.Screen name="Replant" component={Replant} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;