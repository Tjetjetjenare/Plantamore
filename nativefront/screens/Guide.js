import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import * as guideText from '../assets/guideText.json'


export default function Guide({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.symbols}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons
                  style={{ marginLeft: 10 }}
                  name="close-outline"
                  color="black"
                  size={35}
              />
          </TouchableOpacity>
      </View>
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
          <Text style={styles.body}>{guideText.water3}</Text>
          <Text style={styles.body}>{guideText.water2}</Text>
          <Text style={styles.body}>{guideText.water1}</Text>
          <Text style={styles.headline2}>Nutrition:</Text>
          <Text style={styles.body}>{guideText.nutri3}</Text>
          <Text style={styles.body}>{guideText.nutri2}</Text>
          <Text style={styles.body}>{guideText.nutri1}</Text>      
          <Text style={styles.headline2}>Sun:</Text>
          <Text style={styles.body}>{guideText.sun5}</Text>
          <Text style={styles.body}>{guideText.sun4}</Text>
          <Text style={styles.body}>{guideText.sun3}</Text>
          <Text style={styles.body}>{guideText.sun2}</Text>
          <Text style={styles.body}>{guideText.sun1}</Text> 
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
  header: { 
    fontSize: 35, 
    fontWeight: 'bold', 
    marginTop: 30, 
    textAlign:"center",
  },
  headline1:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  headline2:{
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  body:{
    fontSize: 13,
  },
  symbols: {
    flexDirection: 'row',
  },
  imgwrap:{
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
  logo:{
    height: "75%",
    resizeMode: "contain",
  },
  pt1:{
    backgroundColor: '#7E9B6D',
    padding:15,
  },
  pt2:{
    backgroundColor: '#95b881',
    padding:15,
  },
  pt3:{
    backgroundColor: '#a7cf91',
    padding:15,
  },

})