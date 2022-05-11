import React, {useState, useEffect} from "react";
import { StyleSheet, Text, Button, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView, Platform, SectionList, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateField from 'react-native-datefield';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';


var plantbaseUrl = null;
var subplantbaseUrl = null;

if(Platform.OS === "android"){ 
    subplantbaseUrl = 'http://10.0.2.2:8000/api/subplants/';
    plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{
    subplantbaseUrl ='http://127.0.0.1:8000/api/subplants/';
    plantbaseUrl = 'http://127.0.0.1:8000/api/plants/'}




function CreatePlantSubprofile() {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(true);
  const [dbImage, setDbImage] = useState('');
  const [name, setName] = useState('');
  const [bday, setBday] = useState('');
  const [water, setWater] = useState('');

  // const [logd, setLogd] = useState('');
  const isFocused = useIsFocused();
   

  const renderTitle = () => {
      return(
        <Text style={styles.header}>Add a new plant to your profile</Text>)
  };
   
  const renderType = () => {
    return(
    <View>
      <Text style={styles.info}>What type of plant is it?</Text>
      <View>
          {SearchField()}
          {SearchList()}
      </View>
    </View>)
  };
  
  const renderName = () => {
    return(
      <View>
      <Text style={styles.info}>What is your plant's name?</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Name of plant"
            onChangeText={text => setName(text)}
            value={name}
            />
      </View>)
  };

  const renderImg = () => {
    if(dbImage!=''){
      return(            
          <Image
              style={styles.plantPic}
              source={{uri: dbImage}}
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

  const renderSave = () => {
    return(
      <TouchableOpacity style={styles.savebtn} onPress={() => saveBtnPressed()}>
        <Text>SAVE</Text>
      </TouchableOpacity>
    )
  };

  const renderBday = () => {
    return(
      <View>
        <Text style={styles.info}>When was your plant born?</Text>
        <View style={styles.dateWrap}>
          <DateField
            labelDate="DD"
            labelMonth="MM"
            labelYear="YYYY"
            styleInput={styles.dateInput}
            onSubmit={(value) => setBday(value)}
            value={bday}
          />
        </View>
      </View>
    )
  };

  const renderWater = () => {
    return(
      <View>
        <Text style={styles.info}>When did you last water your plant?</Text>
        <View style={styles.dateWrap}>
          <DateField
            labelDate="DD"
            labelMonth="MM"
            labelYear="YYYY"
            styleInput={styles.dateInput}
            onSubmit={(value) => setWater(value)}
            value={water}
          />
        </View>
      </View>
    )
  };

  const DATA = [
    {
      title: "Page Title",
      renderItem: renderTitle,
      data: ["Add a new plant to your profile"],
    },
    {
      title: "Plant image",
      renderItem: renderImg,
      data: [""],
    },
    {
      title: "Plant type",
      renderItem: renderType,
      data: ["Search database for type of plant"],
    },
    {
      title: "Plant name",
      renderItem: renderName,
      data: ["Name of plant"],
    },
    {
      title: "Plant birthday",
      renderItem: renderBday,
      data: ["DD-MM-YY"],
    },
    {
      title: "Last watered",
      renderItem: renderWater,
      data: ["DD-MM-YY"],
    },
    {
      title: "Save button",
      renderItem: renderSave,
      data: ["Save profile"],
    },
  ];

  useEffect(async() => {
    try {
      const response = await axios.get(
      plantbaseUrl,
      );
      setFilteredDataSource(response.data);
      setMasterDataSource(response.data);
      
    } catch (error) {
      console.error(error);
    }
  },[isFocused]);
  
  const SearchField = () => {
    return (
      <TextInput 
        style={styles.input}
        placeholder="Search database for type of plant" 
        onChangeText={(text) => searchFilterFunction(text)}
        value= {search}
        placeholderTextColor={"gray"}
      />
    )
  };

  const SearchList = () => {
    if (search.length >= 1 && visible == true){
      return(
        <View style = {styles.scroll}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      )}
    else{
      return
    }
  };

  const searchFilterFunction = (text) => {
    setVisible(true)
    setDbImage('')
    if (text) {
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
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const selectedPlant = (item) => {
    setSearch(item.english_name)
    setVisible(false)
    setDbImage(item.image_url)
  }

  const ItemView = ({ item }) => {
    return (
      <View style={styles.searchItem}>
        <Text style={styles.itemStyle} onPress={() => selectedPlant(item)}>
          {item.p_id}
          {'.'}
          {item.english_name.toUpperCase()}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const saveBtnPressed = () => {
    Alert.alert('Save', 'The plant has been added to your profile')
    console.log("name: "+name+", img: "+dbImage+", bday: "+bday+", water:"+water)
    setBday('')
    setWater('')
    setSearch('')
    setName('')
    setDbImage('')
  }

  return(
      <SafeAreaView style={styles.container} >
        <StatusBar style="auto"/>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({section: {renderItem}}) => <View>{renderItem}</View>}/>
      </SafeAreaView>
  );
}

export default CreatePlantSubprofile;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#7E9B6D',
    },
    dateInput: {
      width: '30%',
      height:40,
      borderRadius: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      paddingLeft:10,
      paddingRight:10,
    },
    dateWrap:{
      width:"90%",
      height:50,
      alignSelf: "center",
    },
    header: { 
        fontSize: 35, 
        fontWeight: 'bold',  
        marginBottom: 20,
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
      paddingLeft: 5,
      marginBottom: 20,
      borderWidth: 1,
      alignSelf: "center",
      borderRadius: 8, 
    },
    scroll:{
      height:150,
      width:"90%",
      borderRadius: 20,
      textAlign: "center",
      opacity: 1,
      backgroundColor: 'gray',
      alignSelf:"center",
      overflow:"hidden",
    },
    plantPic: {
      aspectRatio: 1,
      width: 150, 
      height: 150,
      borderWidth: 1,
      borderRadius:75,
      backgroundColor:"#fff",
      alignSelf: "center",    
    },
    searchItem: {
      padding: 5,
      marginHorizontal: 10,
      opacity: 2,
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
      margin:20,
    },
  });