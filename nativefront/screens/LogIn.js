import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, Alert } from "react-native";
import StandardButton from "../components/StandardButton";
import axios from "axios";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

var userbaseUrl = null;
if (Platform.OS === "android") { userbaseUrl = "http://10.0.2.2:8000/api/users/"; }
else { userbaseUrl = "http://127.0.0.1:8000/api/users/"; }

function LogInScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [existingUsers, setExistingUsers] = useState("");
    const [isSecurePassword, setIsSecurePassword] = useState(true);
    const isFocused = useIsFocused();
    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };
    const onChangePasswordHandler = (password) => {
        setPassword(password);
    };
    const onSubmitFormHandler = (async) => {
        let max = existingUsers.length;
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Email or password is invalid. Please try again.");
            return;
        }
        setIsLoading(true);
        try {
            for (let i = 0; i < max; i++) {
                if (existingUsers[i].email == email) {
                    if (existingUsers[i].password == password) {
                        AsyncStorage.setItem("inloggad", "true");
                        AsyncStorage.setItem("propic", "" + existingUsers[i].profile_picture);
                        AsyncStorage.setItem("MyName", existingUsers[i].username);
                        setIsLoading(false);
                        navigation.navigate("ProfileDrawer", { screen: "Profile" })
                        return;
                    }
                    else {
                        Alert.alert("Error", "Please try again! The password does not seem to match the email.");
                        setIsLoading(false);
                        return;
                    }
                }
            }
            Alert.alert("Error", "There is no user with these credentials");
            setIsLoading(false);
        }
        catch (error) {
            Alert.alert("Error", "An error has occurred, please try again");
            setIsLoading(false);
        }
    };
    useEffect(async () => {
        try {
            const response = await axios.get(
                userbaseUrl,
            );
            setExistingUsers(response.data);
        }
        catch (error) {
        }
    }, [isFocused]);
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar style="auto" />
            <Text style={styles.header}>
                Log in
            </Text>
            <View style={styles.placeholderContainer}>
                <TextInput
                    style={styles.inputName}
                    placeholder="Email"
                    mode="outlined"
                    theme={{ roundness: 30, colors: { primary: "black" } }}
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
                    theme={{ roundness: 30, colors: { primary: "black" } }}
                    onChangeText={onChangePasswordHandler}
                    secureTextEntry={isSecurePassword}
                    editable={!isLoading}
                    placeholderTextColor={"#908E8E"}
                    place
                    right={
                        <TextInput.Icon onPress={() => { setIsSecurePassword((prev) => !prev) }} size={30} name={!isSecurePassword ? "eye-outline" : "eye-off-outline"} />
                    }
                />
            </View>
            <View style={styles.loginWrap}>
                <StandardButton sizeFont={20} title="Log in" functionOnPress={onSubmitFormHandler} />
            </View>
            <Text style={styles.accountText}>
                Don"t have an account yet?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpButton}>
                    Sign up
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default LogInScreen;

const styles = StyleSheet.create({
    accountText: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: "center",
        fontSize: 20,
    },
    arrowContainer: {
        height: 30,
        width: 30,
        marginLeft: 15,
        marginTop: 10,
    },
    background: {
        backgroundColor: "#7E9B6D",
        flex: 1,
    },
    header: {
        marginLeft: 35,
        fontSize: 35,
        fontWeight: "bold",
        marginTop: 40,
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
    },
    inputName: {
        marginTop: -10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        height: 50,
        width: 360,
    },
    loginWrap: {
        marginTop: 50,
        alignSelf: "center",
        width: "60%",
        height: 40,
        margin: 10,
    },
    placeholderContainer: {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        height: 50,
        width: 360,
        alignItems: "center"
    },
    signUpButton: {
        textDecorationLine: "underline",
        alignSelf: "center",
        fontSize: 20,
    },
})
