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


// If problems occur with stacked screens look up "reset stack route "StackActions""



const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={({ navigation }) => ({
        title: '',
        headerBackTitle: () => null,
        // headerShown: false,
        // headerStyle: {
        //   backgroundColor: 'white'
        // },
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
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          })}
          />
          <Stack.Screen
          name = "LogIn"
          component={LogIn}
          options={({ navigation }) => ({
            headerTintColor: 'white',
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
                name="chevron-back-outline"
                color="black"
                size={35}
                onPress={() => navigation.navigate('Home')}
            />
            </View>,
          })}
          />
          <Stack.Screen
          name = "SignUp"
          component={SignUp}
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
          <Stack.Screen
          name = "PlantSub"
          component={PlantSubprofile}
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
           <Stack.Screen
          name = "Calendar"
          component={Calendar}
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
                size={45}
                onPress={() => navigation.navigate('Profile')}
            />
            </View>,
          })}
          />
          <Stack.Screen
          name = "Profile"
          component={Profile}
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

        <Stack.Screen
          name = "PlantDB"
          component={PlantDBProfile}
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
                onPress={() => navigation.navigate('Home')}
            />
            </View>,
            headerRight: () => 
            <View style={{ marginRight: 10 }}>
              <Ionicons
                style={{marginRight: 10}}
                name="person-outline"
                size={35}
                color="black"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          })}
          />
        <Stack.Screen
          name = "CreateSub"
          component={CreatePlantSubprofile}
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

          {/* <Stack.Screen
          name = "Watered"
          component={Watered}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: '#7E9B6D'
            },
            // headerLeft: () =>
            // <View>
            //   <Ionicons
            //     style={{ marginLeft: 10 }}
            //     name="menu-outline"
            //     color="black"
            //     size={40}
            //     onPress={() => navigation.toggleDrawer()}
            // />
            // </View>,
            // headerRight: () =>
            // <View>
            //   <Ionicons
            //     style={{ marginRight: 10 }}
            //     name="calendar-outline"
            //     color="black"
            //     size={35}
            //     onPress={() => navigation.navigate('Calendar')}
            // />
            // </View>,
          })}
          /> */}
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function DrawerSideMenu() {
  
  return (
    <Drawer.Navigator drawerContent ={ props => <CustomDrawer {...props} />}
        screenOptions={{
          swipeEnabled: true, //false
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
          name="Plant Tabs"
          component={WNRTabs}
          options={{
            title:'Plant Cat 1',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="leaf-outline" size={25} color={'#000'} />
          )}}
        />
        <Drawer.Screen
          name="Plant Database"
          component={PlantDatabase} 
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: '#7E9B6D'
            },
            drawerIcon: () => (
              <Ionicons name="leaf-outline" size={25} color={'#000'} />
            ),
            headerLeft: () =>
            <View style={{ marginRight: 10 }}>
              <Ionicons
                name="chevron-back-outline"
                color="black"
                size={25}
                onPress={() => navigation.toggleDrawer()}
            />
            </View>,
          })}
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
            <Ionicons name="home-outline" size={25} color={'#000'}/>
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
          name="Guide"
          component={Guide}
          options={{
            title:'Guide',
            headerStyle: {
              backgroundColor: '#FFF'
            },
            drawerIcon: () => (
            <Ionicons name="information-circle-outline" size={25} color={'#000'} />
          )}}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => ({
            headerShown: true,
            headerTintColor: '#7E9B6D',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: '#7E9B6D'
            },
            drawerIcon: () => (
              <Ionicons name="person-outline" size={25} color={'#000'} />
            ),
            headerLeft: () =>
            <View>
              <Ionicons
                style={{ marginLeft: 10 }}
                name="menu-outline"
                color="black"
                size={40}
                onPress={() => navigation.toggleDrawer()}
            />
            </View>,
            headerRight: () =>
            <View>
              <Ionicons
                style={{ marginRight: 10 }}
                name="calendar-outline"
                color="black"
                size={35}
                onPress={() => navigation.navigate('Calendar')}
            />
            </View>,
          })}
        />
      </Drawer.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function WNRTabs(navigation) {
  return (
    <Tab.Navigator
      initialRouteName="Watered"
      activeColor="black"
      labeled={false}
      barStyle={{
        backgroundColor: 'white',
      }}
    >
      <Tab.Screen
        name="Watered"
        component={Watered}
        options={{
          tabBarLabel:"Watered",
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
            <Image source={require("./assets/wateringCan.png")}
              resizeMode='contain'
              style={{width: 40, height: 40, tintColor: focused? "#7E9B6D" : "black"}}/>
          </View>) 
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={Nutrition}
        options={{
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
          <Image source={require("./assets/nutritionFlask.png")}
            resizeMode='contain'
            style={{width: 40, height: 40, tintColor: focused? "#7E9B6D" : "black"}}/>
        </View>) 
        }}
      />
      <Tab.Screen
        name="Replant"
        component={Replant}
        options={{
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({ focused }) => (<View style={{alignItems: 'center', justifyContent: 'center'}}> 
          <Image source={require("./assets/replant.png")}
            resizeMode='contain'
            style={{width: 40, height: 40, tintColor: focused? "#7E9B6D" : "black"}}/>
        </View>) 
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <DrawerSideMenu />
    </NavigationContainer>
  );
}

export default App;
