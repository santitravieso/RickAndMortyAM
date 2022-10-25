
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCardChar: {
    width: '90%',
    height: '60%',
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7FFF00',
    borderWidth: 1,
  },
  itemRowModal: {
    marginBottom: '10%',
    backgroundColor: 'black',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '2%'
  },
  itemTextChar: {
    fontSize: 20,
    padding: 2,
    color: '#7FFF00',
    alignSelf: 'center'
  },
  itemImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
    margin: '2%'
  },
  itemText: {
    fontSize: 16,
    padding: 1,
    color: '#7FFF00',
    alignSelf: 'center'
  },
  filterTitle: {
    color: '#7FFF00',
    flex: 1,
    fontSize: 16,
    padding: 0.5,  },
  });
  


  export default styles;