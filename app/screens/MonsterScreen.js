import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';

const backgroundimage = {uri: "https://cdn.pixabay.com/photo/2016/10/22/01/54/wood-1759566_960_720.jpg"};



function MonsterScreen({ navigation }) {
    return (
        <ImageBackground  
        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
               
                <Text style = {styles.text}> This is the monster screen </Text>
            </View>
            
        </ImageBackground> 
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        fadeDuration: 1000,
        justifyContent: "flex-end",
        alignItems:"center",
        
    },
  
    logo:{
        width:100,
        height:100,
        alignItems:"center",
        
        
        
    },
    text:{
        color:"white",
    },
    titleContainer:{
        position: "absolute",
        top: 30,
    },
})
export default MonsterScreen;