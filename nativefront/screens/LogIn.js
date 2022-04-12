
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ImageBackground, Button, Alert } from 'react-native';

function LogInScreen(props) {
    return (
        <SafeAreaView style={styles.background}>
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
            <Text
                style = {styles.accountText}>
                Don't have an account yet?
            </Text>
            <Button
                style = {styles.termsButton}
                title="Sign Up"
                onPress={() => Alert.alert("Sign up", "You have pressed to sign up")}
           ></Button>

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

    termsButton: {
        textDecorationLine: 'underline',
    }
})
