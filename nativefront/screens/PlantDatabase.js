import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {View, ItemSeparatorView, ItemView, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}
const engNameList = [];

function test(){

  useEffect(async() => {
    try {
      const response = await axios.get(
       plantbaseUrl,
      );
      setPlant(response.data);
      for (var i=0;i<response.data.length;i++){
        engNameList.push(response.data[i].english_name)(
          <View>  
            <Text style={styles.letters}>  { engNameList} </Text>
          </View>
        )
        
      }
    } catch (error) {
    }
    return engNameList
    console.log(engNameList)
  },[]);
} 

console.log(engNameList, 'sista')
function PlantDatabase({navigation}, props) {
  const [Plant, setPlant] = useState("");
  

  // useEffect(async() => {
  //   try {
  //     const response = await axios.get(
  //      plantbaseUrl,
  //     );
  //     setPlant(response.data);
  //     for (var i=0;i<response.data.length;i++){
  //       engNameList.push(response.data[i].english_name)(
  //         <View>  
  //           <Text style={styles.letters}>  { engNameList} </Text>
  //         </View>
  //       )
        
  //     }
  //   } catch (error) {
  //   }
  //   console.log(engNameList)
  // },[]);

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
  console.log('tja', engNameList)

    return (
      
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Plant database</Text>
            <View style={styles.letters}>{engNameList.map(index => <Text>{index}:</Text>)}</View>
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