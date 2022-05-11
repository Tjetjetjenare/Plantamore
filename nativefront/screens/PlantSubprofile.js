import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

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
    const {plantId, EnglishName, LatinName, SwedishName, Description,ImageUrl,PlantName, Sunlight, PlantWat, PlantNut,Water,Nutrition,BirthDate, Replant } = route.params;

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
        <ScrollView>
        <Text style={styles.profileName}>{PlantName}{"\n"}</Text>
        <View style={{flexDirection: "row"}}>
            <View style={styles.plantPicWrap}>
                <Image
                    style={styles.plantPic}
                    source={{
                        uri: `${ImageUrl}` 
                    }}> 
                </Image>
            </View>
            <View style={styles.specs}>
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIconCake} 
                         source={require("../assets/cake.png")}>
                    </Image>
                    <Text> {BirthDate}</Text>
                </View>
               
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIcon} 
                         source={require("../assets/drop.png")}>
                    </Image>
                    <Text> {Water} </Text>
                </View>
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIconNutrition} 
                         source={require("../assets/nutritionFlask.png")}>
                    </Image>
                    <Text> {Nutrition}</Text>
                </View>
                <View style={styles.innerSpec}>
                    <Image
                        style={styles.specIcon} 
                        source={require("../assets/replant.png")}>
                    </Image>
                    <Text> {Replant}</Text>
                </View>
            </View>
        </View>
        <View 
            style = {styles.textContainer}>
            <Text style={styles.engName}>{EnglishName}{"\n"}</Text>
            <Text style={styles.latinName}>{LatinName}{"\n"}</Text> 
            <Text style={styles.latinName}>{SwedishName}{"\n"}</Text> 
            
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
                        <Text>{Sunlight}</Text>
                    </View> 
                </View>
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                         style={styles.infoIcon} 
                         source={require("../assets/drop.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Water</Text>
                        <Text>{PlantWat}</Text>
                    </View> 
                </View>
                <View style={{ flex: 2, flexDirection:"row"}}>
                    <Image 
                         style={styles.infoIconNutritionFlask} 
                         source={require("../assets/nutritionFlask.png")}>
                    </Image>
                    <View>
                        <Text style= {styles.infoHeader}>Nutrition</Text>
                        <Text>{PlantNut}</Text>
                    </View> 
                </View>
        </View>
        
        <Text 
            style={styles.description}>
               {Description}
        </Text>
        </ScrollView>
       <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.circle}
                onPress={() => navigation.navigate('WateredStack')}>
                <Image style={styles.wateringCan}
                        source={require("../assets/plantCare.png")}>
                        
                </Image>
            </TouchableOpacity>
        </View>

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
        alignSelf:"flex-end",
        aspectRatio: 1,
        borderRadius:75,
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
    specIconCake: {
        width: 19,
        height: 19,
        aspectRatio:1,
    },
    specIconNutrition: {
        width: 20,
        height: 20,
        aspectRatio:1,
        tintColor: '#bf3d4a', 
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
    infoIconNutritionFlask: { 
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
    footer:{
        width:"100%",
        height:90,
    },
    circle: {
        height: 80, 
        width: 80, 
        backgroundColor: "#C4C4C4",
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