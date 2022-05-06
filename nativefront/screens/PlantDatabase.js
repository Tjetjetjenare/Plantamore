import {React, useState, useEffect, Component} from 'react';
import axios from 'axios';
import {View, ItemSeparatorView, ItemView,SectionList, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';

var plantbaseUrl = null;

if(Platform.OS === "android"){ plantbaseUrl = 'http://10.0.2.2:8000/api/plants/';}
else{  plantbaseUrl = 'http://127.0.0.1:8000/api/plants/';}
const engNameList = [];

  export default function ContactsList() {
   const [Plant, setPlant] = useState([]);
  useEffect(async() => {
    try {
      const response = await axios.get(
       plantbaseUrl,
      );
      setPlant(response.data);

    } catch (error) {
    }
  },[]);
   function getData ()  {
      let nameArr = [];
      let aCode = "A".charCodeAt(0);
      for (let i = 0; i < 26; i++) {
        let currChar = String.fromCharCode(aCode + i);
        let obj = {
          title: currChar
        };
  
        let currName = Plant.filter(item => {
          return item.english_name[0].toUpperCase() === currChar;
        });
        if (currName.length > 0) {
          currName.sort((a, b) => a.english_name.localeCompare(b.english_name));
          obj.data = currName;
         nameArr.push(obj);
        }
      }
      return nameArr;
    };

      return (
        <View style={styles.container}>
          <SectionList
            sections={getData()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text>{item.english_name}</Text>
              </View>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text>{section.title}</Text>
              </View>
            )}
            keyExtractor={item => item.p_id}
          />
        </View>
      );
    }


const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
    flex: 1, 
  }, 
  test: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
  letters: {
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignSelf: "stretch",
    paddingVertical: 20
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: "#7E9B6D",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
}
)