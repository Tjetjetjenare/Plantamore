import React,{useState, useEffect} from 'react';
import { SafeAreaView, Alert, StyleSheet,RefreshControl, TouchableOpacity, Image, Text, View, FlatList, Platform} from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import moment from 'moment';
const myPlants = [];
var plantUrl = null;
var subPlantUrl = null;
var userUrl = null;
var ref = false;
var choosingPic = false;
var profileP = 1;
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
    
    const addIfSummer = () => {
        var amplify = 1
        var today= moment(new Date())
        if(today.isBetween(moment().year().toString()+"-05-01", moment().year().toString()+"-09-30")){
            amplify = 0.8;
        }
        return(amplify)
    }
   
    const daysUntilWater = () => {
        var amplify = addIfSummer()
        var today = moment(new Date())
        var lastWater = moment(water)
        if(plants[p_id-1].water=='Sparingly'){
            var shouldWater = lastWater.add(Math.floor(16*amplify), 'days')
        }else if(plants[p_id-1].water=='Generously'){
            var shouldWater = lastWater.add(Math.floor(4*amplify), 'days')
        }
        else
            {var shouldWater = lastWater.add(Math.floor(7*amplify), 'days')}
        var displayWater = shouldWater.diff(today, 'days')
        if(displayWater<= 0)
            {displayWater='today!'}
        else{displayWater='in '+ displayWater+' days'}
        return(displayWater)
    }
    const monthsUntilReplant = () => {
        var today = moment(new Date())
        var lastReplant = moment(replant)
        var betweenReplants = plants[p_id-1].replant
        var shouldReplant = lastReplant.add(betweenReplants, "months")

        if (shouldReplant.year()==moment().year() && today.isAfter(moment().year().toString()+"06-30")){
                var willReplant = (shouldReplant.year()+1).toString()+"-04-01"
        }else{
            if(shouldReplant.isBetween(moment().year().toString()+"-01-01", shouldReplant.year().toString()+"-10-01")){
                var willReplant = shouldReplant.year().toString()+"-04-01"}
            else{
                var willReplant = (shouldReplant.year()+1).toString()+"-04-01"
            }   
        }

        var displayReplant = moment(willReplant).diff(today, "months")  

        if(displayReplant<= 0){
            displayReplant='this month!'}
        else{
            displayReplant='in '+ displayReplant+' months'}
        return(displayReplant)
    }
    const timeUntilNuttrition = () => {
        if(nutrition<=1) {
            var time="Next time you water"
        }else {
            var time="In "+ nutrition + " waterings"
        }
        return time
    }

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
                    
                    navigation.navigate('GuideDrawer',{screen:'PlantSub',params: {plantId: p_id, EnglishName: plants[p_id-1].english_name,LatinName : plants[p_id-1].latin_name,
                        SwedishName: plants[p_id-1].swedish_name, Description: plants[p_id-1].description,
                        Sunlight:plants[p_id-1].sunlight, PlantNut:  plants[p_id-1].nutrition, PlantWat: plants[p_id-1].water, ImageUrl:plants[p_id-1].image_url,
                        PlantName: name, BirthDate: birth_date, Water: water, Replant: replant,
                        Nutrition: nutrition, Username: username,  PlantRe:  plants[p_id-1].replant,
                    }});
                }
            }}
            delayLongPress={1500} onLongPress={()=>{Alert.alert(
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
               <View style = {{paddingTop:10}}>
                    <View style={styles.innerSpec}>
                        <Image 
                            style={styles.specIcon} 
                            source={require("../assets/drop.png")}>
                        </Image>
                        <Text> {daysUntilWater()} </Text>
                    </View>
                    <View style={styles.innerSpec}>
                        <Image 
                            style={styles.specIconNutrition} 
                            source={require("../assets/nutritionFlask.png")}>
                        </Image>
                        <Text>{timeUntilNuttrition()}</Text>
                    </View>
                    <View style={styles.innerSpec}>
                        <Image
                            style={styles.specIcon} 
                            source={require("../assets/replant.png")}>
                        </Image>
                        <Text>{monthsUntilReplant()}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

  );}}

const DATA = [
    {
      id: '13',
      title: 'First Item',
      pic: require("../assets/Anna.png"),
    },
    {
      id: '2',
      title: 'Second Item',
      pic: require("../assets/Elaf.png"),
    },
    {
      id: '3',
      title: 'Third Item',
      pic: require("../assets/Emma.png"),
    },
    {
        id: '4',
        title: 'Fourth Item',
        pic: require("../assets/Hannah.png"),
      },
      {
        id: '5',
        title: 'Fifth Item',
        pic: require("../assets/John.png"),
      },
      {
        id: '6',
        title: 'Sixth Item',
        pic: require("../assets/Kent.png"),
      },
      {
        id: '7',
        title: 'Seventh Item',
        pic: require("../assets/Kerstin.png"),
      },
      {
          id: '8',
          title: 'Eigth Item',
          pic: require("../assets/Max.png"),

        },
        {
            id: '9',
            title: 'Nineth Item',
            pic: require("../assets/Olaf.png"),
  
          },
          {
            id: '10',
            title: 'Eigth Item',
            pic: require("../assets/Pelle.png"),
  
          },
          {
            id: '11',
            title: 'Eigth Item',
            pic: require("../assets/Sam.png"),
  
          },
          {
            id: '12',
            title: 'Eigth Item',
            pic: require("../assets/Tom.png"),
  
          },
  ];
  

  const renderImg = (number) => {
      if(number==1){
                 return(
                    <Image 
                        style={styles.profilePic}
                        source={ require("../assets/profileTest.png")}>
                    </Image>)}
     else if(number==2){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Elaf.png")}>
       </Image>)}
       else if(number==3){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Emma.png")}>
       </Image>)}
       else if(number==4){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Hannah.png")}>
       </Image>)}
       else if(number==5){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/John.png")}>
       </Image>)}
       else if(number==6){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Kent.png")}>
       </Image>)}
       else if(number==7){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Kerstin.png")}>
       </Image>)}
       else if(number==8){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Max.png")}>
       </Image>)}
       else if(number==9){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Olaf.png")}>
       </Image>)}
       else if(number==10){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Pelle.png")}>
       </Image>)}
       else if(number==11){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Sam.png")}>
       </Image>)}
       else if(number==12){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Tom.png")}>
       </Image>)}
       else if(number==13){
        return(
           <Image 
           style={styles.profilePic}
           source={ require("../assets/Anna.png")}>
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
    //const [profileP,setProfileP] = useState(null);

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
        //Lite sådär men okej tkr jag
        if(profileP == 1){
            AsyncStorage.getItem('propic').then(value =>
                 profileP = (value)
            );
        }
        
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
                profileP = response3.data[i].profile_picture
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
          profileP = number;
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
            
  if (profileP == 1){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.symbols}>
            </View>
            <Text style={styles.userName}>{username}</Text>
            <View>
            <TouchableOpacity style= {styles.touchPic} onPress={() => test()}>    
                {renderImg(1)}
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
  else{
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.symbols}>
            </View>
            <Text style={styles.userName}>{username}</Text>
            <View>
            <TouchableOpacity style= {styles.touchPic} onPress={() => test()}>    
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
}}

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
        resizeMode: 'contain',
       // top: -10,
       // left: 10,
    },
    touchPic:{
        width: 180, 
        height: 180, 
        top: 10, 
        alignSelf: 'center', 
        
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        top: '5%',
        paddingBottom: 100,
    },
   
    flatList: {
        padding: 10,
        paddingBottom:0, 
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
    },
    innerSpec:{
        flexDirection: "row",
        alignSelf:"flex-start",
        paddingLeft: 10,
        color: 'white', 
        fontSize:12,
    },
    specIcon:{
        width: 15,
        height: 15,
        aspectRatio:1,
    },
    specIconNutrition: {
        width: 20,
        height: 20,
        aspectRatio:1,
        tintColor: '#bf3d4a', 
    },
})
