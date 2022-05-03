import React, { useState, useEffect, cloneElement } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Row } from "reactstrap";

var plantbaseUrl = null;
var subplantbaseUrl = null;

if(Platform.OS === "android"){ 
    subplantbaseUrl = 'http://10.0.2.2:8000/api/subplants/';
    plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{
    subplantbaseUrl ='http://127.0.0.1:8000/api/subplants/';
    plantbaseUrl = 'http://127.0.0.1:8000/api/plants/'}

  function PlantSubprofile({route, navigation}) {
    const [plant, setPlant] = useState("");
    const [subPlant, setsubPlant] = useState("");
    const {plantId, EnglishName, LatinName, SwedishName, Description} = route.params;

    useEffect(async() => {
      try {
        const response = await axios.get(
         plantbaseUrl,
        );
        const subresponse = await axios.get(
            subplantbaseUrl,
           );
        setPlant(response.data);
        setsubPlant(subresponse.data);
        
      } catch (error) {
          console.log("Bomber o granater")
          console.log(error)
      }
    },[]);
  

  
  
  return(
    <SafeAreaView style={styles.container} >
        <StatusBar style="auto"/>
        <Image 
            style={styles.arrowContainer} 
            source={require("../assets/backArrow.png")}>
        </Image>
        <Text style={styles.profileName}>{SwedishName}{"\n"}</Text>
        <View style={{flexDirection: "row"}}>
            <View style={styles.plantPicWrap}>
                <Image
                    style={styles.plantPic}
                    //source={require("../assets/testPlant.png")}>
                        source={require("../assets/testPlant.png")}>
                </Image>
            </View>
            <View style={styles.specs}>
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIcon} 
                         source={require("../assets/cake.png")}>
                    </Image>
                    <Text> 9 m</Text>
                </View>
               
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIcon} 
                         source={require("../assets/drop.png")}>
                    </Image>
                    <Text> 3 d</Text>
                </View>
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIcon} 
                         source={require("../assets/nutrition.png")}>
                    </Image>
                    <Text> 10 d</Text>
                </View>
            </View>
        </View>
        <View 
            style = {styles.textContainer}>
            <Text style={styles.engName}>{EnglishName}{"\n"}</Text>
            <Text style={styles.latinName}>{LatinName}{"\n"}</Text> 
            
        </View>
        <View
            style={styles.infoBoard}>
                
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                         style={styles.infoIcon} 
                         source={require("../assets/sun.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Sunlight</Text>
                        <Text>Medium</Text>
                    </View> 
                </View>
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                         style={styles.infoIcon} 
                         source={require("../assets/drop.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Water</Text>
                        <Text>30%</Text>
                    </View> 
                </View>
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                         style={styles.infoIcon} 
                         source={require("../assets/nutrition.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Nutrition</Text>
                        <Text>15mg</Text>
                    </View> 
                </View>
        </View>
        <Text 
            style={styles.description}>
               {Description}
        </Text>
        <TouchableOpacity 
            style={styles.circle}
            onPress={() => //Alert.alert('Watering can button pressed')
            alert(plant[plantId-1].english_name)}>
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
        height: undefined,
        width: "50%", 
        alignSelf:"flex-end",
        aspectRatio: 1,
    },

    plantPicWrap:{
        flex: 2,
    },
    specs:{
        flex:1,
        justifyContent: "center",
    },
    innerSpec:{
        flexDirection: "row",
        marginLeft: 30,
    },
    specIcon:{
        width: 20,
        height: 20,
        aspectRatio:1,
    },
    specText:{
        fontSize: 15,
        marginLeft: 3,
    },
    textContainer: {
        top:10,
        color: "black",
        alignItems: "center",
    },
    latinName: {
        color:"#545351",
        fontSize: 18,
        marginTop:-15,
    },
    engName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    infoBoard: {
        marginTop: 20,
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
    profileName:{
        fontSize: 30,
        textAlign: "center",
    },

  });
  export default PlantSubprofile;