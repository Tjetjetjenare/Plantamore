import React,{useState, useEffect} from 'react';
import { SafeAreaView,RefreshControl, StyleSheet, TouchableOpacity, Image, Text, View, FlatList, Platform} from 'react-native';
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
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
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
function sortPlants(UP){
    UP.sort((a, b) => {
        return new Date(a.sub_id) - new Date(b.sub_id);
    });
    return UP
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
const Item = ({id, name,plants, replant, pid }) => {
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
                source={{uri: `${plants[pid-1].image_url}`}}> 
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
                    source={{uri: `${plants[pid-1].image_url}`}}> 
                </Image>
            </View>
            <View><Text style={{alignSelf: 'center'}}>{replant}</Text></View>
        </TouchableOpacity>
      )
  }
};
const  DirtDirt = async(userPlants) => {
    var lengd = replantedplants.slice();
    var UP = sortPlants(userPlants).slice();
    if (replantedplants.length<1 ){
        alert("Error","No plants have been selected as replanted, unable to save")
    }
    else{
        replantedplants.length = 0;
        for (var i=0;i<lengd.length;i++){
            await axios.put(subPlantUrl + lengd[i], {
                "sub_id":lengd[i],
                "name":  UP[lengd[i]-1].name,
                "birth_date":  UP[lengd[i]-1].birth_date,
                "water": UP[lengd[i]-1].water,
                "replant": (new Date().getFullYear()+1).toString()+"-04-01",
                "nutrition": UP[lengd[i]-1].nutrition,
                "p_id": UP[lengd[i]-1].p_id,
                "username": UP[lengd[i]-1].username,
                
                },{'Content-Type': 'application/json'})
                .then(response => console.log(response.data))
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        alert("Success","Your plants have been registered as replanted today")
    }

};
function Replant({navigation},props) {
    const [userPlants, setUserPlants] = useState("");
    const [plants, setPlants] = useState("");
    const [username, setUsername] = useState("");
    const [done, setDone] = useState(false);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
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
            console.log(error)
          // handle error
        }
      },[isFocused,done,refreshing]);
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
      }, []);
    const renderItem = ({ item }) => (
        <Item id = {item.sub_id}
            name={item.name} 
            plants = {plants}
            replant = {item.replant}
            pid = {item.p_id}
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
                source={require("../assets/replant.png")}>
            </Image>
        </View>
        <Text style={styles.selectText}>Select the plants you have replanted today</Text>
        <View style={styles.scrollView}
              contentContainerStyle={{flexDirection:'row'}}>
            <FlatList 
                data={findMyPlants(userPlants,username)}
                extraData={done}
                numColumns={3}
                columnWrapperStyle={styles.flatList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                     
                    />
                  }
            />
         </View>
         <View style={{height: '15%'}}/>
        <TouchableOpacity 
            style={styles.circle}
             onPress={() => {
                DirtDirt(findMyPlants(userPlants,username));
                setDone(!done)
             }
             }>
            <Text>SAVE</Text>
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
        backgroundColor:"#33280b",
        opacity: 1,
        borderRadius:70,
    }
})