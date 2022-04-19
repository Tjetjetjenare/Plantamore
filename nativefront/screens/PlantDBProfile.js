import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const plantbaseUrl = 'http://localhost:8000/api/plants/';

  function PlantDBProfile(props) {
    const [Plant, setPlant] = useState("");
    
    useEffect(async() => {
      try {
        const response = await axios.get(
         plantbaseUrl,
        );
        setPlant(response.data);
        console.log(response.data)
      } catch (error) {
      }
    },[]);
  
  
  
  
  return(
    <SafeAreaView style={styles.container} >
        <StatusBar style="auto"/>
        <Image 
            style={styles.arrowContainer} 
            source={require("../assets/backArrow.png")}>
        </Image>
        <Image
             style={styles.plantPic}
            source={require("../assets/testPlant.png")}>
        </Image>
        <Text 
            style={styles.textContainer}>
            <Text style={styles.latinName}>Pilea peperomioides{"\n"}</Text> 
            <Text>Chinese money plant{"\n"}</Text>
            <Text>Elefantöra </Text> 
        </Text>
        <View
            style={styles.infoBoard}>
        </View>
        <Text 
            style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non semper turpis, ac cursus risus. Morbi interdum metus molestie nisl pretium tristique. Morbi tortor justo, euismod ut dignissim eget, vestibulum in lorem. Donec molestie diam eget elit finibus dapibus. Duis vel tellus in leo feugiat posuere a ac orci. Vestibulum elementum tincidunt urna vel mollis. Quisque sit amet pulvinar lorem. Mauris sit amet quam in odio porttitor gravida at sed arcu. 
        </Text>
        <TouchableOpacity 
            style={styles.circle}
            onPress={() => Alert.alert('Watering can button pressed')}>
            <Image style={styles.wateringCan}
                    source={require("../assets/wateringCan.png")}>
                    
            </Image>
        </TouchableOpacity>

     </SafeAreaView>
  );
  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',

    },
    tinyLogo: {
      width: 200,
      height: 200,
    },
    arrowContainer: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20,  
    },
    plantPic: {
        height: 150,
        width: 150, 
        top: 30, 
        left: 30, 
    },

    textContainer: {
        fontSize: 18, 
        color: "black",
        top: 170, 
        left: "50%", 
        position: "absolute",
    },
    latinName: {
        fontWeight: "bold",
    },
    infoBoard: {
        width: "100%",
        height: 100, 
        backgroundColor: '#7E9B6D', 
        top: 60, 
    },
    description: {
        top: 100, 
        width: "80%",
        left: "10%",
        fontSize: 15, 
        textAlign: "justify", 
    },
    circle: {
        height: 100, 
        width: 100, 
        backgroundColor: "#C4C4C4",
        top: 200, 
        left: "60%",
        borderRadius: 50, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
        
    },

  });
  export default PlantDBProfile;