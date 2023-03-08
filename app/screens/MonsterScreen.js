import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';

const backgroundimage = {uri: "https://live.staticflickr.com/4242/35699339972_4ce24484ee_b.jpg"};
const icon = {uri:"https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png"};


function MonsterScreen({ navigation }) {
    return (
        <ImageBackground  
        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
                <Image style = {styles.logo} source = {icon}/>
                <Text> This is the monster screen </Text>
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

    titleContainer:{
        position: "absolute",
        top: 30,
    },
})
export default MonsterScreen;