import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Image,Button, TouchableOpacity } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import PlantDBProfile from './screens/PlantDBProfile';
import PlantSubprofile from './screens/PlantSubprofile';
const plantbaseUrl = 'http://localhost:8000/api/plants/';
const userbaseUrl = 'http://localhost:8000/api/users/';
 /*
export default function App() {
 
  const [index, setIndex] = useState(0);
  const [State, setState] = useState("");
  
  useEffect(async() => {
    try {
      const response = await axios.get(
        plantbaseUrl,
      );
      setState(response.data[index]);
    } catch (error) {
      // handle error
    }
  },[State])

  /*function nextPlant() {
    try {
      const response =  axios.get(
        plantbaseUrl,
      );
      var i = index +1;
      setIndex(i)
      console.log("SWITCH")
      setState(response.data[index]);
    } catch (error) {
      console.log(error)
      // handle error
    }
  }*/

   
  /*const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get(
        plantbaseUrl,
      );
      alert(JSON.stringify(response.data[0]));
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };


  <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingAsyncAwaitGetCall}>
        
      </TouchableOpacity>
  
  return (
    <View style={styles.container} >
      <Image
        style={styles.tinyLogo}
       // source={State.image_url}
      />
      <Text>Name: {State.email}</Text>
      <Text>Here i want to display plant with id 1!</Text>
      <Text>english_name: {State.english_name}</Text>
      <Text>Latin_name: {State.password}</Text>
      <Text>description:</Text>
      <Button
        onPress={() => setIndex(1)}
        color="#841584"
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});
*/
export default function App() {
  
  return <Home/>;

}

