
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LogInScreen(props) {
    return (
        <View style={styles.container}>
            <Text>
            This is the login page
            </Text>
        </View>
    );
}

export default LogInScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
