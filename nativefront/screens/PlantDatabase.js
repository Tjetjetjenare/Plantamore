import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {View, ItemSeparatorView, ItemView, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}


// function PlantDatabase(props) {
//     const [filteredDataSource, setFilteredDataSource] = useState([]);
//     const [masterDataSource, setMasterDataSource] = useState([]);

//     useEffect(async() => {
//         try {
//           const response = await axios.get(
//            plantbaseUrl,
//           );
//           setFilteredDataSource(response.data);
//           setMasterDataSource(response.data);
          
//         } catch (error) {
//           console.error(error);
//         }
//       },[]);

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
  },[]);

  const Item = ({ english_name }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{english_name}</Text>
    </View>
  );

  const App = () => {
    const renderItem = ({ item }) => (
      <Item english_name={item.english_name} />
    );
  }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Plant database</Text>
            

        <View style = {styles.scroll}>
        <FlatList
            data={Plant}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            />
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
    title: {
        fontSize: 36, 
        color: '#fff', 
        
    },
}
)