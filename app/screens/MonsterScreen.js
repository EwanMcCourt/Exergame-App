import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import ProgressBar from "./ProgressBar";
import { useEffect, useState, useContext } from "react";
import CountContext from "./CountContext";


const backgroundimage = {
  uri: "https://cdn.pixabay.com/photo/2016/03/06/06/42/low-poly-1239778_960_720.jpg",
};



function MonsterScreen({ navigation }) {
  // const clearStorage = async ()=>{
  //     await AsyncStorage.removeItem("attackProgress")
  //     await AsyncStorage.removeItem("healthProgress")
  //     await AsyncStorage.removeItem("defenceProgress")
  // }
  const {count, setCount} = useContext(CountContext);
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Async Storage cleared successfully.');
    } catch (error) {
      console.log('Error clearing Async Storage: ', error.message);
    }
  };
  [currentProgress, setCurrentProgress] = useState({
    attack: 0,
    health: 0,
    defence: 0,
  });
  //levels
  const [hLevel, setHLevel] = useState(1);
  const [aLevel, setALevel] = useState(1);
  const [dLevel, setDLevel] = useState(1);
  //costs
  const [hCost, setHCost] = useState(1000);
  const [aCost, setACost] = useState(1000);
  const [dCost, setDCost] = useState(1000);
  //buttons
  const [hButton, setHButton] = useState(false);
  const [aButton, setAButton] = useState(false);
  const [dButton, setDButton] = useState(false);
  const [hBTitle, setHBTitle] = useState("Buy");
  const [aBTitle, setABTitle] = useState("Buy");
  const [dBTitle, setDBTitle] = useState("Buy");
  
  const storeProgress = async () => {
    try {
      
      await AsyncStorage.setItem("@levelH", currentProgress.health.toString());
      await AsyncStorage.setItem("@levelA", currentProgress.attack.toString());
      await AsyncStorage.setItem("@levelD", currentProgress.defence.toString());
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadProgress = async () => {
    try {
      const valueH =  AsyncStorage.getItem("@levelH");
      const valueA =  AsyncStorage.getItem("@levelA");
      const valueD =  AsyncStorage.getItem("@levelD");
      const [valueh, valuea, valued] = await Promise.all([valueH,valueA,valueD]);
      if ((valueh !== null) && (valuea !== null) && (valued !== null)) {
        setCurrentProgress({attack: parseFloat(valuea), health: parseFloat(valueh),defence: parseFloat(valued)});
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadLevels = async () => {
    try {
      const levelH =  AsyncStorage.getItem("@levelh");
      const levelA =  AsyncStorage.getItem("@levela");
      const levelD =  AsyncStorage.getItem("@leveld");
      const [valueh, valuea, valued] = await Promise.all([levelH,levelA,levelD]);
      if ((valueh !== null) && (valuea !== null) && (valued !== null)) {
        setALevel(parseInt(valuea));
        setHLevel(parseInt(valueh));
        setDLevel(parseInt(valued));
      }
    } catch (error){
      console.log("error: ", error.message);
    }
  };

  const storeLevels = async () => {
    try {
      
      await AsyncStorage.setItem("@levelh", hLevel.toString());
      await AsyncStorage.setItem("@levela", aLevel.toString());
      await AsyncStorage.setItem("@leveld", dLevel.toString());
    } catch (error) {
      console.log("error: ", error.message);
    }

  };







  const upgradeHealth = () => {
    if (count >= hCost){
    setCount(count - hCost)
    setHLevel(hLevel + 1);
    setCurrentProgress({attack: currentProgress.attack,health: currentProgress.health + 0.25,defence: currentProgress.defence});
  } 

  };
  const upgradeAttack = () => {
    if (count >= aCost){
      
      setCount(count - aCost)
      setALevel(aLevel + 1);
      setCurrentProgress({attack: currentProgress.attack + 0.25 ,health: currentProgress.health,defence: currentProgress.defence});
    }
  };
  const upgradeDamage = () => {
    if (count >= dCost){
      
      setCount(count - dCost)
      setDLevel(dLevel + 1);
      setCurrentProgress({attack: currentProgress.attack,health: currentProgress.health,defence: currentProgress.defence + 0.25});
    }
  };
  useEffect(() => {
    if (hLevel < 5 ){
      setHCost(hLevel*1000);
    } else 
    {setHCost("Complete");
     setHButton(true);
     setHBTitle("Complete");}
    if (dLevel < 5 ){setDCost(dLevel*1000);} else 
    {setDCost("Complete");
    setDButton(true);
    setDBTitle("Complete");}
    if (aLevel < 5 ){setACost(aLevel*1000);} else 
    {setACost("Complete");
    setAButton(true);
    setABTitle("Complete");}
  }, [hLevel,aLevel,dLevel]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      storeProgress();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [currentProgress]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      storeLevels();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [hLevel,aLevel,dLevel]);
  useEffect(() => {
    loadProgress();
    loadLevels();
  }, []);
  return (
    <ImageBackground
      source={backgroundimage}
      fadeDuration={1000}
      style={styles.container}
    >
      <Text style={styles.text}>Points: {count}</Text>
      
      <ScrollView style={styles.scrollView}>
        {/* <Button onPress={clearStorage()} title = "clear"/> */}
        <ProgressBar spec="health" currentProgress={currentProgress.health} />
        <ProgressBar spec="attack" currentProgress={currentProgress.attack} />
        <ProgressBar
          spec="defence"
          currentProgress={currentProgress.defence}
        />
        <View style={styles.container100}>
          <Text style={{ color: 'white', fontSize:20,fontWeight: 'bold' }}>Health</Text>
          <Text style={{ color: 'white' }}>Cost: {hCost}</Text>
          <Text style={{ color: 'white' }}>Level: {hLevel}/5</Text>
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Button title={hBTitle} onPress={() => upgradeHealth()} disabled = {hButton} />
          </View>
        </View>
        
        <View style={styles.container101}>
          <Text style={{ color: 'white', fontSize:20,fontWeight: 'bold' }}>Attack</Text>
          <Text style={{ color: 'white' }}>Cost: {aCost}</Text>
          <Text style={{ color: 'white' }}>Level: {aLevel}/5</Text>
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Button title={aBTitle} onPress={() => 
              upgradeAttack()
              } disabled = {aButton} />
          </View>
        </View>
        <View style={styles.container102}>
          <Text style={{ color: 'white', fontSize:20,fontWeight: 'bold' }}>Defence</Text>
          <Text style={{ color: 'white' }}>Cost: {dCost}</Text>
          <Text style={{ color: 'white' }}>Level: {dLevel}/5</Text>
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Button title={dBTitle} onPress={() => upgradeDamage()} disabled = {dButton} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
            }
const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: "white",
  },
  container: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 10,
    alignItems: "center",
  },
  headers: {
    width: 75,
    height: 75,

    
   
    borderBottomWidth: 1.5,
    borderBottomColor: 'white',

    marginLeft: "5%",
    marginRight: "5%",

    alignItems: "center",
    justifyContent: "center",
  },

  upgradeButton: {
    width: 75,
    height: 75,

    margin: "5%",

    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,
  },
  upgradeContainer1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },

  upgradeContainer2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 35,
    left: 10,
  },

  scrollView: {
    width:"80%",
    height:"100%",
    
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    borderBottomColor: "white",
 
  },
  container100: {
    backgroundColor: 'red', 
    height: 100, 
    width: "100%", 
    marginTop: 20, 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5
  },
  container101: {
    backgroundColor: 'blue', 
    height: 100, 
    width: "100%", 
    marginTop: 20, 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5
  },
  container102: {
    backgroundColor: 'purple', 
    height: 100, 
    width: "100%", 
    marginTop: 20, 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5
  }
});
export default MonsterScreen;
