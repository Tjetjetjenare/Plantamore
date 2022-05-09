import {React, useState, useEffect } from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
var plantUrl = null;
var subPlantUrl = null;
const calPla = {};
if(Platform.OS === "android"){ 
    subPlantUrl = 'http://10.0.2.2:8000/api/subplants/';
    plantUrl = 'http://10.0.2.2:8000/api/plants/';}
else{
    subPlantUrl ='http://127.0.0.1:8000/api/subplants/';
    plantUrl = 'http://127.0.0.1:8000/api/plants/'}
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

// source https://github.com/wix/react-native-calendars
function Calendar({navigation},props) {

  const [userPlants, setUserPlants] = useState("");
  const [items, setItems] = useState({});
  const isFocused = useIsFocused();
  const water = {key: 'water', color: '#00FFFF', selectedDotColor: '#00FFFF'}
  const replant = {key: 'replant', color: '#8B4513', selectedDotColor: '#8B4513'}
  const nutrition = {key: 'nutrition', color: '#7E9B6D', selectedDotColor: '#7E9B6D'}

  useEffect(async() => {
    try {
      const response = await axios.get(
        subPlantUrl,
      );
      setUserPlants(response.data);

    } catch (error) {
        console.log("Jästrar")
        console.log(error)
      // handle error
    }
    
  },[isFocused]);
  // loop creates random cards for random days
  // for demonstraion reasons this will be kept this way
  // when API is fixed loop need to be fixed
  const markedDates = (day) => {
    setTimeout(() => {
          for (var i= 0; i<userPlants.length;i++){
            calPla[userPlants[i].water] = []
            calPla[userPlants[i].water].push({name: userPlants[i].name,
            water :userPlants[i].water })

      console.log("NEj",calPla)
          }
    },);
  };

  const renderItem = (item) => {
    return (
      <SafeAreaView style={styles.agendaContainer}>
        <View></View>
        <TouchableOpacity style={{marginRight: 10, marginTop: 10}}>
          <Card>
            <Card.Content>
              <View style={styles.eventContainer}>
                <Text>{item.name}{"\n"} {item.water}</Text>
                <Image style={styles.plantContainer} source={require("../assets/testPlant.png")} />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
        <Text 
          style= {styles.calendarHeader}>
          Calendar
        </Text>

      <Agenda
        onVisableMothsChange={months => {
          console.log('now these months are visible', months);
        }}
         // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={2}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={2}
        // Enable horizontal scrolling, default = false
        horizontal={false}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        // Set custom calendarWidth.
        calendarWidth={400}
        // Enable or disable scrolling of calendar list
        scrollEnabled={false}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}          
        // Handler which gets executed on day press. Default = undefined
        showOnlySelectedDayItems={true}
        items={calPla}
        loadItemsForMonth={markedDates}
        renderItem={renderItem}
        theme = {{
        selectedDayBackgroundColor: '#FFA500',
        todayTextColor: '#FFA500',
        selectedDotColor: '#00FFFF',
        agendaTodayColor: '#FFA500',
        }}
        markingType={'multi-dot'}
          markedDates={{
            '2022-04-25': {dots: [water], selected: false},
            '2022-04-30': {dots: [replant, nutrition], disabled: true},
            '2022-04-24': {dots: [nutrition], disabled: true}
        }}
      />
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({

  container: {
    flex: 2,
    marginTop: 0,
  },

  agendaContainer: {
    marginTop: 20,
  },

  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  plantContainer: {
    maxHeight: 100,
    maxWidth: 100,
  },

  exitContainer: {
    height: 20, 
    width: 20, 
    marginLeft: 30,
    marginTop: 20,  
  },

  calendarHeader: {
    marginLeft: 35, 
    fontSize: 35, 
    fontWeight: 'bold', 
    marginTop: 15, 
},
});
