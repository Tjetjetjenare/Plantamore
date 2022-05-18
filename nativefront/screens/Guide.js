import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import * as guideText from '../assets/guideText.json'

export default function Guide({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <ScrollView>
        <Text style={styles.header}>Your guide to</Text>
        <View style={styles.imgwrap}>
           <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
        </View>
        <View style={styles.pt1}>
          <Text style={styles.headline1}>About PLANTAMORE</Text>
          <Text style={styles.body}>{guideText.about}</Text>      
        </View>
        <View style={styles.pt2}>
          <Text style={styles.headline1}>Terminology</Text>
          <Text style={styles.body}>{guideText.terms}</Text>
          <Text style={styles.headline2}>Water:</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['water3.1']}</Text>{guideText['water3.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['water2.1']}</Text>{guideText['water2.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['water1.1']}</Text>{guideText['water1.2']}</Text>
          <Text style={styles.headline2}>Nutrition:</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['nutri3.1']}</Text>{guideText['nutri3.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['nutri2.1']}</Text>{guideText['nutri2.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['nutri1.1']}</Text>{guideText['nutri1.2']}</Text>
          <Text style={styles.headline2}>Sun:</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['sun5.1']}</Text>{guideText['sun5.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['sun4.1']}</Text>{guideText['sun4.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['sun3.1']}</Text>{guideText['sun3.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['sun2.1']}</Text>{guideText['sun2.2']}</Text>
          <Text style={styles.body}><Text style={styles.phrases}>{guideText['sun1.1']}</Text>{guideText['sun1.2']}</Text>
        </View>
        <View style={styles.pt3}>
          <Text style={styles.headline1}>Disclaimer</Text>
          <Text style={styles.body}>{guideText.disc}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#7E9B6D',
  },
  body:{
    fontSize: 13,
  },
  header: { 
    fontSize: 35, 
    fontWeight: 'bold', 
    marginTop: 30, 
    textAlign:"center",
  },
  headline1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headline2: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  imgwrap: {
    width: "80%", 
    height: 140,
    borderRadius:20,
    backgroundColor:"#fff",
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',  
    paddingRight: 20,
    marginTop:30,
    marginBottom:30,
  },
  logo: {
    height: "75%",
    resizeMode: "contain",
  },
  phrases: {
    fontWeight: 'bold',
  },
  pt1: {
    backgroundColor: '#7E9B6D',
    padding:15,
  },
  pt2: {
    backgroundColor: '#95b881',
    padding:15,
  },
  pt3: {
    backgroundColor: '#A7CF91',
    padding:15,
  },
  symbols: {
    flexDirection: 'row',
  },
})
