import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {View, ItemSeparatorView, ItemView, FlatList, Text, SafeAreaView, StyleSheet, Button } from 'react-native';

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}

const engNameList = [];
function PlantDatabase({navigation}) {
  const [Plant, setPlant] = useState("");
  useEffect(async() => {
    try {
      const response = await axios.get(
       plantbaseUrl,
      );
      setPlant(response.data);
      for (var i=0;i<response.data.length;i++){
        engNameList.push(response.data[i].english_name)
      }
    } catch (error) {
    }
    console.log(engNameList)
  },[]);

function PlantDatabase() {
  const [plant, setPlants] = useState("");


  const getPlants = () => {
    axios
      .get(plantbaseUrl)
      .then((response) => {
          setPlants(response.data);
    for (var i=0;i<response.data.length;i++){
      engNameList.push(response.data[i].english_name) 
      }
    });
  };

  // const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']

  return (
    <SafeAreaView style={styles.background}>
      <View>
          <Text style={styles.plants}>{engNameList}</Text>
          <Button title="Get Plants" 
              onPress={getPlants} color="black"/>
      </View>
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

    plants: {
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
    },
  }
)