import React, {useState, useEffect} from "react";
import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView, Platform, SectionList, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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

    const DATA = [
        {
          title: "",
          data: [""],
        },
        {
          title: "What type of plant is it?",
          data: ["Search database for type of plant"],
        },
        {
          title: "What is the name of your plant?",
          data: ["Name of plant"],
        },
        {
          title: "What is your plant's birthday?",
          data: ["DD-MM-YY"],
        },
        {
          title: "When did you last watered your plant?",
          data: ["DD-MM-YY"],
        },
        {
          title: "",
          data: ["Save profile"],
        },
      ];



function CreatePlantSubprofile(props) {
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(true);
    const [dbImage, setDbImage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [bday, setBday] = useState('');
    const [watered, setWatered] = useState('');
   // const [logd, setLogd] = useState('');
    const isFocused = useIsFocused();
 
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
        <View style={styles.input} >
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
      )

    }
    else{
      return
  }};

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    setVisible(true)
    setDbImage('')
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

  const selectedPlant = (item) => {
    setSearch(item.english_name)
    setVisible(false)
    setDbImage(item.image_url)
    console.log("image in item " + item.image_url)
    console.log("img" + dbImage)

  }


  const ItemView = ({ item }) => {
    return (
      // Flat List Item
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
 
  const Item = ({ title}) => { console.log(title)
      if(title == 'Search database for type of plant'){
          return(
              <View>
                  {SearchField()}
                  {SearchList()}
              </View>
          )
      }if (title == '') {
        if(dbImage!=''){
          return(
          <View>             
              <Image
                  style={styles.plantPic}
                  source={{
                    uri: dbImage
                }}> 
              </Image>
          </View> )         
        }else{
          return(
          <View>             
              <Image
                  style={styles.plantPic}
                  source={require("../assets/onlyPlantSmall.png")}>
              </Image>
          </View>
          )}
      }if(title=='Save profile'){
          return(
              <TouchableOpacity style={styles.savebtn} onPress={() => Alert.alert('Save profile')}>
              <Text>SAVE  </Text>
            </TouchableOpacity>
          )
      }
      else{
      return(
        <View style={styles.item}>
            <TextInput 
              style={styles.input} 
              placeholder={title}
              />
        </View>)
      }
    };


   return(
         <SafeAreaView style={styles.container} >
            <StatusBar style="auto"/>
            <Text style={styles.header}>Add a new plant to your profile</Text>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item}/>}
                renderSectionHeader={({ section: { title} }) => (
                    <Text style={styles.info}>{title}</Text>
                )}
             />
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
        marginTop: 10, 
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
        padding: 5,
        marginBottom: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignSelf: "center",
        borderRadius: 30, 
    },
    scroll:{
      height:150,
      width:"90%",
      //marginTop:51,
      borderRadius: 20,
      textAlign: "center",
      opacity: 1,
      //position:'absolute',
      //top:20,
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
      top:-30,
        
    },
    searchItem: {
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
  });