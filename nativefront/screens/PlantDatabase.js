import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {View, ItemSeparatorView, ItemView, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}
const engNameList = [];
function gatherEngName(Plant){

  for (var i=0;i<Plant.length;i++){
    engNameList.push(Plant[i].english_name)

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

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
   var engNameList = gatherEngName(Plant);
    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Plant database</Text>
            {/* <View style={styles.letters}>{engNameList.map(letter => <Text>{letter}:</Text>)}</View> */}
            <Text>{engNameList[0]}</Text>
            <Text>{engNameList[1]}</Text>
            <Text>{engNameList[2]}</Text>
            <Text>{engNameList[3]}</Text>
            <Text>{engNameList[4]}</Text>
        </SafeAreaView>
    );
    }

export default PlantDatabase;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#7E9B6D',
    flex: 1,
    alignItems: 'center', 
  }, 
  title: {
    fontSize: 36,
    color: '#fff',
  },
  letters: {
    fontWeight: 'bold',
    flex: 1,
  },
}
)