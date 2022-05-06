import React,{useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, Text, View, FlatList} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
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
        return new Date(a.replant) - new Date(b.replant);
    });
    return myPlants
}

const replantedplants = [];
function doReplant(id) {
    for (let i=0;i<replantedplants.length;i++ ){
        if (id == replantedplants[i]){
            replantedplants.splice(i,1);
            return
        }
    }
    replantedplants.push(id)
}
function ispres(id){
    return replantedplants.includes(id)
}
const Item = ({id, name,plants, replant }) => {
    const [pres, setPres] = useState(false);
    if (plants.length < 1){
        return(
            <TouchableOpacity 
                onPress={()=>{
                    doReplant(id);
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
            doReplant(id);
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
        <View><Text>{replant}</Text></View>
    </TouchableOpacity>
  )}
  else{
    return(
        <TouchableOpacity 
            onPress={()=>{
                doReplant(id);
             setPres(!pres);
            }}>
            <View style={styles.item}>
                <Text style={styles.title}>{name}</Text>
                <Image style={styles.image}
                    source={{uri: `${plants[id-1].image_url}`}}> 
                </Image>
            </View>
            <View><Text>{replant}</Text></View>
        </TouchableOpacity>
      )
  }
};
const  DirtDirt = async(userPlants) => {
    var lengd = replantedplants.slice();
    var year = new Date().getFullYear().toString();
    var month = (new Date().getMonth()+1).toString();
    var day = new Date().getDate().toString();
    var today =year+"-"+month+"-"+day;
    if (replantedplants.length<1 ){
        alert("no plants waterd")
    }
    else{
        replantedplants.length = 0;
        for (var i=0;i<lengd.length;i++){
            console.log(lengd[i]);
            var entry = lengd[i] +1;
            await axios.put(subPlantUrl + entry, {
                "sub_id":lengd[i],
                "name":  userPlants[lengd[i]-1].name,
                "birth_date":  userPlants[lengd[i]-1].birth_date,
                "water": userPlants[lengd[i]-1].water,
                "replant": today,
                "nutrition": userPlants[lengd[i]-1].nutrition,
                "p_id": userPlants[lengd[i]-1].p_id,
                "username": userPlants[lengd[i]-1].username,
                
                },{'Content-Type': 'application/json'})
                .then(response => console.log(response.data))
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        alert("Your plants got waterd")
    }

};
function Replant({navigation},props) {
    const [userPlants, setUserPlants] = useState("");
    const [plants, setPlants] = useState("");
    const [username, setUsername] = useState("");
    const [done, setDone] = useState(false);
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
        } catch (error) {
            console.log("Jästrar")
            console.log(error)
          // handle error
        }
      },[]);
    const renderItem = ({ item }) => (
        <Item id = {item.sub_id}
            name={item.name} 
            plants = {plants}
            replant = {item.replant}
              /> )

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.symbols}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Ionicons
                    style={{ marginLeft: 10 }}
                    name="close-outline"
                    color="black"
                    size={35}
                />
            </TouchableOpacity>
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
        <Text style={styles.selectText}>Select the plants you have replanted today.</Text>
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
        <TouchableOpacity 
            style={styles.circle}
             onPress={() => {
                DirtDirt(findMyPlants(userPlants,username));
                setDone(!done)
             }
             }>
            <Text>Save</Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
} 


export default Replant;

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
        opacity:0.4, 
        borderRadius:70,
    },
    image:{
        height: 110, 
        width: 110, 
        borderRadius:70,
    },
    circle: {
        height: 70, 
        width: 70, 
        backgroundColor: "#fff",
        left: "75%",
        borderRadius: 35, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
    presblue:{
        backgroundColor:"#33280b",
        opacity: 1,
        borderRadius:70,
    }
})