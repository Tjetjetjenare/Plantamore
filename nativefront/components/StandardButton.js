import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

//Decide size of button by putting it in a View and set size of the View.

function StandardButton({functionOnPress, title, sizeFont}) {
    return (
        <TouchableOpacity style={styles.outer} onPress={functionOnPress}>
            <Text style={{textAlign: "center", fontSize: sizeFont}}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default StandardButton


 const styles = StyleSheet.create({
    outer:{
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        height: "100%",
        borderRadius: 20,
        justifyContent: "center",
        color: "black"
    },
})