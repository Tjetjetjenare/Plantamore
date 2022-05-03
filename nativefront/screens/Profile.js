import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, Text, Alert, View, FlatList} from 'react-native';

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
    {
    title: 'Eigth Item',
    image: require("../assets/plus.png"), 
    id: "add", 
    },
];

const Item = ({ title, image,id, navigation }) => (
    <TouchableOpacity 
        onPress={()=>{
            if(id == "add"){
                navigation.navigate('CreateSub')
            }
            else{
            alert(id);
        }
        }}>
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image}
                source={image}> 
            </Image>
        </View>
    </TouchableOpacity>
  );

function Profile({navigation}) {

    const renderItem = ({ item }) => (
        <Item title={item.title} 
              image={item.image}
              id = {item.id}
              navigation = {navigation}
              
              /> );
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.symbols}>
                {/* <Image 
                    style={styles.burgerMenu} 
                    source={require("../assets/burgerMenu.png")}>
                </Image>
                <TouchableOpacity style = {{height:30,width:30} } onPress={() => {navigation.navigate('Calendar')}}>
                <Image 
                    style={styles.calendar} 
                    source={require("../assets/calendar.png")}>
                </Image>
                </TouchableOpacity> */}
            </View>
            <Text style={styles.userName}>Name</Text>
            <Image 
                style={styles.profilePic}
                source={require("../assets/profilePic.png")}></Image>
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
                onPress={() => Alert.alert('Watering can button pressed')}>
                <Image style={styles.wateringCan}
                        source={require("../assets/plantCare.png")}>  
                </Image>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Profile;

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
    userName: {
        color: '#fff',
        fontSize: 36, 
        textAlign: 'center', 
        marginTop: 10
    },
    profilePic: {
        width: 250, 
        height: 250, 
        alignSelf: 'center', 
        top: 10, 
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        top: '5%',
        paddingBottom: 100,
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
        height: 80, 
        width: 80, 
        backgroundColor: "#C4C4C4",
        bottom: 20, 
        right: 20,
        borderRadius: 50, 
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
})
