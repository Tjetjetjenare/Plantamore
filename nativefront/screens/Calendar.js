import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView,Platform, TextInput, TouchableOpacity, Alert } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const userbaseUrl = 'http://localhost:8000/api/users/';


// Change "Calendars", conflicts with imported calendar
function Calendars(props) {

    const water = {key: 'water', color: '#00ffff', selectedDotColor: '#00ffff'};
  
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar style="auto"/>
            <Image 
                style={styles.exitContainer} 
                source={require("../assets/exit(x).png")}>
            </Image>
            <Text 
                style= {styles.header}>
                Calendar
            </Text>

            {/* source https://github.com/wix/react-native-calendars */}
            
            <Calendar 
              onVisableMothsChange={months => {
                console.log('now these months are visible', months);
              }}
              // Enable horizontal scrolling, default = false
              horizontal={true}
              // Enable paging on horizontal, default = false
              pagingEnabled={true}
              // Set custom calendarWidth.
              calendarWidth={400}
              // Enable or disable scrolling of calendar list
              scrollEnabled={false}
              // Hide month navigation arrows. Default = false
              hideArrows={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              firstDay={1}          
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                console.log('selected day', day);
              }}
              // Customize calander
              theme={{
                arrowColor: '#000000'
              }}

              markingType={'multi-dot'}
              markedDates={{
                '2022-04-25': {dots: [water], selected: true, selectedColor: '#d3d3d3'},
                '2022-04-30': {dots: [water], disabled: true}
              }}
            />

        </SafeAreaView>
    );
}

export default Calendars;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFFFFF',
        flex: 1, 
    }, 
    
    exitContainer: {
        height: 20, 
        width: 20, 
        marginLeft: 30,
        marginTop: 40,  
    },

    header: {
        marginLeft: 35, 
        fontSize: 35, 
        fontWeight: 'bold', 
        marginTop: 40, 
    },
      
})