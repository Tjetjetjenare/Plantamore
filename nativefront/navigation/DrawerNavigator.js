import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator } from "./StackNavigator";
import { PlantDatabaseStackNavigator } from "./StackNavigator";
import { GuideStackNavigator } from "./StackNavigator";
import { ProfileStackNavigator } from "./StackNavigator";
import { CalendarStackNavigator } from "./StackNavigator";
import { CareStackNavigator } from "./StackNavigator";
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
        drawerStyle: {
        backgroundColor: 'transparent',
        width:240
        },
      }}
      initialRouteName="HomeDrawer"
      >
      
      <Drawer.Screen name="PlantDatabaseDrawer" component={PlantDatabaseStackNavigator}
        options={{
            title: "Plant Database",
            drawerLabelStyle: {
              color: '#000',
              fontSize: 16,
            },
            drawerIcon: () => (
              <Ionicons name="leaf-outline" size={25} color={'#000'} />
            )
          }}
      />
      <Drawer.Screen name="HomeDrawer" component={MainStackNavigator} 
        options={{
            title: "Home",
            drawerLabelStyle: {
              color: '#000',
              fontSize: 16,
            },
            drawerIcon: () => (
              <Ionicons name="home-outline" size={25} color={'#000'} />
            )
          }}
      />
      <Drawer.Screen name="ProfileDrawer" component={ProfileStackNavigator} 
        options={{
            title: "Profile",
            drawerLabelStyle: {
              color: '#000',
              fontSize: 16,
            },
            drawerIcon: () => (
            <Ionicons name="person-outline" size={25} color={'#000'} />
            )
        }}
      />
      <Drawer.Screen  name="CalendarDrawer" component={CalendarStackNavigator} 
        options={{
            title: "Calendar",
            drawerLabelStyle: {
              color: '#000',
              fontSize: 16,
            },
            drawerIcon: () => (
            <Ionicons name="calendar-outline" size={25} color={'#000'} />
          )
        }}
      />
      <Drawer.Screen  name="CareDrawer" component={CareStackNavigator} 
        options={{
          title: "Water & Care",
          drawerLabelStyle: {
            marginLeft: -7,
            color: '#000',
            fontSize: 16,
          },
          drawerIcon: () => (
            <Image 
            style={styles.wateringCanPic}
            source={require("../assets/plantCare.png")}>
       </Image>
        )
        }}
      />
      <Drawer.Screen name="GuideDrawer" component={GuideStackNavigator} 
        options={{
            title: "Care Guide",
            drawerLabelStyle: {
              color: '#000',
              fontSize: 16,
            },
            drawerIcon: () => (
                <Ionicons name="information-circle-outline" size={25} color={'#000'} />
            )
            }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;


const styles = StyleSheet.create({
  wateringCanPic: {
      width: '15%', 
      height: '100%', 
      alignSelf: 'center', 
      top: 0, 
  },

})