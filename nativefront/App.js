import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import axios from "axios"
import Home from './screens/Home';
import PlantDBProfile from './screens/PlantDBProfile';



const plantbaseUrl = 'http://localhost:8000/api/students/';

export default function App() {
  
  return <PlantDBProfile/>;

}

