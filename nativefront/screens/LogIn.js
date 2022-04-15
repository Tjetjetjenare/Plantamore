import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import StandardButton from '../components/StandardButton';
import axios from "axios"
const userbaseUrl = 'http://localhost:8000/api/users/';
function LogInScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [existingUsers, setExistingUsers] = useState("");

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };
    const onChangePasswordHandler = (password) => {
        setPassword(password);
    };
    const onSubmitFormHandler =  () => {
        let max = existingUsers.length;
        if (!email.trim() || !password.trim()) {
            alert("Name or Email is invalid");
           return;
        }
        setIsLoading(true);
        try {
            for (let i = 0; i < max; i++){
                console.log(i)
                if (existingUsers[i].email == email ) {
                    if(existingUsers[i].password == password){
                        alert("Inloggad!");
                        setIsLoading(false);
                        return;
                    }
                    else{
                        alert("Password does not match email!");
                        setIsLoading(false);
                        return;
                    }
                }
            }
            alert("Failure, you do not seem to exist");
            setIsLoading(false);
        } catch (error) {
            alert("An error has occurred");
            console.log("email: ", email ,"pass: ", password)
            setIsLoading(false);
        }
        };
        useEffect(async() => {
            try {
              const response = await axios.get(
               userbaseUrl,
              );
              setExistingUsers(response.data);
            } catch (error) {
              // handle error
            }
          },[]);

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
                value={email}
                onChangeText={onChangeEmailHandler}
                editable={!isLoading}
                placeholderTextColor={"#908E8E"}>
            </TextInput>
            <TextInput
                style = {styles.inputName}
                placeholder = "Password"
                value={password}
                onChangeText={onChangePasswordHandler}
                editable={!isLoading}
                placeholderTextColor={"#908E8E"}>
            </TextInput>
            <View style={styles.loginWrap}>
                <StandardButton sizeFont={20} title="Log in" functionOnPress={onSubmitFormHandler}/>
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
