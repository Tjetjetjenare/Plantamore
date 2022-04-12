import React from 'react';
import { SafeAreaView, StyleSheet, Image, Text, Alert, TouchableOpacity, View } from 'react-native';
import SearchField from '../components/SearchField';

function Home(props) {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.greenAccent} />
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <SearchField/>
      <View style={styles.buttonWrapper}>
      <Text style={styles.text}>Log in to see your existing account {"\n"}
            or {"\n"}Sign up below to get started
      </Text>
      <TouchableOpacity style={styles.buttonOuter} onPress={() => Alert.alert('Sign up button pressed')}>
            <Text style={styles.buttonText}>
                Log in
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOuter} onPress={() => Alert.alert('Sign up button pressed')}>
            <Text style={styles.buttonText}>
                Sign up
            </Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
    
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: "80%",
    resizeMode: "contain",
    position:"absolute",
    top:100,
  },
  text:{
    textAlign: "center",
    fontSize: 16,
  }, 
  buttonWrapper: {
    alignItems: "center",
    position:"absolute",
    bottom: 80,
  },
  buttonOuter:{
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: 150,
    height: 30,
    borderRadius: 20,
    margin:5,
    justifyContent:"center",
  },
  buttonText: {
    textAlign: "center",
    fontSize:16,
    color: "black",
  },
  greenAccent:{
    position: "absolute",
    bottom:-100,
    width: "300%",
    height: "60%",
    backgroundColor: "#7E9B6D",
    transform: [{rotate: '-30deg'}]
  }
})
