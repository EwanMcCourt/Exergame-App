import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';


function SettingsScreen({ navigation }) {
    return (
         
       <View  style = {styles.background}>
         <TouchableHighlight style = {styles.logoutButton} underlayColor='#ff4d4d' onPress={() => navigation.navigate('Welcome')}> 
               
               
                  <Text style = {styles.buttonText}>
                      Logout
                  </Text>
               
                 
            </TouchableHighlight >
       </View>
        
    );
}const styles = StyleSheet.create({
    background:{
        flex:1,
        fadeDuration: 1000,
        justifyContent: "flex-end",
        alignItems:"center",
        
    },
    buttonText:{
        color: "white",
        fontSize: 30,
      
      
       
        
    },
    logoutButton:{
        width:"100%",
        height: 70,
        
        backgroundColor: "red",
        alignItems:"center",
        justifyContent: "center",
    },

})


export default SettingsScreen;