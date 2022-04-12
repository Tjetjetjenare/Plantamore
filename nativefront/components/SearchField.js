import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

const SearchField = () => {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.bar} 
                placeholder='Search' 
                placeholderTextColor={"white"}/>
        </View>
    )
}

export default SearchField;

const styles = StyleSheet.create({
    container: {
        width:"90%",
        height:50,
        opacity: 1,
    },
    bar: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        color: "white",
        fontSize: 20,
        borderRadius: 20,
        textAlign: "center",
        opacity: 0.4,
    }
})