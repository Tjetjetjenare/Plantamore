import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView,Platform, TextInput, TouchableOpacity, Alert } from 'react-native';
import StandardButton from '../components/StandardButton';
import axios from "axios"
import Constants from "expo-constants";

var userbaseUrl = null;

if(Platform.OS === "android"){ userbaseUrl = 'http://10.0.2.2:8000/api/users/';}
else{  userbaseUrl = 'http://127.0.0.1:8000/api/users/';}

function SignUp({navigation}) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const onChangeNameHandler = (fullName) => {
      setFullName(fullName);
    };
  
    const onChangeEmailHandler = (email) => {
      setEmail(email);
    };
    const onChangePasswordHandler = (password) => {
        setPassword(password);
      };
    const onSubmitFormHandler = async (event) => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
        alert("Name or Email is invalid");
       return;
    }
    setIsLoading(true);
    try {
        let data ={
            username: fullName,
            email: email,
            password: password,
          }
        const response = await axios.post(userbaseUrl, data,{'Content-Type': 'application/json'});
        if (response.status === 201) {
        alert(' You have created an acount!');
        setIsLoading(false);
        setFullName('');
        setEmail('');
        setPassword('');
        } else {
        throw new Error("An error has occurred");
        }
    } catch (error) {
        alert("This email is already registered. Pick another email.");
        console.log("username: ",fullName,"email: ", email,"pass: ", password)
        setIsLoading(false);
    }
    };
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar style="auto"/>
                <TouchableOpacity onPress={() => {navigation.navigate('Home')}} style={styles.arrowContainer}>
                    <Image 
                        style={styles.arrowContainer} 
                        source={require("../assets/backArrow.png")} >
                    </Image>
                </TouchableOpacity>
            <Text 
                style= {styles.header}>
                Create account
            </Text>
            <TextInput
                style = {styles.inputName}
                placeholder = "Name"
                value={fullName}
                placeholderTextColor={"#908E8E"}
                editable={!isLoading}
                onChangeText={onChangeNameHandler}>
            </TextInput>
            <TextInput
                style = {styles.inputName}
                placeholder = "Email"
                value={email}
                editable={!isLoading}
                placeholderTextColor={"#908E8E"}
                onChangeText={onChangeEmailHandler}>
                
            </TextInput>
            
            <TextInput
                style = {styles.inputName}
                placeholder = "Password"
                value={password}
                editable={!isLoading}
                placeholderTextColor={"#908E8E"}
                onChangeText={onChangePasswordHandler}>

            </TextInput>
            <View style={styles.signUpWrap}>
                <StandardButton sizeFont={20} title="Sign Up" functionOnPress={onSubmitFormHandler}/>
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
        marginLeft: 15,
        marginTop: 10,  
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