import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios"

const plantbaseUrl = 'http://localhost:8000/api/students/';
export default function App() {
  
  const [post, setPost] = React.useState(null);
   React.useEffect(async() => {
    try {
     await axios.get(plantbaseUrl).then((response) => {
      setPost(response.data[0]);
    });}
    catch(e){
      // Show an error message
 }
  }, []);
  console.log(post)
  /*axios.get('http://localhost:8000/api/students/').then((response) => {
    const firstplant = response.data[0]
  console.log(firstplant)
  //return firstplant
});*/
  return (
    <View style={styles.container} >
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Here i want to display plant with id 1! fasdd
       
         </Text>
      
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
