import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput,} from 'react-native';



const Search = () => {
    //const [search, setSearch] = useState("")
    return(
        <TextInput style={styles.textInputStyle}> 
        </TextInput>
    )
}

export default Search;



const styles = StyleSheet.create({
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: 'white'
    }
});
