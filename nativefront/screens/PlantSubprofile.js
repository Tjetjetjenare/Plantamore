import React, { useState, useEffect, cloneElement } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Row } from "reactstrap";

const plantbaseUrl = 'http://localhost:8000/api/plants/';
const subplantbaseUrl = 'http://localhost:8000/api/subplants/';

  function PlantSubprofile(props) {
    const [plant, setPlant] = useState("");
    const [subPlant, setsubPlant] = useState("");
    
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
      }
      console.log(plant[2].english_name)
      console.log(subPlant[0].name)
    },[]);
  
  
  
  
  return(
    <SafeAreaView style={styles.container} >
        <StatusBar style="auto"/>
        <Image 
            style={styles.arrowContainer} 
            source={require("../assets/backArrow.png")}>
        </Image>
        <Text style={styles.profileName}>{subPlant[0].name}{"\n"}</Text>
        <View style={{flexDirection: "row"}}>
            <View style={styles.plantPicWrap}>
                <Image
                    style={styles.plantPic}
                    source={require("../assets/testPlant.png")}>
                </Image>
            </View>
            <View style={styles.specs}>
                <View style={styles.innerSpec}>
                    <Image 
                         style={styles.specIcon} 
                         source={require("../assets/sun.png")}>
                    </Image>
                    <Text style = {{}}> 9 m</Text>
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
                    <Text style = {{}}> 10 d</Text>
                </View>
            </View>
        </View>
        <View 
            style = {styles.textContainer}>
            <Text style={styles.engName}>{plant[2].swedish_name}{"\n"}</Text>
            <Text style={styles.latinName}>Pilea peperomioides{"\n"}</Text> 
            
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
        height: 100, 
        width: 100, 
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