import React, { useState, useEffect, cloneElement } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';
import { Row } from "reactstrap";

const plantbaseUrl = 'http://localhost:8000/api/plants/';
const subplantbaseUrl = 'http://localhost:8000/api/subplants/';

function CreatePlantSubprofile(props) {

    const waterButtonsData = [{
        id: '1',
        label: 'Generousley, my plants gets alot of water',
        value: 'generousley'
    }, {
        id: '2',
        label: 'Moderately, i give them water quite often',
        value: 'moderately'
    }, {
        id: '3',
        label: 'Sparingly, only water it once in a while',
        value: 'sparingly'
    }];
    
    const sunButtonsData = [{
        id: '1',
        label: 'Direct, my plant gets all the sun',
        value: 'direct'
    }, {
        id: '2',
        label: 'Indirect, my plant gets some sun',
        value: 'indirect'
    }, {
        id: '3',
        label: 'Shade, my plant likes the dark',
        value: 'shade'
    }];

    const nutButtonsData = [{
        id: '1',
        label: 'Often, nutrition all day evey day',
        value: 'often'
    }, {
        id: '2',
        label: 'Regularley, i give it nutrition every once in a while',
        value: 'regularley'
    }, {
        id: '3',
        label: 'Rarely, my plant almost never  gets added nutrition',
        value: 'rarely'
    }];

    const [waterButtons, setWaterButtons] = useState(waterButtonsData);
    const [sunButtons, setSunButtons] = useState(sunButtonsData);
    const [nutButtons, setNutButtons] = useState(nutButtonsData);

    function onPressWaterButton(radioButtonsArray) {
        setWaterButtons(radioButtonsArray);
    };

    function onPressSunButton(radioButtonsArray) {
        setSunButtons(radioButtonsArray);
    };
    function onPressNutButton(radioButtonsArray) {
        setNutButtons(radioButtonsArray);
    }

   return(
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
                <View style={styles.optionbtn}>
                    <RadioGroup 
                        style={styles.optionbtn}
                        radioButtons={waterButtons} 
                        onPress={onPressWaterButton} 
                    ></RadioGroup>
                </View>
                <Text style={styles.info}>How much sunlight does your plant get?</Text>
                <View style={styles.optionbtn}>
                    <RadioGroup 
                        radioButtons={sunButtons} 
                        onPress={onPressSunButton} 
                    ></RadioGroup>
                </View>
                <Text style={styles.info}>How often do you give your plant nutrients?</Text>
                <View style={styles.optionbtn}>
                    <RadioGroup 
                        radioButtons={nutButtons} 
                        onPress={onPressNutButton} 
                    ></RadioGroup>
                </View>
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
        margin: 20,
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
    optionbtn: {
        alignSelf:"flex-start",
    },
  });