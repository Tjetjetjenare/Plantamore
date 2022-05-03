import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, Text, Alert, View,  FlatList} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const DATA = [
    {
     title: 'First Item',
     image: require("../assets/testPlant.png"), 
     id: 0, 
    },
    {
    title: 'Second Item',
    image: require("../assets/testPlant.png"), 
    id: 1, 
    },
    {
    title: 'Third Item',
    image: require("../assets/testPlant.png"), 
    id: 2, 
    },
    {
    title: 'Fourth Item',
    image: require("../assets/testPlant.png"), 
    id: 3, 
    },
    {
    title: 'Fifth Item',
    image: require("../assets/testPlant.png"), 
    id: 4, 
    },
    {
    title: 'Sixth Item',
    image: require("../assets/testPlant.png"), 
    id: 5, 
    },
    {
    title: 'Seventh Item',
    image: require("../assets/testPlant.png"), 
    id: 6, 
    },

];

const Item = ({ title, image,id }) => (
    <TouchableOpacity 
        onPress={()=>{
            alert(id);
        }}>
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image}
                source={image}> 
            </Image>
        </View>
    </TouchableOpacity>
  );

function Watered(props) {
    const renderItem = ({ item }) => (
        <Item title={item.title} 
              image={item.image}
              id = {item.id}
              
              /> )

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.symbols}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Ionicons
                    style={{ marginLeft: 10 }}
                    name="close-outline"
                    color="black"
                    size={35}
                />
            </TouchableOpacity>
            {/* <Image 
                style={styles.burgerMenu} 
                source={require("../assets/burgerMenu.png")}>
            </Image>
            <Image 
                style={styles.calendar} 
                source={require("../assets/calendar.png")}>
            </Image> */}
        </View>
        <Text style={styles.thankYou}>Your plants thank you!</Text>
        <View style={styles.waterCanContainer}>
            <Image 
                 style={styles.wateringCanPic}
                source={require("../assets/nutritionFlask.png")}>
            </Image>
        </View>
        <Text style={styles.selectText}>Select the plants you gave nutrition today.</Text>
        <View style={styles.scrollView}
              contentContainerStyle={{flexDirection:'row'}}>
            <FlatList 
                data={DATA}
                numColumns={3}
                columnWrapperStyle={styles.flatList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
         </View>
        <TouchableOpacity 
            style={styles.circle}
            onPress={() => Alert.alert('Plant has been watered')}>
            <Text>Save</Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
}


export default Watered;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7E9B6D',
        flex: 1,
    }, 
    symbols: {
        flexDirection: 'row',
    },
    burgerMenu: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20,  
    },
    calendar: {
        height: 30, 
        width: 30, 
        marginLeft: 290,
        marginTop: 20,  
    },
    thankYou: {
        color: '#fff',
        fontSize: 36, 
        top: 10, 
        textAlign: 'center', 
    },
    waterCanContainer: {
        height: 180, 
        width: 180, 
        top: 15, 
        backgroundColor: "#C4C4C4",
        alignSelf: 'center',
        borderRadius: 90, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCanPic: {
        width: '70%', 
        height: '70%', 
        alignSelf: 'center', 
        top: 10, 
    },
    selectText: {
        color: 'black', 
        alignSelf: 'center',
        top: 20, 
        fontSize: 20, 
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        top: '5%',
    },
    flatList: {
        padding: 15, 
        justifyContent: 'space-evenly', 
    },
    subPlant: {
        alignItems: 'center',
        top: '10%',
    },
    title: {
        color: 'white', 
        fontSize: 15,  
        alignSelf: 'center',
    },
    image: {
        height: 110, 
        width: 110, 
        top: '5%',  
    },
    circle: {
        height: 70, 
        width: 70, 
        backgroundColor: "#fff",
        left: "75%",
        borderRadius: 35, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
})