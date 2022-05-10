import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator } from "./StackNavigator";
import { PlantDatabaseStackNavigator } from "./StackNavigator";
import { GuideStackNavigator } from "./StackNavigator";
import { ProfileStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent ={ props => <CustomDrawer {...props} />}
    screenOptions={{
        swipeEnabled: true, //false
        headerTintColor: '#000',
        drawerActiveBackgroundColor: '#FFF',
        drawerActiveTintColor: '#000',
        headerShown: true,
        drawerLabelStyle: {
          color: '#000',
          fontSize: 15
        },
        drawerStyle: {
        backgroundColor: 'transparent',
        width:240
        },
      }}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="PlantDatabase" component={PlantDatabaseStackNavigator} />
      <Drawer.Screen name="GuideDrawer" component={GuideStackNavigator} />
      <Drawer.Screen name="ProfileDrawer" component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;