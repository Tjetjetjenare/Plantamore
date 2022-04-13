import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import StandardButton from '../components/StandardButton';


function SignUp(props) {

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar style="auto"/>
            <Image 
                style={styles.arrowContainer} 
                source={require("../assets/backArrow.png")}>
            </Image>
            <Text 
                style= {styles.header}>
                Create account
            </Text>
            <TextInput
                style = {styles.inputName}
                placeholder = "Name"
                placeholderTextColor={"#908E8E"}>
            </TextInput>
            <TextInput
                style = {styles.inputName}
                placeholder = "Email"
                placeholderTextColor={"#908E8E"}>
            </TextInput>
            
            <TextInput
                style = {styles.inputName}
                placeholder = "Password"
                placeholderTextColor={"#908E8E"}>
                <Image
                    style ={styles.eye}
                    source={require("../assets/eye.png")}>
                </Image> 
            </TextInput>
            <View style={styles.signUpWrap}>
                <StandardButton sizeFont={20} title="Sign Up" functionOnPress={() => Alert.alert("Sign up", "You've pressed the sign up button")}/>
            </View>
            <View style={styles.termsAndConditions}>
                <Text style={{justifyContent:'flex-end'}}>I agree with the
                    <TouchableOpacity onPress={() => Alert.alert("ToC", "You have agreed to the terms of condition")}>
                        <Text style={styles.tocText}> Terms of Condition</Text>
                    </TouchableOpacity>
                </Text>
            </View>

        </SafeAreaView>
    );
}

export default SignUp;

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

    eye: {
        position: 'absolute', 
    },

    termsAndConditions: {
        alignSelf: "center",
        fontSize: 20,
        flexDirection:"row",
    },

    baseContainer: {
        flex: 3, 
        alignItems: 'center',
        justifyContent: "center", 
      },
    
    signUpWrap:{
        alignSelf: 'center',
        width: "60%",
        height: 40,
        margin: 40,
    },
    tocText: {
        textDecorationLine: 'underline',
    }
      

})