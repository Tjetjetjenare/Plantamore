import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, FlatList, StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import StandardButton from "../components/StandardButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

var plantbaseUrl = null;
if (Platform.OS === "android") { plantbaseUrl = "http://10.0.2.2:8000/api/plants/"; }
else { plantbaseUrl = "http://127.0.0.1:8000/api/plants/"; }

function Home({ navigation }) {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [logd, setLogd] = useState("");
  const isFocused = useIsFocused();
  useEffect(async () => {
    if (isFocused) {
      AsyncStorage.getItem("inloggad").then(value =>
        setLogd(value)
      );
    }
    try {
      const response = await axios.get(
        plantbaseUrl,
      );
      setFilteredDataSource(response.data);
      setMasterDataSource(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }, [logd, isFocused]);
  const SearchField = () => {
    return (
      <View style={styles.container2}>
        <TextInput
          style={styles.bar}
          placeholder="Search"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholderTextColor={"white"}
        />
      </View>
    )
  }
  const SearchList = () => {
    if (search.length < 1) {
      return
    }
    else {
      return (
        <View style={styles.scroll}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      )
    }
  };
  const ButtonWrap = () => {
    if (logd == "false") {
      return (
        <View style={styles.buttonWrapper}>
          <View style={styles.loginWrap}>
            <StandardButton sizeFont={20} title="Log in" functionOnPress={() => navigation.navigate("ProfileDrawer", { screen: "LogIn" })} />
          </View>
          <View style={styles.loginWrap}>
            <StandardButton sizeFont={20} title="Sign up" functionOnPress={() => navigation.navigate("ProfileDrawer", { screen: "SignUp" })} />
          </View>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity onPress={() => navigation.navigate("GuideMain")} style={styles.careGuideOPA}>
          <Ionicons style={styles.careGuideIcon} name="information-circle-outline" size={28} color={"#FFF"} />
          <Text style={styles.careGuideButton}>Care Guide</Text>
        </TouchableOpacity>
      )
    }
  }
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.english_name
          ? item.english_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    }
    else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.english_name.toUpperCase()}
        </Text>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  const getItem = (item) => {
    navigation.navigate("PlantDBHomePath", {
      plantId: item.p_id, EnglishName: item.english_name, LatinName: item.latin_name,
      SwedishName: item.swedish_name, Description: item.description, Sun: item.sunlight, Water: item.water,
      Nutrition: item.nutrition, ImageUrl: item.image_url
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.greenAccent} />
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.searchContainer}>
        {SearchField()}
        {SearchList()}
      </View>
      {ButtonWrap()}
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
    opacity: 0.4,
    position: "absolute",
    top: 20,
  },
  burgerMenu: {
    height: 30,
    width: 30,
    position: "absolute",
    top: 20,
    left: 20,
  },
  buttonWrapper: {
    alignItems: "center",
    position: "absolute",
    top: 390,
  },
  careGuideButton: {
    textDecorationLine: "underline",
    fontSize: 27,
    color: "#fff",
    alignSelf: "center",
  },
  careGuideIcon: {
    top: 35,
    left: -30,
  },
  careGuideOPA: {
    textDecorationLine: "underline",
    fontSize: 23,
    top: 180,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    width: "90%",
    height: 50,
    opacity: 1,
  },
  container3: {
    flex: 1,
    backgroundColor: "#fff",
  },
  greenAccent: {
    position: "absolute",
    top: 312,
    bottom: -100,
    width: "300%",
    height: "100%",
    backgroundColor: "#7E9B6D",
    transform: [{ rotate: "-30deg" }],
  },
  item: {
    padding: 5,
    marginHorizontal: 10,
    opacity: 2,
  },
  itemStyle: {
    padding: 5,
    margin: 5,
    color: "white"
  },
  loginWrap: {
    width: "200%",
    height: 40,
    marginTop: 20,
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    position: "absolute",
    top: 0,
  },
  profileButton: {
    height: 30,
    width: 30,
    position: "absolute",
    top: 20,
    right: 20,
  },
  scroll: {
    height: "280%",
    width: "90%",
    marginTop: 51,
    borderRadius: 20,
    textAlign: "center",
    opacity: 1,
    position: "absolute",
    top: 20,
    backgroundColor: "gray",
  },
  searchContainer: {
    width: "95%",
    alignItems: "center",
    position: "absolute",
    top: 200,
  },
})