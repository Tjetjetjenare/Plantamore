import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import {KeyboardAvoidingView, SafeAreaView, FlatList, StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import StandardButton from '../components/StandardButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}



function Home({navigation}) {
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [logd, setLogd] = useState('');
    const isFocused = useIsFocused();
  useEffect(async() => {
    if(isFocused){         console.log("called");
    AsyncStorage.getItem('inloggad').then(value =>
       setLogd(value )
  );
  console.log(logd)
    }
    try {
      const response = await axios.get(
       plantbaseUrl,
      );
      setFilteredDataSource(response.data);
      setMasterDataSource(response.data);
      
    } catch (error) {
      console.error(error);
    }
  },[logd,isFocused]);
  
  const SearchField = () => {
    return (
        <View style={styles.container2}>
            <TextInput 
                style={styles.bar} 
                placeholder='Search' 
                onChangeText={(text) => searchFilterFunction(text)}
                value= {search}
                placeholderTextColor={"white"}/>
                
        </View>
    )
  }

  const SearchList = () => {
    if (search.length < 1){
      return
    }
    else{
    return(
      <View style = {styles.scroll}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    )
  }};
  const ButtonWrap = () => {
    if (logd == 'false'){
      return(
        <View style={styles.buttonWrapper}>
            <View style={styles.loginWrap}>
              <StandardButton sizeFont={20} title="Log in" functionOnPress={() => navigation.navigate('LogIn')} />
            </View>
            <View style={styles.loginWrap}>
              <StandardButton sizeFont={20} title="Sign up" functionOnPress={() => navigation.navigate('SignUp')}/>
            </View>
          
        </View>
      )
    } else{
      return(
        <TouchableOpacity onPress={() => navigation.navigate('Guide') }style={styles.careGuideOPA}>
          <Text style={styles.careGuideButton}>Care Guide</Text>
      </TouchableOpacity>
    )}


  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.english_name
          ? item.english_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.item}>
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.p_id}
        {'.'}
        {item.english_name.toUpperCase()}
      </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate("PlantDB", {plantId : item.p_id, EnglishName : item.english_name, LatinName : item.latin_name,
    SwedishName: item.swedish_name,Description: item.description, Sun : item.sunlight, Water: item.water,
    Nutrition: item.nutrition, ImageUrl: item.image_url});
  };
  
  return (
    
    <SafeAreaView style={styles.container}>
            {/* <Image
                style={styles.burgerMenu}
                source={require("../assets/burgerMenu.png")}/>
            <Image
                style={styles.profileButton}
                source={require("../assets/profileButton.png")}/> */}
        <StatusBar style="auto"/>
        {/* <View style={styles.greenAccent} /> */}
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <View style= {styles.searchContainer}>
        {SearchField()}
        {SearchList()}
        
      </View>
      {ButtonWrap()}
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: "80%",
    resizeMode: "contain",
    position:"absolute",
    top:80,
  },
  container2: {
    width:"90%",
    height:50,
    opacity: 1,
},
container3: {
  flex:1,
  backgroundColor: '#fff',
},
bar: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
    opacity: 0.4,
    position:'absolute',
    top: 20,
},
  buttonWrapper: {
    alignItems: "center",
    position:"absolute",
    top: 390,
    
  },
  greenAccent:{
    position: "absolute",
    bottom:-100,
    width: "300%",
    height: "63%",
    backgroundColor: "#7E9B6D",
    transform: [{rotate: '-30deg'}]
  }, 
  loginWrap: {
    width: "200%",
    height: 40,
    marginTop: 20,
  },
  burgerMenu: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileButton: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  scroll:{
    height:"280%",
    width:"90%",
    marginTop:51,
    // backgroundColor: "black",

    borderRadius: 20,
    textAlign: "center",
    opacity: 1,
    position:'absolute',
    top:20,
    backgroundColor: 'gray',
  },
  searchContainer:{
    width:"95%",
    alignItems:'center',
    position:'absolute',
    top:260,
  },
  item: {
    padding: 5,
    marginHorizontal: 10,
    opacity: 2,
  },
  itemStyle: {
    padding: 5,
    margin:5,

    // backgroundColor: "rgba(251, 251, 251, 0.17)",
    color: 'white'
  },
  careGuideButton: {
    textDecorationLine: 'underline',
    fontSize: 23, 
    color: '#fff',
  },
  careGuideOPA: {
    textDecorationLine: 'underline',
    fontSize: 23,
    top:150,
  },
})