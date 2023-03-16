import Text from "react-native";
import * as Progress from "react-native-progress";
function ProgressBar({spec}){
    let colourScheme ={
        "attack": ["#33ccff"],
        "health": ["red"],
        "defence": ["#cc33ff"]
    }

    return (
        <Progress.Bar
          progress={0.2}
          width={200}
          color= {colourScheme[spec][0]}
          height={20}
          borderRadius={10}
        />
    )
}
export default ProgressBar;