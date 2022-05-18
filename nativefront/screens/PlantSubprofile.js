import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import moment from 'moment';

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
    const {EnglishName, LatinName, SwedishName, Description, ImageUrl, PlantName, Sunlight, PlantWat, PlantNut, Water, Nutrition, BirthDate, Replant, PlantRe} = route.params;
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
        }
        catch (error) {
        }
    },[]);
    const addIfSummer = () => {
        var amplify = 1
        var today= moment(new Date())
        if(today.isBetween(moment().year().toString()+"-05-01", moment().year().toString()+"-09-30")){
            amplify = 0.8;
        }
        return(
            amplify
        )
    }
    const daysUntilWater = () => {
        var amplify = addIfSummer()
        var today = moment(new Date())
        var lastWater = moment(Water)
        if(PlantWat=='Sparingly'){
            var shouldWater = lastWater.add(Math.floor(19*amplify), 'days')
        }
        else if(PlantWat=='Generously'){
            var shouldWater = lastWater.add(Math.floor(4*amplify), 'days')
        }
        else {
            var shouldWater = lastWater.add(Math.floor(7*amplify), 'days')
        }
        var displayWater = shouldWater.diff(today, 'days')
        if(displayWater<= 0){
            displayWater='today!'
        }
        else{
            displayWater='in '+ displayWater+' days'
        }
        return(displayWater)
    }
    const timeUntilNuttrition = () => {
        if(Nutrition<=1) {
            var time="Next time you water"
        }
        else {
            var time="In "+ Nutrition + " waterings"
        }
        return time
    }
    const monthsUntilReplant = () => {
        var today = moment(new Date())
        var lastReplant = moment(Replant)
        var betweenReplants = PlantRe
        var shouldReplant = lastReplant.add(betweenReplants, "months")
        if (shouldReplant.year()==moment().year() && today.isAfter(moment().year().toString()+"06-30")){
            var willReplant = (shouldReplant.year()+1).toString()+"-04-01"
        }
        else{
            if(shouldReplant.isBetween(moment().year().toString()+"-01-01", shouldReplant.year().toString()+"-10-01")){
                var willReplant = shouldReplant.year().toString()+"-04-01"
            }
            else{
                var willReplant = (shouldReplant.year()+1).toString()+"-04-01"
            }   
        }
        var displayReplant = moment(willReplant).diff(today, "months")  
        if(displayReplant<= 0){
            displayReplant='this month!'
        }
        else{
            displayReplant='in '+ displayReplant+' months'
        }
        return(
            displayReplant
        )
    }
    const age = () => {
        var today = new Date()
        var bday = new Date(BirthDate)
        var diffYears = 0
        var diffMonths = 0
        var diffDays = 0
        if (today.getDate()>bday.getDate()){
            diffDays = today.getDate() - bday.getDate()
        }
        else{
            diffDays = bday.getDate() - (bday.getDate() - today.getDate())
        }
        if(today.getMonth()<bday.getMonth() || (today.getMonth()==bday.getMonth() && today.getDate()<bday.getDate())){
            diffYears = today.getFullYear() - bday.getFullYear() -1
            diffMonths = bday.getMonth() - (bday.getMonth() - today.getMonth()) + 1
        }
        else{
            diffYears = today.getFullYear() - bday.getFullYear()
            diffMonths = today.getMonth() - bday.getMonth() + 1
        }
        return (
            diffYears+" y "+diffMonths+" m "+diffDays+" d"
        )
    }
  return(
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <ScrollView>
            <Text style={styles.profileName}>
                {PlantName}{"\n"}
            </Text>
            <View style={{flexDirection: "row"}}>
                <View style={styles.specs}>
                    <View style={styles.innerSpec}>
                        <Image style={styles.specIconCake} source={require("../assets/cake.png")}/>
                        <Text>
                            {age()}
                        </Text>
                    </View>
                    <View style={styles.innerSpec}>
                        <Image style={styles.specIcon} source={require("../assets/drop.png")}/>
                        <Text>
                            {daysUntilWater()}
                        </Text>
                    </View>
                    <View style={styles.innerSpec}>
                        <Image style={styles.specIconNutrition} source={require("../assets/nutritionFlask.png")}/>
                        <Text>
                            {timeUntilNuttrition()}
                        </Text>
                    </View>
                    <View style={styles.innerSpec}>
                        <Image style={styles.specIcon} source={require("../assets/replant.png")}/>
                        <Text>
                            {monthsUntilReplant()}
                        </Text>
                    </View>
                </View>
                <View style={styles.plantPicWrap}>
                    <Image style={styles.plantPic} source={{uri: `${ImageUrl}` }}/>
                </View>
                <View style = {styles.textContainer}>
                    <Text style={styles.engName}>
                        {EnglishName}{"\n"}
                    </Text>
                    <Text style={styles.latinName}>
                        {LatinName}{"\n"}
                    </Text> 
                    <Text style={styles.latinName}>
                        {SwedishName}{"\n"}
                    </Text> 
                </View>
            </View>
            <View style={styles.infoBoard}>
                    <View style={{ flex: 2, flexDirection:"row"}}>
                        <Image style={styles.infoIcon} source={require("../assets/sun.png")}/>
                        <View>
                            <Text style={styles.infoHeader}>
                                Sunlight
                            </Text>
                            <Text>
                                {Sunlight}
                            </Text>
                        </View> 
                    </View>
                    <View style={{ flex: 2, flexDirection:"row"}}>
                        <Image style={styles.infoIcon} source={require("../assets/drop.png")}/>
                        <View>
                            <Text style={styles.infoHeader}>
                                Water
                            </Text>
                            <Text>
                                {PlantWat}
                            </Text>
                        </View> 
                    </View>
                    <View style={{ flex: 2, flexDirection:"row"}}>
                        <Image style={styles.infoIconNutritionFlask} source={require("../assets/nutritionFlask.png")}/>
                        <View>
                            <Text style= {styles.infoHeader}>
                                Nutrition
                            </Text>
                            <Text>
                                {PlantNut}
                            </Text>
                        </View> 
                    </View>
            </View>
            <Text style={styles.description}>
                {Description}
            </Text>
        </ScrollView>
        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.circle}
                onPress={() => navigation.navigate('Watered')}>
                <Image style={styles.wateringCan} source={require("../assets/plantCare.png")}/>      
            </TouchableOpacity>
        </View>
     </SafeAreaView>
    );
}

export default PlantSubprofile;
  
const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    description: {
        width: "80%",
        left: "10%",
        fontSize: 15, 
        textAlign: "justify", 
    },
    engName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        width: "100%",
        height: 90,
    },
    infoBoard: {
        marginBottom: 20,
        width: "100%",
        height: 100, 
        backgroundColor: '#7E9B6D', 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 10,
        marginTop: 10,
    },
    infoHeader: {
        fontWeight: "bold",
        fontSize: 16,
    },
    infoIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        alignSelf: "flex-start",
    },
    infoIconNutritionFlask: { 
        width: 30,
        height: 30,
        marginRight: 10,
        alignSelf: "flex-start",
        tintColor: '#bf3d4a', 
    },
    innerSpec: {
        flexDirection: "row",
        alignSelf: "flex-start",
        paddingLeft: 10,
    },
    latinName: {
        color: "#545351",
        marginTop: -20,
    },
    plantPic: {
        height: 130,
        width: 130, 
        alignSelf: "flex-start",
        aspectRatio: 1,
        borderRadius: 75,
    },
    plantPicWrap: {
        flex: 1,
        justifyContent: "flex-end",
    },
    profileName: {
        fontSize: 30,
        textAlign: "center",
    },
    specIcon: {
        width: 20,
        height: 20,
        aspectRatio: 1,
    },
    specIconCake: {
        width: 19,
        height: 19,
        aspectRatio: 1,
    },
    specIconNutrition: {
        width: 20,
        height: 20,
        aspectRatio: 1,
        tintColor: '#bf3d4a', 
    },
    specs: {
        flex: 1,
        justifyContent: "center",
        paddingBottom: 20,
    },
    specText: {
        fontSize: 15,
        marginLeft: 3,
    },
    textContainer: {
        flex: 1,
        color: "black",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 5,
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
});