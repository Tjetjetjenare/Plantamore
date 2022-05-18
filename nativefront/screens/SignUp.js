import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import StandardButton from '../components/StandardButton';
import axios from "axios"
import { TextInput } from 'react-native-paper';

var userbaseUrl = null;

if (Platform.OS === "android") { userbaseUrl = 'http://10.0.2.2:8000/api/users/'; }
else { userbaseUrl = 'http://127.0.0.1:8000/api/users/'; }

function SignUp({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSecurePassword, setIsSecurePassword] = useState(true)
    const [existingUsers, setExistingUsers] = useState({})

    useEffect(async () => {
        try {
            const response = await axios.get(
                userbaseUrl,
            );
            setExistingUsers(response.data);
        } catch (error) {
            // handle error
        }
    }, []);
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
            Alert.alert("Error", "The name or email is invalid. Make sure that under 50 characters and that you have used a valid email");
            return;
        }
        setIsLoading(true);
        try {
            var id = parseInt(existingUsers[existingUsers.length - 1].u_id) + 1
            var str = "" + id
            var pad = "000"
            var ans = pad.substring(0, pad.length - str.length) + str
            let data = {
                u_id: ans,
                username: fullName,
                email: email,
                password: password,
                profile_picture: 1,

            }
            const response = await axios.post(userbaseUrl, data, { 'Content-Type': 'application/json' });
            if (response.status === 201) {
                //Alert.alert(' You have created an account!');
                navigation.navigate('ProfileDrawer', { screen: 'LogIn' })
                setIsLoading(false);
                setFullName('');
                setEmail('');
                setPassword('');

            } else {
                throw new Error("An error has occurred");
            }
        } catch (error) {
            Alert.alert("Error", "This email is already registered, please use another email");
            console.log("username: ", fullName, "email: ", email, "pass: ", password)
            setIsLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar style="auto" />

            <Text
                style={styles.header}>
                Create account
            </Text>
            <View style={styles.placeholderContainer}>
                <TextInput
                    style={styles.inputName}
                    placeholder="Name"
                    mode="outlined"
                    theme={{ roundness: 30, colors: { primary: 'black' } }}
                    value={fullName}
                    placeholderTextColor={"#908E8E"}
                    editable={!isLoading}
                    onChangeText={onChangeNameHandler}>
                </TextInput>
            </View>
            <View style={styles.placeholderContainer}>
                <TextInput
                    style={styles.inputName}
                    placeholder="Email"
                    mode="outlined"
                    theme={{ roundness: 30, colors: { primary: 'black' } }}
                    value={email}
                    onChangeText={onChangeEmailHandler}
                    editable={!isLoading}
                    placeholderTextColor={"#908E8E"}
                />
            </View>
            <View style={styles.placeholderContainer}>
                <TextInput
                    style={styles.inputName}
                    placeholder="Password"
                    value={password}
                    mode="outlined"
                    theme={{ roundness: 30, colors: { primary: 'black' } }}
                    onChangeText={onChangePasswordHandler}
                    secureTextEntry={isSecurePassword}
                    editable={!isLoading}
                    placeholderTextColor={"#908E8E"}
                    place
                    right={
                        <TextInput.Icon onPress={() => { setIsSecurePassword((prev) => !prev) }} size={30} name={!isSecurePassword ? "eye-outline" : "eye-off-outline"} />}
                />
            </View>
            <View style={styles.signUpWrap}>
                <StandardButton sizeFont={20} title="Sign up" functionOnPress={onSubmitFormHandler} />

            </View>
            <View style={styles.termsAndConditions}>
                <Text style={{ justifyContent: 'flex-end' }}>By signing up you agree to the
                    <TouchableOpacity onPress={() => Alert.alert("Terms and conditions", "PLANTAMORE is not responsible for the survival of your plants")}>
                        <Text style={styles.tocText}> Terms and conditions</Text>
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
    placeholderContainer: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        height: 50,
        width: 360,
        alignItems: "center"
    },

    inputName: {
        marginTop: -10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        height: 50,
        width: 360,
    },

    // inputName: {
    //     height: 50, 
    //     marginTop: 30, 
    //     marginLeft: 30,
    //     marginRight: 30,
    //     borderWidth: 1, 
    //     padding: 10, 
    //     backgroundColor: "#fff",
    //     borderRadius: 30, 
    //     fontSize: 20, 
    // }, 

    eye: {
        position: 'absolute',
    },

    termsAndConditions: {
        alignSelf: "center",
        fontSize: 20,
        flexDirection: "row",
    },

    baseContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: "center",
    },

    signUpWrap: {
        alignSelf: 'center',
        width: "60%",
        height: 40,
        margin: 40,
    },
    tocText: {
        textDecorationLine: 'underline',
        top: 2,
    }


})