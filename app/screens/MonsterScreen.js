import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';

const backgroundimage = {uri: "https://cdn.pixabay.com/photo/2016/03/06/06/42/low-poly-1239778_960_720.jpg"};



function MonsterScreen({ navigation }) {
    return (
        <ImageBackground  
        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
               
                <Text style = {styles.text}> This is the monster screen</Text>
                <Text style = {styles.text}> Coming soon ...</Text>
            </View>
            
        </ImageBackground> 
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        fadeDuration: 1000,
        justifyContent: "center",
        alignItems:"center",
        
    },
  
    logo:{
        width:100,
        height:100,
        alignItems:"center",
        
        
        
    },
    text:{
        fontSize: 24,
        color:"white",
    },
    titleContainer:{
        position: "absolute",
        justifyContent: "center",
        alignItems:"center",
        
    },
})
export default MonsterScreen;