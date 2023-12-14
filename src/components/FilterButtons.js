import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useSelector ,useDispatch} from 'react-redux';
import { setShowModal} from '../store/Reducers';
const FilterButtons =({
    rerender,
    clearModalFilters,
    clearFilters
}) => {
  const dispatch = useDispatch(); 
    return(
        <View style={{flexDirection:"row", flex: 2}}> 
        <TouchableOpacity style={styles.butons} onPress={() => rerender()}>
            <Text style={styles.butonsText}> Apply </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butons} onPress={() => {dispatch(setShowModal(true)); clearModalFilters()}}>
            <Text style={styles.butonsText}> More Filters </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butons} onPress={() => {clearFilters(); rerender()}}>
            <Text style={styles.butonsText}> Clear Filters </Text>
        </TouchableOpacity>
      </View>
    )
}

export default FilterButtons;

const styles = StyleSheet.create({
    butons: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 2,
      paddingHorizontal: 3,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      marginHorizontal: 3,
      marginBottom:15,
    },
    butonsText: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#7FFF00',
      alignContent: 'center',
    }
  });