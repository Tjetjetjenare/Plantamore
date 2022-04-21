import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Image, Text, Alert, View } from 'react-native';
import SearchField from '../components/SearchField';
import StandardButton from '../components/StandardButton';
function Home({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="auto"/>
        <View style={styles.greenAccent} />
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <SearchField/>
      <View style={styles.buttonWrapper}>
        <Text style={styles.text}>Log in to your existing account {"\n"}
              or {"\n"}Sign up to get started
        </Text>
        <View style={styles.loginWrap}>
          <StandardButton sizeFont={20} title="Log in" functionOnPress={() => navigation.navigate('Profile')} />
        </View>
        <View style={styles.loginWrap}>
          <StandardButton sizeFont={20} title="Sign up" functionOnPress={() => navigation.navigate('PlantSub')}/>
        </View>
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
    bottom: 100,
  },
  greenAccent:{
    position: "absolute",
    bottom:-100,
    width: "300%",
    height: "63%",
    backgroundColor: "#7E9B6D",
    transform: [{rotate: '-30deg'}]
  }, 
  loginWrap: {
    width: "70%",
    height: 40,
    marginTop: 20,
  }
})
