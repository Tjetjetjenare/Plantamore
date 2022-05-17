import React, { useState, useEffect } from "react";
import {TouchableOpacity, StyleSheet, Text, ScrollView, View, Image, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}


  function PlantDBProfile({route, navigation}) {
    const [Plant, setPlant] = useState("");
    const {plantId, EnglishName, LatinName, SwedishName, Description, Sun, Water, Nutrition, ImageUrl} = route.params;
    
  useEffect(async() => {
    try {
      const response = await axios.get(
       plantbaseUrl,
      );
      setPlant(response.data);
    } catch (error) {
    }
  },[]);

  return(
    <SafeAreaView style={styles.container} >
        <StatusBar style="auto"/>
      
       <Image
            style={styles.plantPic}
            source={{
                uri: `${ImageUrl}`
                
            }}>
        </Image>
       
        <Text 
            style={styles.textContainer}>
            <Text style={styles.latinName}>{LatinName}{"\n"}</Text> 
            <Text>{EnglishName}{"\n"}</Text>
            <Text>{SwedishName} </Text> 
        </Text>
        <View
            style={styles.infoBoard}>
                
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                         style={styles.infoIcon} 
                         source={require("../assets/sun.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Sunlight</Text>
                        <Text>{Sun}</Text>
                    </View> 
                </View>
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                        style={styles.infoIcon} 
                        source={require("../assets/drop.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Water</Text>
                        <Text>{Water}</Text>
                    </View> 
                </View>
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                        style={styles.infoCareIcon} 
                        source={require("../assets/nutritionFlask.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Nutrition</Text>
                        <Text>{Nutrition}</Text>
                    </View> 
                </View>
        </View>
        <ScrollView>
            <Text 
                style={styles.description}>
                    {Description} 
            </Text>
        </ScrollView>
     </SafeAreaView>
  );
  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    plantPic: {
        height: 150,
        width: 150, 
        top: 30, 
        left: 30, 
       resizeMode:"contain"
    },
    textContainer: {
        fontSize: 18, 
        color: "black",
        top: 50, 
        left: "50%", 
        position: "absolute",
        width: '50%'
    },
    latinName: {
        fontWeight: "bold",
    },
    infoBoard: {
        marginTop: 50,
        marginBottom:20,
        width: "100%",
        height: 100, 
        backgroundColor: '#7E9B6D', 
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        padding:10,
    },
    infoIcon: {
        width:30,
        height:30,
        marginRight:10,
        alignSelf:"flex-start",
    },
    infoCareIcon: {
        width:30,
        height:30,
        marginRight:10,
        alignSelf:"flex-start",
        tintColor: '#bf3d4a',
    },
    infoHeader:{
        fontWeight:"bold",
        fontSize: 16,
    },
    description: {
        width: "80%",
        left: "10%",
        fontSize: 15, 
        textAlign: "justify", 
    },
    circle: {
        height: 60, 
        width: 60, 
        backgroundColor: "#C4C4C4",
        bottom: 20, 
        right: 20,
        borderRadius: 50, 
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },

  });
  export default PlantDBProfile;