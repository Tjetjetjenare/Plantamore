import React,{useState, useEffect} from 'react';
import { SafeAreaView, Alert, StyleSheet,RefreshControl, TouchableOpacity, Image, Text, View, FlatList, Platform} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
const myPlants = [];
var plantUrl = null;
var subPlantUrl = null;
var userUrl = null;
var ref = false;
var choosingPic = false;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
if(Platform.OS === "android"){ 
    subPlantUrl = 'http://10.0.2.2:8000/api/subplants/';
    userUrl = 'http://10.0.2.2:8000/api/users/'
    plantUrl = 'http://10.0.2.2:8000/api/plants/';}
else{
    subPlantUrl ='http://127.0.0.1:8000/api/subplants/';
    plantUrl = 'http://127.0.0.1:8000/api/plants/';
    userUrl = 'http://127.0.0.1:8000/api/users/'}

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

const DATA = [
    {
      id: '13',
      title: 'First Item',
      pic: require("../assets/Avatars/Anna.png"),
    },
    {
      id: '2',
      title: 'Second Item',
      pic: require("../assets/Avatars/Elaf.png"),
    },
    {
      id: '3',
      title: 'Third Item',
      pic: require("../assets/Avatars/Emma.png"),
    },
    {
        id: '4',
        title: 'Fourth Item',
        pic: require("../assets/Avatars/Hannah.png"),
      },
      {
        id: '5',
        title: 'Fifth Item',
        pic: require("../assets/Avatars/John.png"),
      },
      {
        id: '6',
        title: 'Sixth Item',
        pic: require("../assets/Avatars/Kent.png"),
      },
      {
        id: '7',
        title: 'Seventh Item',
        pic: require("../assets/Avatars/Kerstin.png"),
      },
      {
          id: '8',
          title: 'Eigth Item',
          pic: require("../assets/Avatars/Max.png"),

        },
        {
            id: '9',
            title: 'Nineth Item',
            pic: require("../assets/Avatars/Olaf.png"),
  
          },
          {
            id: '10',
            title: 'Eigth Item',
            pic: require("../assets/Avatars/Pelle.png"),
  
          },
          {
            id: '11',
            title: 'Eigth Item',
            pic: require("../assets/Avatars/Sam.png"),
  
          },
          {
            id: '12',
            title: 'Eigth Item',
            pic: require("../assets/Avatars/Tom.png"),
  
          },
  ];
  

  const renderImg = (number) => {
      if(number=="2"){
                 return(
                    <Image 
                    style={styles.profilePic}
                    source={ require("../assets/profileTest.png")}>
                </Image>)}
     else if(number=="1"){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Elaf.png")}>
       </Image>)}
       else if(number==3){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Emma.png")}>
       </Image>)}
       else if(number==4){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Hannah.png")}>
       </Image>)}
       else if(number==5){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/John.png")}>
       </Image>)}
       else if(number==6){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Kent.png")}>
       </Image>)}
       else if(number==7){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Kerstin.png")}>
       </Image>)}
       else if(number==8){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Max.png")}>
       </Image>)}
       else if(number==9){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Olaf.png")}>
       </Image>)}
       else if(number==10){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Pelle.png")}>
       </Image>)}
       else if(number==11){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Sam.png")}>
       </Image>)}
       else if(number==12){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Tom.png")}>
       </Image>)}
       else if(number==13){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Avatars/Anna.png")}>
       </Image>)}

  };


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
    const [users, setUsers] = useState("");
    const [userId, setUserId] = useState("");
    const [profileP,setProfileP] = useState(1);

    const [plants, setPlants] = useState({});
    const [username, setUsername] = useState("");
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [show, setShow] = useState(false);
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
          const response3 = await axios.get(
            userUrl,
          );
          setPlants(response2.data)
          setUserPlants(response.data);
          setUsers(response3.data);
          for(var i = 0;i<response3.data.length;i++){
            if(response3.data[i].username == username){
                setUserId(i)
                setProfileP(response3.data[i].profile_picture)
            }
          }
        } catch (error) {
            console.log("Jästrar")
            console.log(error)
          // handle error
        }
      },[isFocused,myPlants,refreshing,show]);

      const ItemPic = ({ title, pic, id }) => (
        <View style={styles.items2}>
            <TouchableOpacity style = {styles.image2} onPress={() => {updateDB(id), test()}}>
                 
          <Image style={styles.image2}
                    source={pic}>
                </Image>
                </TouchableOpacity>
        </View>
      );
      const picChoose = () => {
        if (choosingPic){
        return(
            <FlatList
                    data={DATA}
                    renderItem={renderPic}
                    keyExtractor={item => item.id}
                    numColumns={4}
                    />
            )}
            else{
                return
            }
    }
    const renderPic = ({ item }) => (
        <ItemPic title={item.title} 
                pic = {item.pic}
                id = {item.id}
        
        />
      );
      const updateDB = async(number) => {
        try {
            await axios.put(userUrl + users[userId].u_id, {
                "u_id":users[userId].u_id,
                "username":  users[userId].username,
                "email" : users[userId].email,
                "password": users[userId].password,
                "profile_picture": number,
                },{'Content-Type': 'application/json'});
            
        }catch (error) {
          console.log(error, "BAD");}
      }


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
        function test( ){
            choosingPic = !choosingPic
            setShow(!show)
        }
            
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.symbols}>
            </View>
            <Text style={styles.userName}>{username}</Text>
            <View>
            <TouchableOpacity onPress={() => test()}>    
                {renderImg(profileP)}
            </TouchableOpacity>
                    {picChoose()}
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
        resizeMode: 'contain',
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
    image2: {
        height: 50, 
        width: 50, 
        top: '5%',  
        borderRadius: 55, 
        alignSelf:'center',
        resizeMode: 'contain',
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
    items2:{
        width:"25%",
    }
})
