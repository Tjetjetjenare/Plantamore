import {React, useState, useEffect} from 'react';
import axios from 'axios';
<<<<<<< HEAD
import {View, ItemSeparatorView, ItemView,SectionList, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';
=======
import {View, ItemSeparatorView, ItemView, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';
>>>>>>> 86ad5d88a7c3f948efb76127334696504622dcb2

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}
const engNameList = [];
function gatherEngName(Plant){
<<<<<<< HEAD

  for (var i=0; i<Plant.length; i++){
    engNameList.push(Plant[i].english_name)
    engNameList.sort()
=======

  for (var i=0;i<Plant.length;i++){
    engNameList.push(Plant[i].english_name)

>>>>>>> 86ad5d88a7c3f948efb76127334696504622dcb2
  }
  return engNameList
}
function PlantDatabase({navigation}) {
  const [Plant, setPlant] = useState("");
  useEffect(async() => {
    try {
      const response = await axios.get(
       plantbaseUrl,
      );
      setPlant(response.data);

    } catch (error) {
    }
    console.log("here")
  },[]);

  const renderItem = ({ item }) => (
    <Item 
        name={item.name} 
        birth_dfate = {item.birth_date}
        water = {item.water}
        replant = {item.replant}
        nutrition = {item.nutrition}
        p_id = {item.p_id}
        username = {item.username}
        plants = {plants}
        navigation = {navigation}
        /> );

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
   var listan = gatherEngName(Plant);
    return (
        <SafeAreaView style={styles.background}>
          <View style={styles.test}>
            <Text style={styles.title}>Plant database</Text>
          </View>
          {/* <View style={styles.letters}>{alphabet.map(letter => <Text>{letter}</Text>)}</View> */}
          <View>
            {/* {listan.map(Plantie => <Text style={styles.letters}>{Plantie}</Text>)} */}
          </View>
          <View>
            <SectionList 
              data={listan}
              numColumns={3}
              columnWrapperStyle={styles.sectionList}
              renderItem={renderItem}
              keyExtractor={item => item.name}
            />
          </View>
          {/* <Text>{engNameList[0]}</Text> */}
        </SafeAreaView>
    );
    }

export default PlantDatabase;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#7E9B6D',
    flex: 1, 
  }, 
  test: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    // fontWeight: 'bold'
  },
  letters: {
    fontWeight: 'bold',
    paddingLeft: 15,
  },
}
)