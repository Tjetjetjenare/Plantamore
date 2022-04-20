import {React, useState} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

// source https://github.com/wix/react-native-calendars
function Calendar(props) {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            });
            console.log(day)
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <SafeAreaView style={styles.agenda}>
        <TouchableOpacity style={{marginRight: 10, marginTop: 10}}>
          <Card>
            <Card.Content>
              <View
                style={styles.event}>
                <Text>{item.name}</Text>
                <Image style={styles.plant} source={require("../assets/testPlant.png")} />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Handler which gets executed on day press. Default = undefined
        theme={{
          arrowColor: '#000000'
        }}
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-04-20'}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 10,
  },

  agenda: {
    marginTop: 20,
  },

  event: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  plant: {
    maxHeight: 100,
    maxWidth: 100,
  },
});
