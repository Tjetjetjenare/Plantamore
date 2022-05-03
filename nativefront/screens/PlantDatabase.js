import {React, useState} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, Alert} from 'react-native';




function PlantDatabase(props) {
    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Plant database</Text>
        
        </SafeAreaView>
    );
}

export default PlantDatabase;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#7E9B6D',
        flex: 1,
        alignItems: 'center', 
    }, 
    title: {
        fontSize: 36, 
        color: '#fff', 
        
    },
}
)