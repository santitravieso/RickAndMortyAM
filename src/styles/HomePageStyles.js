import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
    },
    logo: {
      height: '19%',
      width:'100%',
      marginTop: '30%'
    },
    backgroundImage:{
      height:'100%',
      width:'100%',
      justifyContent: 'center'
    },
    screen:{
      alignSelf: 'center'
    },
  
    loader: {
      marginTop: 10,
      alignItems: 'center'
    },
    textInputStyle: {
      borderWidth: 1,
      paddingLeft: '7%',
      marginTop: '0%',
      marginBottom: '5%',
      alignSelf: 'center',
      flex: 2,
      borderColor: '#7FFF00',
      backgroundColor: 'black',
      textDecorationColor: 'white',
      color: '#7FFF00',
      alignContent: 'center',
      maxWidth: '60%',
      width: 200,
      textAlign: 'center',
      paddingRight: '8%'
    },
    
  
  });

  export default styles;