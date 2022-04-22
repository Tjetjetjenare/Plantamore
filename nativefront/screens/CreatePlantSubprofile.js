import React, { useState, useEffect, cloneElement } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Row } from "reactstrap";

const plantbaseUrl = 'http://localhost:8000/api/plants/';
const subplantbaseUrl = 'http://localhost:8000/api/subplants/';

function CreatePlantSubprofile(props) {

   return(
       //According to figma 
        /*<SafeAreaView style={styles.container} >
            <StatusBar style="auto"/>
            <Image 
                style={styles.arrowContainer} 
                source={require("../assets/backArrow.png")}>
            </Image>
            <TextInput style={styles.profileName} placeholder="Name of plant"></TextInput>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.plantPicWrap} onPress={() => Alert.alert('I want to change image')}>
                    <Image
                        style={styles.plantPic}
                        source={require("../assets/addimg.png")}>
                    </Image>
                </TouchableOpacity>
                <View style={styles.specs}>
                    <View style={styles.innerSpec}>
                        <Image 
                             style={styles.specIcon} 
                             source={require("../assets/cake.png")}>
                        </Image>
                        <TextInput style={styles.specText} placeholder="DD-MM-YY"></TextInput>
                    </View>
                   
                    <View style={styles.innerSpec}>
                        <Image 
                             style={styles.specIcon} 
                             source={require("../assets/drop.png")}>
                        </Image>
                        <TextInput style={styles.specText} placeholder="DD-MM-YY"></TextInput>
                    </View>

                </View>
            </View>

            <TouchableOpacity 
                style = {styles.textContainer}
                onPress={() => Alert.alert('Altert!', 'Open database to find type of plant')}>
                <Text style={styles.typePlant}>Type of plant</Text> 
            </TouchableOpacity>
            <View
                style={styles.infoBoard}>
                    
                    <View style={{ flex: 2, flexDirection:"row"}}>
                        <Image 
                             style={styles.infoIcon} 
                             source={require("../assets/sun.png")}>
                        </Image>
                        <View>
                            <Text style= {styles.infoHeader}>Sunlight</Text>
                            <Text 
                            style={styles.infoContent}>Medium</Text>
                        </View> 
                    </View>
                    <View style={{ flex: 2, flexDirection:"row"}}>
                        <Image 
                             style={styles.infoIcon} 
                             source={require("../assets/drop.png")}>
                        </Image>
                        <View>
                            <Text style= {styles.infoHeader}>Water</Text>
                            <Text style={styles.infoContent}>30%</Text>
                        </View> 
                    </View>
                    <View style={{ flex: 2, flexDirection:"row"}}>
                        <Image 
                             style={styles.infoIcon} 
                             source={require("../assets/nutrition.png")}>
                        </Image>
                        <View>
                            <Text style= {styles.infoHeader}>Nutrition</Text>
                            <Text style={styles.infoContent}>15mg</Text>
                        </View> 
                    </View>
            </View>
            
         </SafeAreaView>*/


         //As a form
         <SafeAreaView style={styles.container} >
            <ScrollView>
                <StatusBar style="auto"/>
                <Image 
                    style={styles.arrowContainer} 
                    source={require("../assets/backArrow.png")}>
                </Image>
                <Text style={styles.header}>Add a new plant to your garden!</Text>
                <TouchableOpacity onPress={() => Alert.alert('I want to change image')}>
                    <Image
                        style={styles.plantPic}
                        source={require("../assets/addimg.png")}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.imgText}>Add a profile picture for your plant</Text>
                <Text style={styles.info}>What is the name of your plant?</Text>
                <TextInput style={styles.input} placeholder="Name of plant"/>
                <Text style={styles.info}>What type of plant is it?</Text>
                <TextInput style={styles.input} placeholder="Search database for type of plant"/>
                <Text style={styles.info}>What is your plant's birthday?</Text>
                <TextInput style={styles.input} placeholder="DD-MM-YY"/>
                <Text style={styles.info}>When did you last watered your plant?</Text>
                <TextInput style={styles.input} placeholder="DD-MM-YY"/>
                <Text style={styles.info}>How much water does your plant get?</Text>
                <TextInput style={styles.input} placeholder="Choose in drop down bar"/>
                <Text style={styles.info}>How much sunlight does your plant get?</Text>
                <TextInput style={styles.input} placeholder="Choose in drop down bar"/>
                <Text style={styles.info}>How often do you give your plant nutrients?</Text>
                <TextInput style={styles.input} placeholder="Choose in drop down bar"/>
                <TouchableOpacity style={styles.savebtn} onPress={() => Alert.alert('Save profile')}>
                    <Text>SAVE</Text>
                  </TouchableOpacity>
             </ScrollView>
         </SafeAreaView>

      );}

export default CreatePlantSubprofile;

const styles = StyleSheet.create({
    //format as form
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
    arrowContainer: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20, 
    },
    header: {
        textAlign:"center",
        fontSize: 30,
        paddingTop:20,
        paddingBottom: 20,
        marginTop:10,
        backgroundColor: '#7E9B6D',
        color: 'white',
        width: '100%',
    },
    info:{
        fontSize: 20,
        margin:10,
    },
    input:{
        backgroundColor: "#f4f5f0",
        height: 50,
        width: '90%',
        padding: 5,
        marginBottom: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignSelf: "center",
    },
    plantPic: {
        height: undefined,
        width: "30%", 
        alignSelf:"center",
        aspectRatio: 1,
        margin:20,
    },
    imgText: {
        fontSize: 10,
        textAlign:"center",
    },
    savebtn: {
        backgroundColor: '#7E9B6D',
        borderColor: "black",
        borderWidth: 1,
        width: 80,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        color: "black",
        alignItems:"center",
        alignSelf:"flex-end",
        marginRight:5,
    },


    /* //format as figma
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
        margin:20,
    },
    specs:{
        flex:1,
        justifyContent: "center",
    },
    innerSpec:{
        flexDirection: "row",
        marginLeft: 20,
    },
    specIcon:{
        width: 20,
        height: 20,
        aspectRatio:1,
    },
    specText:{
        fontSize: 12,
        marginLeft: 3,
        marginBottom:1,
    },
    textContainer: {
        top:10,
        alignItems: "center",
    },
    typePlant: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#949494",
        marginBottom:20,
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
    infoContent:{
        color: "#4f4c4c",
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
        width: "50%",
        height: 40,
        fontSize: 30,
        alignSelf:"center",
        margin:10,
    },*/

  });