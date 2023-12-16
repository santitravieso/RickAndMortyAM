import React from "react";
import { StyleSheet, TextInput,} from 'react-native';



const Search = () => {
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
