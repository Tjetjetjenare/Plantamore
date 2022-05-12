import React,{useState, useEffect} from 'react';
import { Alert,SafeAreaView, StyleSheet, TouchableOpacity, Image, Text, View, FlatList, Platform} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { set } from 'react-native-reanimated';
var subPlantUrl = "";
if(Platform.OS === "android"){ 
    subPlantUrl = 'http://10.0.2.2:8000/api/subplants/';
    plantUrl = 'http://10.0.2.2:8000/api/plants/';}
else{
    subPlantUrl ='http://127.0.0.1:8000/api/subplants/';
    plantUrl = 'http://127.0.0.1:8000/api/plants/'}

const myPlants = [];
function findMyPlants(userPlants, username){
    myPlants.length = 0
    for ( var i = 0; i< userPlants.length; i++){
        if( userPlants[i].username == username){
           myPlants.push(userPlants[i])
       }
    }
    myPlants.sort((a, b) => {
        return new Date(a.water) - new Date(b.water);
    });
    return myPlants
}
function sortPlants(UP){
    UP.sort((a, b) => {
        return new Date(a.sub_id) - new Date(b.sub_id);
    });
    return UP
  }

const wateredplants = [];
function doWater(id) {
    for (let i=0;i<wateredplants.length;i++ ){
        if (id == wateredplants[i]){
            wateredplants.splice(i,1);
            return
        }
    }
    wateredplants.push(id)
}
function ispres(id){
    return wateredplants.includes(id)
}
const Item = ({id, name, plants, water }) => {
    const [pres, setPres] = useState(false);
    if (plants.length < 1){
        return(
            <TouchableOpacity 
                onPress={()=>{
                    doWater(id);
                 setPres(!pres);
                }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{name}</Text>
                    <Image style={styles.image}
                        source={require("../assets/testPlant.png")}> 
                    </Image>
                </View>
                
            </TouchableOpacity>
          )
    }
   else if (ispres(id)!= false && plants.length > 1 ){
    return(
    <TouchableOpacity 
        onPress={()=>{
            doWater(id);
            setPres(!pres);
        }}>
        <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.presblue}>
            <Image style={styles.imagepres}
                source={{uri: `${plants[id-1].image_url}`}}> 
            </Image>
            </View>
        </View>
        <View><Text>{water}</Text></View>
    </TouchableOpacity>
    
  )}
  else{
    return(
        <TouchableOpacity 
            onPress={()=>{
                doWater(id);
             setPres(!pres);
            }}>
            <View style={styles.item}>
                <Text style={styles.title}>{name}</Text>
                <Image style={styles.image}
                    source={{uri: `${plants[id-1].image_url}`}}> 
                </Image>
            </View>
            <View><Text style={{alignSelf: 'center'}}>{water}</Text></View>
        </TouchableOpacity>

      )
  }
};
const  BlubBlub = async(userPlants) => {
    var lengd = wateredplants.slice();
    var UP = sortPlants(userPlants).slice();
    var year = new Date().getFullYear().toString();
    var month = (new Date().getMonth()+1).toString();
    var day = new Date().getDate().toString();
    var today =year+"-"+month+"-"+day;
    if (wateredplants.length<1 ){
        Alert.alert("Error","No plants have been selected as watered, unable to save")
    }
    else{
        wateredplants.length = 0;
        for (var i=0;i<lengd.length;i++){
            console.log(UP, "AND AND AND",userPlants)
            //console.log(lengd[i],userPlants[lengd[i]-1].name,today,userPlants[lengd[i]-1].replant,userPlants[lengd[i]-1].nutrition,userPlants[lengd[i]-1].p_id,userPlants[lengd[i]-1].username,)
            await axios.put(subPlantUrl + lengd[i], {
                "sub_id":lengd[i],
                "name":  UP[lengd[i]-1].name,
                "birth_date":  UP[lengd[i]-1].birth_date,
                "water": today,
                "replant": UP[lengd[i]-1].replant,
                "nutrition": UP[lengd[i]-1].nutrition,
                "p_id": UP[lengd[i]-1].p_id,
                "username": UP[lengd[i]-1].username,
                
                },{'Content-Type': 'application/json'})
                .then(response => console.log(response.data))
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        Alert.alert("Success","Your plants have been registered as watered today")
    }

};
function Watered({navigation},props) {
    const [userPlants, setUserPlants] = useState("");
    const [plants, setPlants] = useState("");
    const [username, setUsername] = useState("");
    const [done, setDone] = useState(false);
    const isFocused = useIsFocused();
    useEffect(async() => {
        AsyncStorage.getItem('MyName').then(value =>
             setUsername(value )
        );
        try {
          const response = await axios.get(
            subPlantUrl,
          );
          const response2 = await axios.get(
            plantUrl,
          );
          
          setUserPlants(response.data);
          setPlants(response2.data);
          console.log()
        } catch (error) {
            console.log(error)
          // handle error
        }
      },[isFocused,done]);
      
    const renderItem = ({ item }) => (
        <Item id = {item.sub_id}
            name={item.name} 
            plants = {plants}
            water = {item.water}
              /> )

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.symbols}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Ionicons
                    style={{ marginLeft: 10 }}
                    name="close-outline"
                    color="black"
                    size={35}
                />
            </TouchableOpacity> */}
            {/* <Image 
                style={styles.calendar} 
                source={require("../assets/calendar.png")}>
                    
            </Image> */}
        </View>
        <Text style={styles.thankYou}>Your plants thank you!</Text>
        <View style={styles.waterCanContainer}>
            <Image 
                 style={styles.wateringCanPic}
                source={require("../assets/wateringCanBig.png")}>
            </Image>
        </View>
        <Text style={styles.selectText}>Select the plants you have watered today</Text>
        <View style={styles.scrollView}
              contentContainerStyle={{flexDirection:'row'}}>
            <FlatList 
                data={findMyPlants(userPlants,username)}
                extraData = {done}
                numColumns={3}
                columnWrapperStyle={styles.flatList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
         </View>
         <View style={{height: '15%'}}/>
        <TouchableOpacity 
            style={styles.circle}
             onPress={() => {
                BlubBlub(findMyPlants(userPlants,username));
                setDone(!done)
             }
             }>
            <Text>SAVE</Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
} 


export default Watered;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7E9B6D',
        flex: 1,
    }, 
    symbols: {
        flexDirection: 'row',
    },
    burgerMenu: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20,  
    },
    calendar: {
        height: 30, 
        width: 30, 
        marginLeft: 290,
        marginTop: 20,  
    },
    thankYou: {
        color: '#fff',
        fontSize: 36, 
        top: 10, 
        textAlign: 'center', 
    },
    waterCanContainer: {
        height: 180, 
        width: 180, 
        top: 15, 
        backgroundColor: "#C4C4C4",
        alignSelf: 'center',
        borderRadius: 90, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCanPic: {
        width: '70%', 
        height: '70%', 
        alignSelf: 'center', 
        top: 10, 
    },
    selectText: {
        color: 'black', 
        alignSelf: 'center',
        top: 20, 
        fontSize: 20, 
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        top: '5%',
    },
    flatList: {
        padding: 15, 
        justifyContent: 'space-evenly', 
    },
    subPlant: {
        alignItems: 'center', 
        top: '10%', 
    },
    title: {
        color: 'white', 
        fontSize: 15, 
        alignSelf: 'center', 
    },
    imagepres: {
        height: 110, 
        width: 110, 
        opacity:0.5, 
        borderRadius:70,
    },
    image:{
        height: 110, 
        width: 110, 
        borderRadius:70,
    },
    circle: {
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
        right: "3%", 
        bottom: "12%",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
    presblue:{
        backgroundColor:"blue",
        opacity: 1,
        borderRadius:70,
    }
})