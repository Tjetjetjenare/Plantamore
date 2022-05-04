import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";


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
      <ScrollView>
        <StatusBar style="auto"/>
        <Text style={styles.header}>Guide</Text>
        <Text style={styles.headline}>How to use PLANTAMORE</Text>
        <Text style={styles.headline}>Terminology</Text>
        <Text style={styles.headline}>Disclaimer</Text>
        <Text style={styles.body}>
          This application is ment to help 
        </Text>
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
    marginTop: 20, 
    marginBottom: 20,
    textAlign:"center",
  },
  headline:{
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  symbols: {
    flexDirection: 'row',
},

})
