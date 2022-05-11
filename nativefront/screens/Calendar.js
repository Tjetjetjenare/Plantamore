import {React, useState, useEffect } from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
var plantUrl = null;
var subPlantUrl = null;
const calPla = {};
const dotObj = {};
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
  const [plants, setPlants] = useState({});
  const [items, setItems] = useState({});
  const isFocused = useIsFocused();
  const water = {key: 'water', color: '#00FFFF', selectedDotColor: '#00FFFF'}
  const replant = {key: 'replant', color: '#8B4513', selectedDotColor: '#8B4513'}
  const nutrition = {key: 'nutrition', color: '#7E9B6D', selectedDotColor: '#7E9B6D'}

  useEffect(async() => {
    try {
      for (var member in calPla) delete calPla[member];
      const response = await axios.get(
        subPlantUrl,
      );
      setUserPlants(response.data);
      const response2 = await axios.get(
        plantUrl,
      );
      setPlants(response2.data);
    } catch (error) {
        console.log("Jästrar")
        console.log(error)
      // handle error
    }
    
  },[isFocused]);
  // loop creates random cards for random days
  // for demonstraion reasons this will be kept this way
  // when API is fixed loop need to be fixed
  const markedDates = () => {
    setTimeout(() => {
      for (var i= 0; i<userPlants.length;i++){
          calPla[userPlants[i].water] = []
          calPla[userPlants[i].replant] = []
          calPla[userPlants[i].nutrition] = []
        
        if( dotObj[userPlants[i].water]!= {dots: [], selected: false, disabled: false}){
          dotObj[userPlants[i].water] = {dots: [], selected: false, disabled: false}
        }
        if( dotObj[userPlants[i].replant]!= {dots: [], selected: false, disabled: false}){
          dotObj[userPlants[i].replant] = {dots: [], selected: false, disabled: false}
        }
        if( dotObj[userPlants[i].nutrition]!= {dots: [], selected: false, disabled: false}){
          dotObj[userPlants[i].nutrition] = {dots: [], selected: false, disabled: false}
        }
      }
      for (var i= 0; i<userPlants.length;i++){
        calPla[userPlants[i].water].push({name: userPlants[i].name,
           eve : "Water", p_id:userPlants[i].p_id  })
        calPla[userPlants[i].replant].push({name: userPlants[i].name,
           eve : "Replant", p_id:userPlants[i].p_id   })
        calPla[userPlants[i].nutrition].push({name: userPlants[i].name,
           eve : "Nutrition", p_id:userPlants[i].p_id  })
           if (!(containsObject(water, dotObj[userPlants[1].water].dots))){
            dotObj[userPlants[i].water].dots.push(water)
           }
           if (!(containsObject(replant, dotObj[userPlants[1].replant].dots))){
            dotObj[userPlants[i].replant].dots.push(replant)
           }
           if (!(containsObject(nutrition, dotObj[userPlants[1].nutrition].dots))){
            dotObj[userPlants[i].nutrition].dots.push(nutrition)
           }
      }
    },);
  };
  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
  const renderItem = (item) => {
    return (
      <SafeAreaView style={styles.agendaContainer}>
        <View></View>
        <TouchableOpacity style={{marginRight: 10, marginTop: 10}}>
          <Card>
            <Card.Content>
              <View style={styles.eventContainer}>
                <Text>{item.name}{"\n"} {item.eve}</Text>
                <Image style={styles.plantContainer}
                source={{
                  uri: `${plants[item.p_id-1].image_url}`
                }}/> 
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
        disabledByDefault={true}
        refreshing={false}
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
          markedDates={dotObj}
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
    height: 100,
    width: 100,
    resizeMode: 'contain',
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
