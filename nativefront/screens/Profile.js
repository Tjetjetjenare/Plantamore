import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, Text, Alert, View, FlatList } from 'react-native';


function Profile(props) {
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

            <TouchableOpacity 
                style={styles.circle}
                onPress={() => Alert.alert('Watering can button pressed')}>
                <Image style={styles.wateringCan}
                        source={require("../assets/wateringCan.png")}>  
                </Image>
            </TouchableOpacity>

            <FlatList
                contentContainerStyle={styles.grid}
                numColumns={3}
                data={props.items}
                keyExtractor={(item, index) => index.toString()}
                renderItems={({item}) => {
                    console.log(item);
                    return <Text style={styles.item}>{item}</Text>
             }
               }
               
            />
            
            
            
            <Text> Bla bla</Text>
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
        width: 300, 
        height: 300, 
        alignSelf: 'center', 
        top: 10, 
    },
    circle: {
        height: 100, 
        width: 100, 
        backgroundColor: "#C4C4C4",
        top: 200, 
        left: "60%",
        borderRadius: 50, 
        justifyContent: "center",
        alignItems: "center",
    },
    wateringCan: {
        height: "70%",
        width: "70%",
    },
    item: {
        backgroundColor: 'grey',
        width: 90, 
        color: 'white',
    }, 
    grid: {
        height: 120, 
        alignItems: 'center', 
    }
})