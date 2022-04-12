import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

function StandardButton({functionOnPress, title}) {
    return (
        <TouchableOpacity style={styles.outer} onPress={functionOnPress}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default StandardButton;

const styles = StyleSheet.create({
    outer:{
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        width: "30%",
        height: 30,
        borderRadius: 20,
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        fontSize:16,
        color: "black",
    }
})