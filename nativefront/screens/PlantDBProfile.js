import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const plantbaseUrl = 'http://localhost:8000/api/plants/';

  function PlantDBProfile({route, navigation}) {
    const [Plant, setPlant] = useState("");
    const {plantId, EnglishName, LatinName, SwedishName, Description, Sun, Water, Nutrition} = route.params;
    
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
            style={styles.arrowContainer} 
            source={require("../assets/backArrow.png")}>
        </Image>
        <Image
             style={styles.plantPic}
            source={require("../assets/testPlant.png")}>
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
                         style={styles.infoIcon} 
                         source={require("../assets/nutrition.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Nutrition</Text>
                        <Text>{Nutrition}</Text>
                    </View> 
                </View>
        </View>
        <Text 
            style={styles.description}>
                {Description} 
        </Text>
        <TouchableOpacity 
            style={styles.circle}
            onPress={() => navigation.navigate("Watered")}>
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
        height: 80, 
        width: 80, 
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