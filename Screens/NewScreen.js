import React from "react";
import { StyleSheet, Text, View, Share, FlatList} from "react-native";
import Share from 'react-native-share';
import colors from "../Components/colors";

export default function NewScreen({ route, navigation }) {
    const { itemId, title,category,description,weblink } = route.params;
    
 /* const onShare = async () => {
        try {
          const result = await Share.share({
            message: 'React Native | A framework for building native apps using React',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
     */
   return(
    <View style={styles.container}>
    <Text style={styles.titleStyle}>Details Screen</Text>
    <Text style={styles.textStyle}>2-title:</Text>
    <Text style={styles.anotherTextStyle}>{JSON.stringify(title)}</Text>
    <Text style={styles.textStyle}>3-category: </Text>
    <Text style={styles.anotherTextStyle}>{JSON.stringify(category)}</Text>
    <Text style={styles.textStyle}>4-description: </Text>
    <Text style={styles.anotherTextStyle}>{JSON.stringify(description)}</Text>
    <Text style={styles.textStyle}>5-weblink:</Text>
   <Text style={styles.item} onPress={Share.open(options)
                                         .then((res) => { console.log(res); })
                                         .catch((err) => { err && console.log(err); })}
                                         > {JSON.stringify(weblink)}</Text>
    </View>
   )
};
const styles = StyleSheet.create({
    container: {
       // marginTop: 20,
        flex: 1,
        backgroundColor: colors.Gray,
        alignItems: "center",
        justifyContent: "center",
        flexDirection:'column'
    },
    textStyle:{
        color:colors.Black,
        fontSize:20,
        fontWeight:"bold",
        alignSelf:'baseline',
       paddingLeft:20
    },
    anotherTextStyle:{
        color:colors.Green,
        fontSize:30,
        fontWeight:"bold",
        alignSelf:'baseline',
       paddingLeft:20,
       fontStyle:'italic'
    },
    titleStyle:{
        color:colors.Black,
        fontSize:40,
        fontWeight:"bold",
        alignSelf:'center',
        
    },
    item:{
        color:colors.DarkBlue,
        fontSize:30,
        fontWeight:"bold",
        alignSelf:'baseline',
       paddingLeft:20
    },
   
});


