import React, { useState, useEffect, cloneElement } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RadioGroup from 'react-native-radio-buttons-group';
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

function CreatePlantSubprofile(props) {
   return(
         <SafeAreaView style={styles.container} >
            <ScrollView>
                <StatusBar style="auto"/>
                <Image 
                    style={styles.arrowContainer} 
                    source={require("../assets/backArrow.png")}>
                </Image>
                <Text style={styles.header}>Add a new plant to your garden!</Text>
                <TouchableOpacity style={styles.plantTouch} onPress={() => Alert.alert('I want to change image')}>
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
        backgroundColor: '#7E9B6D',
    },
    arrowContainer: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20, 
    },
    header: { 
        fontSize: 35, 
        fontWeight: 'bold', 
        marginTop: 40, 
        textAlign:"center",
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
        borderRadius: 30, 
    },
    plantPic: {
        width: 150, 
        height: undefined,
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius:75,
        alignSelf: "center",
        
    },
    plantTouch: {
        width: 150, 
        height: undefined,
        aspectRatio: 1,
        borderRadius:75,
        margin: 20,
        alignSelf: "center",
    },
    imgText: {
        fontSize: 10,
        textAlign:"center",
    },
    savebtn: {
        backgroundColor: "#fff",
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
  });