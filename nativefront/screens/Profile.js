import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, Text, Alert, View, ScrollView, FlatList} from 'react-native';

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
    title: 'Third Item',
    image: require("../assets/testPlant.png"), 
    id: 2, 
    },
    {
    title: 'Third Item',
    image: require("../assets/testPlant.png"), 
    id: 2, 
    },
    {
    title: 'Third Item',
    image: require("../assets/testPlant.png"), 
    id: 2, 
    },
    {
    title: 'Third Item',
    image: require("../assets/testPlant.png"), 
    id: 2, 
    },
    {
    title: 'Third Item',
    image: require("../assets/plus.png"), 
    id: "add", 
    },
];

const onClick = () => (
    alert('Log in button pressed')
);

const Item = ({ title, image }) => (
    <TouchableOpacity 
        functionOnPress={onClick}>
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image}
                source={image}> 
            </Image>
        </View>
    </TouchableOpacity>
  );

function Profile(props,{navigation}) {

    const renderItem = ({ item }) => (
        <Item title={item.title} 
              image={item.image}
              /> )
  
    return (
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.burgerMenu} 
                source={require("../assets/burgerMenu.png")}>
            </Image>
            <Text style={styles.userName}>Name</Text>
            <Image 
                style={styles.profilePic}
                source={require("../assets/profilePic.png")}></Image>
            <View style={styles.scrollView}
                  contentContainerStyle={{flexDirection:'row'}}>
                <FlatList 
                    contentContainerStyle={{alignItems: 'center'}}
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
                        source={require("../assets/wateringCan.png")}>  
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
    burgerMenu: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20,  
    },
    userName: {
        color: '#fff',
        fontSize: 36, 
        textAlign: 'center', 
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
        height: 100, 
        width: 100, 
        backgroundColor: "#C4C4C4",
        left: "60%",
        borderRadius: 50, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
})
