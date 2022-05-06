import { View, Text, ImageBackground, Image } from 'react-native'
import {React, useState} from 'react'
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogIn from '../screens/LogIn';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
//const [existingUsers, setExistingUsers] = useState("");


function logOut(props){
    AsyncStorage.setItem("inloggad", "false")
    AsyncStorage.setItem("MyName", "")
    props.navigation.navigate('Home')
}
const CustomDrawer = (props) => {
  return (
    <View style={{flex:1}}> 
    
        <DrawerContentScrollView {...props} 
            contentContainerStyle ={{backgroundColor: '#7E9B6D', flex:1}}> 
            <Image source={require('../assets/onlyPlant.png')} style={{marginLeft: '30%', marginTop:10, tintColor:'#000'}}/> 
        <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <View style={{padding:20, borderTopWidth:2, borderTopColor:'#000000', backgroundColor: '#7E9B6D', paddingVertical:30}}>
            <TouchableOpacity onPress={() => logOut(props)}> 
                <View style={{flexDirection:'row', alignItems:'center', marginBottom:50, marginLeft:50}}>
                    <Ionicons 
                        title={'Logout'}
                        name={'log-out-outline'}
                        size={35}
                        color={'black'} 
                        />
                    <Text style={{marginLeft:25, color:'#000', fontSize: 20}}>Logout</Text>
                </View>
            </TouchableOpacity> 
                {/* <View style={{flexDirection:'row', alignItems:'center'}}> 
                    <Text> Plantamore</Text>
                </View> */}
        </View>

    </View>
  )
}

export default CustomDrawer