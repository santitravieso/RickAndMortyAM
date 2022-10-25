
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalCard: {
        width: '90%',
        height: '50%',
        backgroundColor: 'black',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#7FFF00',
        borderWidth: 1
      },
      fixedFilters: {
        flexDirection: "row",
        marginTop: '10%',
        flex: 1,
        marginBottom: '10%'
      },
    filterTitle: {
        color: '#7FFF00',
        flex: 1,
        fontSize: 20,
        
        },
        filterTitle2: {
            color: '#7FFF00',
            flex: 1,
            fontSize: 20,
            paddingLeft: 0.1,
            marginRight: '75%'
            
            },
        textFilters: {
            borderColor: '#7FFF00',
            borderWidth: 0.5,
            borderRadius: 10,
            marginHorizontal: '2.8%',
            flex: 1,
            color: '#7FFF00',
            alignSelf: 'center',
            alignContent: 'center',
            paddingTop: '1%',
            padding: '2%'
          },
          textInputFilters: {
            flexDirection: "row",
            marginTop: '1%',
            flex: 2,
            marginBottom: '5%',
          },
          filterTextInputStyle: {
            borderWidth: 1,
            marginBottom: '5%',
            borderColor: '#7FFF00',
            backgroundColor: 'black',
            textDecorationColor: 'white',
            color: '#7FFF00',
            width: 200,
            textAlign: 'center',
            marginRight: '5%',
            padding: '2%',
          },
          fixedFilters2: {
            flexDirection: "column",
            marginTop: '1%',
            flex: 2,
            marginBottom: '10%',
            alignContent: 'center',
            alignSelf: 'center'
          },
          fixedFilters3:{
            flexDirection: "row",
            marginTop: '1%',
            flex: 1,
            marginBottom: '0.1%',
            marginLeft: '17%'
          },
          genderFilters: {
            borderColor: '#7FFF00',
            borderWidth: 0.5,
            borderRadius: 10,
            marginHorizontal: '1%',
            flex: 2,
            color: '#7FFF00',
            alignSelf: 'center',
            alignContent: 'center',
            paddingTop: '0.5%',
            padding: '0.1%'
          }
  
  
  });

  export default styles;
