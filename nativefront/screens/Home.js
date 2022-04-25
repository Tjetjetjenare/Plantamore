import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { SafeAreaView,ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Text, Alert, View, TextInput } from 'react-native';
//import SearchField from '../components/SearchField';
import StandardButton from '../components/StandardButton';
/*import { SearchBar } from 'react-native-elements';*/
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const plantbaseUrl = 'http://localhost:8000/api/plants/';

function Home({navigation}) {
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');
    
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
  },[]);
  
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
  }}


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
    alert('Id : ' + item.p_id + ' Title : ' + item.english_name);
  };
  return (
    <SafeAreaView style={styles.container}>
            <Image
                style={styles.burgerMenu}
                source={require("../assets/burgerMenu.png")}/>
            <Image
                style={styles.profileButton}
                source={require("../assets/profileButton.png")}/>
        <StatusBar style="auto"/>
        <View style={styles.greenAccent} />
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <View style= {styles.searchContainer}>
        {SearchField()}
        {SearchList()}
      </View>
      <View style={styles.buttonWrapper} >
        <Text style={styles.text}>Log in to your existing account {"\n"}
              or {"\n"}Sign up to get started
        </Text>
        <View style={styles.loginWrap}>
          <StandardButton sizeFont={20} title="Log in" functionOnPress={() => navigation.navigate('Profile')} />
        </View>
        <View style={styles.loginWrap}>
          <StandardButton sizeFont={20} title="Sign up" functionOnPress={() => navigation.navigate('SignUp')}/>
        </View>
        </View>
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
    top:100,
  },
  container2: {
    width:"90%",
    height:50,
    opacity: 1,
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
    top:-40,
},
  text:{
    textAlign: "center",
    fontSize: 16,
  }, 
  buttonWrapper: {
    alignItems: "center",
    position:"absolute",
    bottom: 100,
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
    width: "70%",
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
    width:"80%",
    opacity: 1,
    position:'absolute',
    top:12,
  },
  searchContainer:{
    width:"95%",
    alignItems:'center',
  },
  itemStyle: {
    padding: 10,
    margin:5,
    backgroundColor: "rgba(251, 251, 251, 0.17)",
  },
})