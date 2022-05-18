import { React, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import moment from 'moment';

var plantUrl = null;
var subPlantUrl = null;
var myPlants = [];
const calPla = {};
const dotObj = {};
if (Platform.OS === "android") {
  subPlantUrl = 'http://10.0.2.2:8000/api/subplants/';
  plantUrl = 'http://10.0.2.2:8000/api/plants/';
}
else {
  subPlantUrl = 'http://127.0.0.1:8000/api/subplants/';
  plantUrl = 'http://127.0.0.1:8000/api/plants/'
}

function findMyPlants(userPlants, username) {
  myPlants.length = 0
  for (var i = 0; i < userPlants.length; i++) {
    if (userPlants[i].username == username) {
      myPlants.push(userPlants[i])
    }
  }
  return myPlants
}
function Calendar({ navigation }, props) {
  const [userPlants, setUserPlants] = useState("");
  const [plants, setPlants] = useState({});
  const [items, setItems] = useState({});
  const [username, setUsername] = useState("");
  const isFocused = useIsFocused();
  const water = { key: 'water', color: '#00FFFF', selectedDotColor: '#00FFFF' }

  useEffect(async () => {
    AsyncStorage.getItem('MyName').then(value =>
      setUsername(value)
    );
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
    }
  }, [isFocused]);
  const addIfSummer = () => {
    var amplify = 1
    var today = moment(new Date())
    if (today.isBetween(moment().year().toString() + "-05-01", moment().year().toString() + "-09-30")) {
      amplify = 0.8;
    }
    return (amplify)
  }
  const markedDates = () => {
    var myPlants = findMyPlants(userPlants, username)
    setTimeout(() => {
      for (var i = 0; i < myPlants.length; i++) {
        calPla[myPlants[i].water] = []
        if (dotObj[myPlants[i].water] != { dots: [], selected: false, disabled: false }) {
          dotObj[myPlants[i].water] = { dots: [], selected: false, disabled: false }
        }
      }
      for (var i = 0; i < myPlants.length; i++) {
        calPla[myPlants[i].water].push({
          name: myPlants[i].name,
          eve: "Last time " + myPlants[i].name + " was watered", p_id: myPlants[i].p_id
        })
        if (!(containsObject(water, dotObj[myPlants[i].water].dots))) {
          dotObj[myPlants[i].water].dots.push(water)
        }
      }
      var shouldWater = [];
      for (var i = 0; i < myPlants.length; i++) {
        var amplify = addIfSummer()
        if (plants[myPlants[i].p_id - 1].water == 'Sparingly') {
          shouldWater.push(moment(myPlants[i].water).add(Math.floor(19 * amplify), 'days').format('YYYY-MM-DD'))
        }
        else if (plants[myPlants[i].p_id - 1].water == 'Generously') {
          shouldWater.push(moment(myPlants[i].water).add(Math.floor(4 * amplify), 'days').format('YYYY-MM-DD'))
        }
        else {
          shouldWater.push(moment(myPlants[i].water).add(Math.floor(7 * amplify), 'days').format('YYYY-MM-DD'))
        }
        calPla[shouldWater[i]] = []
        if (dotObj[shouldWater[i]] != { dots: [], selected: false, disabled: false }) {
          dotObj[shouldWater[i]] = { dots: [], selected: false, disabled: false }
        }
      }
      for (var i = 0; i < myPlants.length; i++) {
        calPla[shouldWater[i]].push({
          name: myPlants[i].name,
          eve: "Next time " + myPlants[i].name + " should be watered", p_id: myPlants[i].p_id
        })
        if (!(containsObject(water, dotObj[shouldWater[i]].dots))) {
          dotObj[shouldWater[i]].dots.push(water)
        }
      }
    });
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
        <View />
        <TouchableOpacity style={{ marginRight: 10, marginTop: 10 }}>
          <Card style={styles.cardContent}>
            <Card.Content>
              <View style={styles.eventContainer}>
                <Text>{item.name}{"\n"} {item.eve}</Text>
                <Image style={styles.plantContainer}
                  source={{
                    uri: `${plants[item.p_id - 1].image_url}`
                  }} />
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
        style={styles.calendarHeader}>
        Calendar
      </Text>
      <Agenda
        onVisableMothsChange={months => {
        }}
        pastScrollRange={2}
        futureScrollRange={2}
        horizontal={false}
        pagingEnabled={true}
        calendarWidth={400}
        scrollEnabled={false}
        hideArrows={true}
        firstDay={1}
        showOnlySelectedDayItems={true}
        disabledByDefault={true}
        refreshing={false}
        items={calPla}
        loadItemsForMonth={markedDates}
        renderItem={renderItem}
        theme={{
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
  agendaContainer: {
    marginTop: 20,
  },
  calendarHeader: {
    marginLeft: 35,
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 15,
  },
  cardContent: {
    borderRadius: 10,
  },
  container: {
    flex: 2,
    marginTop: 0,
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitContainer: {
    height: 20,
    width: 20,
    marginLeft: 30,
    marginTop: 20,
  },
  plantContainer: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
});
