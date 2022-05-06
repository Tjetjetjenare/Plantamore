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
        title: "Add a new plant to your profile",
        data: [""]
        },
        {
          title: "What is the name of your plant?",
          data: ["Name of plant"]
        },
        {
          title: "What type of plant is it?",
          data: ["Search database for type of plant"]
        },
        {
          title: "What is your plant's birthday?",
          data: ["DD-MM-YY"]
        },
        {
          title: "When did you last watered your plant?",
          data: ["DD-MM-YY"]
        },
        {
            title: "",
            data: ["Save profile"]
          },
      ];



function CreatePlantSubprofile(props) {
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
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.p_id}
        {'.'}
        {item.english_name.toUpperCase()}
      </Text>
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
    const Item = ({ title}) => {
        if(title == 'Search database for type of plant'){
            return(
                <View>
                    {SearchField()}
                    {SearchList()}
                </View>
            )
        }if (title == '') {
            return(
            <View>
                <Text style={styles.header}>{title}</Text>                
                <Image
                    style={styles.plantPic}
                    source={require("../assets/addimg.png")}>
                </Image>
            </View>)
        }if(title=='Save profile'){
            return(
                <TouchableOpacity style={styles.savebtn} onPress={() => Alert.alert('Save profile')}>
                <Text>SAVE</Text>
              </TouchableOpacity>
            )
        }
        else{
        return(
        <View style={styles.item}>
            <TextInput style={styles.input} placeholder={title}/>
        </View>)
        }
    };


   return(
         <SafeAreaView style={styles.container} >
            <StatusBar style="auto"/>
            
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item}/>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.info}>{title}</Text>
                )}
             />
           {/* <ScrollView>

                <Text style={styles.info}>What is the name of your plant?</Text>
                <TextInput style={styles.input} placeholder="Name of plant"/>
                <Text style={styles.info}>What type of plant is it?</Text>
                <TextInput style={styles.input} placeholder="Search database for type of plant"/>
                <Text style={styles.info}>What is your plant's birthday?</Text>
                <TextInput style={styles.input} placeholder="DD-MM-YY"/>
                <Text style={styles.info}>When did you last watered your plant?</Text>
                <TextInput style={styles.input} placeholder="DD-MM-YY"/>
                <TouchableOpacity style={styles.savebtn} onPress={() => Alert.alert('Save profile')}>
                    <Text>SAVE</Text>
                  </TouchableOpacity>
                </ScrollView>*/}
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
    plantPic: {
        width: 150, 
        height: undefined,
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius:75,
        alignSelf: "center",
        
    },
    plantTouch: {
        width: 150, 
        height: undefined,
        aspectRatio: 1,
        borderRadius:75,
        margin: 20,
        alignSelf: "center",
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