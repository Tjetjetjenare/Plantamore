import React from 'react';
import { TextInput, View, StyleSheet} from 'react-native';

const SearchField = () => {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.bar} 
                placeholder='Search' 
                onChangeText={(text) => {searchFilterFunction(text)}}
                placeholderTextColor={"white"}
            />
        </View>
    )
}

export default SearchField;

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
    },
    container: {
        width: "90%",
        height: 50,
        opacity: 1,
    },
})