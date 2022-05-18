import { View, Text, Image } from "react-native";
import { React, useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

function logOut(props) {
    AsyncStorage.setItem("inloggad", "false")
    AsyncStorage.setItem("MyName", "")
    props.navigation.navigate("ProfileDrawer", { screen: "LogIn" })
}
const CustomDrawer = (props) => {
    const [logd, setLogd] = useState("");
    useEffect(async () => {
        AsyncStorage.getItem("inloggad").then(value =>
            setLogd(value)
        );
    }), []
    if (logd == "true") {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#7E9B6D", flex: 1 }}>
                    <Image source={require("../assets/onlyPlant.png")} style={{ marginLeft: "30%", marginTop: 10, tintColor: "#000" }} />
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <View style={{ padding: 20, borderTopWidth: 2, borderTopColor: "#000000", backgroundColor: "#7E9B6D", paddingVertical: 30 }}>
                    <TouchableOpacity onPress={() => logOut(props)}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50, marginLeft: 50 }}>
                            <Ionicons
                                title={"Logout"}
                                name={"log-out-outline"}
                                size={35}
                                color={"black"}
                            />
                            <Text style={{ marginLeft: 25, color: "#000", fontSize: 20 }}>
                                Logout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#7E9B6D", flex: 1 }}>
                    <Image source={require("../assets/onlyPlant.png")} style={{ marginLeft: "30%", marginTop: 10, tintColor: "#000" }} />
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <View style={{ padding: 20, borderTopWidth: 2, borderTopColor: "#000000", backgroundColor: "#7E9B6D", paddingVertical: 30 }} />
            </View>
        )
    }
}

export default CustomDrawer