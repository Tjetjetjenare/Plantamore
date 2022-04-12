import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ImageBackground, Button, Alert } from 'react-native';
import { Row } from 'reactstrap';


function SignUp(props) {

    return (
        <SafeAreaView style={styles.background}>
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
            <View
                style={styles.termsAndConditions}>
                <Text 
                    style = {styles.termsText}
                    >I agree with the 
                    <Button 
                        style = {styles.termsButton}
                        title="ToC"
                        onPress={() => Alert.alert("ToC", "You have accepted the ToC")}
                    ></Button>
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
        margin: 20, 
        alignSelf: "center",
    },

    termsText: {
        fontSize: 20,
    },

    termsButton: {
        alignItems: "center", 
        justifyContent: "center", 
    },

    baseContainer: {
        flex: 3, 
        alignItems: 'center',
        justifyContent: "center", 
      },
      

})