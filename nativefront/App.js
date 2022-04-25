import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View,Image,Button, TouchableOpacity, ScrollView, Switch } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
import CreatePlantSubprofile from './screens/CreatePlantSubprofile'
import Profile from './screens/Profile';
import Calendar from './screens/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './components/CustomDrawer';

const plantbaseUrl = 'http://localhost:8000/api/plants/';
const userbaseUrl = 'http://localhost:8000/api/users/';
import Watered from './screens/Watered';
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();




// import Constants from 'expo-constants';
// import * as Animatable from 'react-native-animatable';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

// const BACON_IPSUM =
//   'Hello ';

// const CONTENT = [
//   {
//     title: 'First',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Second',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Third',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Fourth',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Fifth',
//     content: BACON_IPSUM,
//   },
// ];


// export default class App extends Component {
//   state = {
//     activeSections: [],
//     collapsed: true,
//     multipleSelect: false,
//   };

//   toggleExpanded = () => {
//     this.setState({ collapsed: !this.state.collapsed });
//   };

//   setSections = (sections) => {
//     this.setState({
//       activeSections: sections.includes(undefined) ? [] : sections,
//     });
//   };

//   renderHeader = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.header, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Text style={styles.headerText}>{section.title}</Text>
//       </Animatable.View>
//     );
//   };

//   renderContent(section, _, isActive) {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.content, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
//           {section.content}
//         </Animatable.Text>
//       </Animatable.View>
//     );
//   }

//   render() {
//     const { multipleSelect, activeSections } = this.state;

//     return (
//       <View style={styles.container}>
//         <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
//           <Text style={styles.title}>Accordion Example</Text>

//           <View style={styles.multipleToggle}>
//             <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
//             <Switch
//               value={multipleSelect}
//               onValueChange={(a) => this.setState({ multipleSelect: a })}
//             />
//           </View>

//           <TouchableOpacity onPress={this.toggleExpanded}>
//             <View style={styles.header}>
//               <Text style={styles.headerText}>Single Collapsible</Text>
//             </View>
//           </TouchableOpacity>
//           <Collapsible collapsed={this.state.collapsed} align="center">
//             <View style={styles.content}>
//               <Text>
//                 Single Collapsible
//               </Text>
//             </View>
//           </Collapsible>
//           <Accordion
//             activeSections={activeSections}
//             sections={CONTENT}
//             touchableComponent={TouchableOpacity}
//             expandMultiple={multipleSelect}
//             renderHeader={this.renderHeader}
//             renderContent={this.renderContent}
//             duration={400}
//             onChange={this.setSections}
//             renderAsFlatList={false}
//           />
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     paddingTop: 55,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: '300',
//     marginBottom: 20,
//   },
//   header: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   headerText: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   content: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   active: {
//     backgroundColor: 'rgba(255,255,255,1)',
//   },
//   inactive: {
//     backgroundColor: 'rgba(245,252,255,1)',
//   },
//   selectors: {
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   selector: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   activeSelector: {
//     fontWeight: 'bold',
//   },
//   selectTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     padding: 10,
//   },
//   multipleToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 30,
//     alignItems: 'center',
//   },
//   multipleToggle__title: {
//     fontSize: 16,
//     marginRight: 8,
//   },
// });

const CONTENT = [
  {
  isExpanded: false,
  category_name: 'Item 1',
  subcategory: [
    {id:1, val:'Sub 1'},
    {id:2, val:'Sub 2'}
    ]
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    subcategory: [
      {id:3, val:'Sub 4'},
      {id:4, val:'Sub 5'}
      ]
    },
];

export default function App() {
  const [multiSelect, setmultiSelect] = useState(false);
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
          name = "PlantDB"
          component={PlantDBProfile}/>
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
        <Drawer.Screen
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
        />
        <Drawer.Screen
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
        />
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