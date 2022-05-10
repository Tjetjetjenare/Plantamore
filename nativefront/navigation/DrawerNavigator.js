import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator } from "./StackNavigator";
import { PlantDatabaseStackNavigator } from "./StackNavigator";
import { GuideStackNavigator } from "./StackNavigator";
import { ProfileStackNavigator } from "./StackNavigator";
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent ={ props => <CustomDrawer {...props} />}
    screenOptions={{
        swipeEnabled: false, //false
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
      initialRouteName="Home"
      >
      
      <Drawer.Screen name="PlantDatabase" component={PlantDatabaseStackNavigator}
        options={{
            title: "Plant Database",
            drawerIcon: () => (
              <Ionicons name="leaf-outline" size={25} color={'#000'} />
            )
          }}
      />
      <Drawer.Screen name="ProfileDrawer" component={ProfileStackNavigator} 
        options={{
            title: "Profile",
            drawerIcon: () => (
            <Ionicons name="person-outline" size={25} color={'#000'} />
            )
        }}
      />
      <Drawer.Screen name="Home" component={MainStackNavigator} 
        options={{
            title: "Home",
            drawerIcon: () => (
              <Ionicons name="home-outline" size={25} color={'#000'} />
            )
          }}
      />
      <Drawer.Screen name="GuideDrawer" component={GuideStackNavigator} 
        options={{
            title: "Guide",
            drawerIcon: () => (
                <Ionicons name="information-circle-outline" size={25} color={'#000'} />
            )
            }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;