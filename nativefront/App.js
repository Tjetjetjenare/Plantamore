import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from "axios"

const plantbaseUrl = 'http://localhost:8000/api/students/';
export default function App() {
  
  const getDataUsingAsyncAwaitGetCall = async () => {
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
  /*axios.get('http://localhost:8000/api/students/').then((response) => {
    const firstplant = response.data[0]
  console.log(firstplant)
  //return firstplant
});*/
  return (
    <View style={styles.container} >
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Here i want to display plant with id 1! fasdd</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingAsyncAwaitGetCall}>
        <Text>Click to see plant 1</Text>
      </TouchableOpacity>
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
});
