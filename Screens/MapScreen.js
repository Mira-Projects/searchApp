import { StatusBar } from "expo-status-bar";
import React, { useState} from "react";
import { StyleSheet, Text, View, FlatList} from "react-native";
import { Image } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from "../Components/colors";

export default function MapScreen({navigation}) {
    
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [searchTimer, setSearchTimer] = useState(null);
    const [headlines, setHeadlines] = useState([]);

    async function fetchData(text) {
        const res = await fetch(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&sort=newest&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ`,
        )
            .then((response) =>response.json())
            .then((responseJson) =>{
                resultat=responseJson.response.docs; 
               // console.log(resultat);
                //console.log(headlines);
                console.log(resultat);    
                //setHeadlines(headline);
                setResults(resultat);

            })
            .catch((err) => console.log(err));
    };
    
    const Item = ({abstract,lead_paragraph,document_type,headline,web_url,section_name, }) => (
        <View >  
          <Text style={styles.textStyle}>{abstract}</Text>
          <Text >{lead_paragraph}</Text>
          <Text >{document_type}</Text>
          <Text >{web_url}</Text>
          <Text >{section_name}</Text>
          <Text style={styles.titleStyle} >{headline}</Text>
        </View>
      );
  
  
      //item=item from data that is results here
      const renderItem = ({ item}) =>(
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('NewScreen',{
            
            title:item.headline.main ,	
            category:item.document_type,
            description:item.section_name,
            weblink: item.web_url
          })}>
              <Item headline={item.headline.main} />
              <Item abstract={item.abstract} />
          </TouchableOpacity>
                            
                            );
        
    return (
        
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={(text) => {
                    if (searchTimer) {
                        clearTimeout(searchTimer);
                    }
                    setInput(text);
                    setSearchTimer(
                        setTimeout(() => {  
                            fetchData(text);        
                        }, 2000),
                    );
                }}
                value={input}
            />
            
            <FlatList
                data={results}
                renderItem={renderItem} keyExtractor={item => item._id}
                initialNumToRender={20}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       // marginTop: 20,
        flex: 1,
        backgroundColor: colors.Gray,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle:{
        color:colors.Gray,
        fontSize:13,
        fontWeight:"bold",
        alignSelf:'center',
        marginLeft:5
    },
    titleStyle:{
        color:colors.Black,
        fontSize:18,
        fontWeight:"bold",
        alignSelf:'center'
    },
    item:{
        backgroundColor: colors.containercolor,
        borderBottomColor:colors.Black,
        borderBottomWidth:2,
        borderRadius:20,
        marginLeft:10,
        marginRight:10,
        justifyContent:'center',
        flexDirection:'column',
        flex:1,
        height:130
    },
   
});


