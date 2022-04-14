import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import StandardButton from '../components/StandardButton';

function LogInScreen(props) {
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar style="auto"/>
            <Image 
                style={styles.arrowContainer} 
                source={require("../assets/backArrow.png")}>
            </Image>
            <Text 
                style= {styles.header}>
                Log in 
            </Text>
            <TextInput
                style = {styles.inputName}
                placeholder = "Email"
                placeholderTextColor={"#908E8E"}>
            </TextInput>
            <TextInput
                style = {styles.inputName}
                placeholder = "Password"
                placeholderTextColor={"#908E8E"}>
            </TextInput>
            <View style={styles.loginWrap}>
                <StandardButton sizeFont={20} title="Log in" functionOnPress={() => Alert.alert("Log In", "Log in button pressed")}/>
            </View> 
            <Text
                style = {styles.accountText}>
                Don't have an account yet?
            </Text>
            <TouchableOpacity onPress={() => Alert.alert("Sign up", "You have pressed to sign up")}>
                <Text style={styles.signUpButton}>Sign up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default LogInScreen;


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#7E9B6D',
        flex: 1, 
    }, 
        
    arrowContainer: {
        height: 30, 
        width: 30, 
        marginLeft: 30,
        marginTop: 20,  
    },

    header: {
        marginLeft: 35, 
        fontSize: 35, 
        fontWeight: 'bold', 
        marginTop: 40, 
    },

    inputName: {
        height: 50, 
        marginTop: 30, 
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 1, 
        padding: 10, 
        backgroundColor: "#fff",
        borderRadius: 30, 
        fontSize: 20, 
    }, 

    accountText: {
        marginTop: 20,
        marginLeft: 20, 
        marginRight: 20,  
        alignSelf: "center",
        fontSize: 20,  
    },

    loginWrap:{
        marginTop:40,
        alignSelf: 'center',
        width: "60%",
        height: 40,
        margin: 10,
    },

    signUpButton: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 20,
    }
})
