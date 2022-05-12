import React,{useState, useEffect} from 'react';
import { SafeAreaView, Alert, StyleSheet,RefreshControl, TouchableOpacity, Image, Text, View, FlatList, Platform} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
const myPlants = [];
var plantUrl = null;
var subPlantUrl = null;
var ref = false;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
if(Platform.OS === "android"){ 
    subPlantUrl = 'http://10.0.2.2:8000/api/subplants/';
    plantUrl = 'http://10.0.2.2:8000/api/plants/';}
else{
    subPlantUrl ='http://127.0.0.1:8000/api/subplants/';
    plantUrl = 'http://127.0.0.1:8000/api/plants/'}

const Item = ({ id, name, birth_date, water,replant,nutrition,p_id,username, plants, navigation}) => {     
    if ( id == "add"){
        return(
            <TouchableOpacity 
        onPress={()=>{
            if(id == "add"){
                navigation.navigate('CreateSub')
            }
        
        }}>
            <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
            <Image style={styles.image}
                source={require("../assets/plus.png")
                }> 
            </Image>
        </View>
    </TouchableOpacity>
            )}
      else{

    return(
    <TouchableOpacity 
        onPress={()=>{
            if(id == "add"){
                navigation.navigate('CreateSub')
            }
            else{ console.log("p_id equals", p_id)
                
                navigation.navigate('PlantSub',{plantId: p_id, EnglishName: plants[p_id-1].english_name,LatinName : plants[p_id-1].latin_name,
                    SwedishName: plants[p_id-1].swedish_name, Description: plants[p_id-1].description,
                    Sunlight:plants[p_id-1].sunlight, PlantNut:  plants[p_id-1].nutrition, PlantWat: plants[p_id-1].water, ImageUrl:plants[p_id-1].image_url,
                    PlantName: name, BirthDate: birth_date, Water: water, Replant: replant,
                    Nutrition: nutrition, Username: username
                });
        }
        }}
        delayLongPress={2000} onLongPress={()=>{Alert.alert(
            "Delete",
            "Are you sure you want to remove "+name+"?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () =>  axios.delete(subPlantUrl+(id))
              .then(() => console.log("DELETETED"))}
            ]
          ); ref = !ref; console.log(ref)}} activeOpacity={0.6}>
        <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
            <Image style={styles.image}
                source={{
                    uri: `${plants[p_id-1].image_url}`
                    
                }}>
            </Image>
        </View>
    </TouchableOpacity>
  );}}

//   const DATA = [
//     {
//       id: "1",
//       renderItem: renderImg,
//       data: require('../assets/profileTest.png'),
//     },
//   ];

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  

  const renderImg = () => {
    if(pImage!='false'){
      return(            
          <Image
              style={styles.plantPic}
              source={require("../assets/profilePic.png")}
          />
      )         
    }else{
      return(            
          <Image
              style={styles.plantPic}
              source={require("../assets/onlyPlantSmall.png")}
          />
      )}
  };


  const ItemPic = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


function findMyPlants(userPlants, username){
    myPlants.length = 0
    for ( var i = 0; i< userPlants.length; i++){
        if( userPlants[i].username == username){
           myPlants.push(userPlants[i])
       }
    }
    myPlants.push({
        sub_id: "add",
        name: "Add a Plant",
        })
    return myPlants
}

function Profile({navigation}) {
    
    const [userPlants, setUserPlants] = useState("");
    const [plants, setPlants] = useState({});
    const [username, setUsername] = useState("");
    const isFocused = useIsFocused();
    const [pImage, setPImage] = useState('true');

    const [refreshing, setRefreshing] = useState(false);
    useEffect(async() => {
        AsyncStorage.getItem('MyName').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
             setUsername(value )
            //Setting the value in Text
        );
        try {
          const response = await axios.get(
            subPlantUrl,
          );
          const response2 = await axios.get(
            plantUrl,
          );
          setPlants(response2.data)
          setUserPlants(response.data);
        } catch (error) {
            console.log("Jästrar")
            console.log(error)
          // handle error
        }
      },[isFocused,myPlants,refreshing]);
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(800).then(() => setRefreshing(false));
      }, []);
    const renderItem = ({ item }) => (
        <Item 
            id = {item.sub_id}
            name={item.name} 
            birth_date = {item.birth_date}
            water = {item.water}
            replant = {item.replant}
            nutrition = {item.nutrition}
            p_id = {item.p_id}
            username = {item.username}
            plants = {plants}
            navigation = {navigation}
            
            /> );

            const renderPic = ({ item }) => (
                <ItemPic title={item.title} />
              );
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.symbols}>
            </View>
            <Text style={styles.userName}>{username}</Text>
            <View>
            <TouchableOpacity onPress={() => renderPic(item)}>   
                <Image 
                    style={styles.profilePic}
                    source={require("../assets/profilePic.png")}>
                </Image>
            </TouchableOpacity>
                    <FlatList
                    data={DATA}
                    renderItem={renderPic}
                    keyExtractor={item => item.id}
                    />
            </View>
            <View style={styles.scrollView}
                  contentContainerStyle={{flexDirection:'row'}}>
                <FlatList 
                    data={findMyPlants(userPlants,username)}
                    extraData={ref}
                    numColumns={3}
                    columnWrapperStyle={styles.flatList}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                         
                        />
                      }
                />
             </View>

            <TouchableOpacity 
                style={styles.circle}
                onPress={() => navigation.navigate('Watered')        
                }>
                <Image style={styles.wateringCan}
                        source={require("../assets/plantCare.png")}>  
                </Image>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Profile;

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
        
    },
    touchBurger: {
        height:30,
        width: 30,
        marginLeft: 30,
        marginTop: 20,  
    },
    calendar: {
        height: 30, 
        width: 30, 
    },
    touchCalendar: {
        marginLeft: 290,
        marginTop: 20,  
        height:30,
        width: 30,
    },
    userName: {
        color: '#fff',
        fontSize: 36, 
        textAlign: 'center', 
        marginTop: 10
    },
    profilePic: {
        width: 200, 
        height: 200, 
        alignSelf: 'center', 
        top: 10, 
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        top: '5%',
        paddingBottom: 100,
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
        flexShrink: 1,
        color: 'white', 
        fontSize: 15,  
        alignSelf: 'center',
    },
    image: {
        height: 110, 
        width: 110, 
        top: '5%',  
        borderRadius: 55, 
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
})
