import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import axios from "axios"

const plantbaseUrl = 'http://localhost:8000/api/plants/';
export default function App() {
  const [State, setState] = useState("");
  useEffect(async() => {
    try {
      const response = await axios.get(
        plantbaseUrl,
      );
      setState(response.data[0]);
    } catch (error) {
      // handle error
    }
  })
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
  */
  return (
    <View style={styles.container} >
      <Image
        style={styles.tinyLogo}
        source={State.image_url}
      />
      <Text>Name: {State.swedish_name}</Text>
      <Text>Here i want to display plant with id 1!</Text>
      <Text>Id: {State.p_id}</Text>
      <Text>english_name: {State.english_name}</Text>
      <Text>Latin_name: {State.latin_name}</Text>
      <Text>description: {State.description}</Text>
      
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