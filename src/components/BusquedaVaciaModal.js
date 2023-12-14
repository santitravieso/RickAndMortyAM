import React from 'react';
import { StyleSheet, Text, View, Modal} from 'react-native';
import styles from '../styles/BusquedaVaciaModalStyles';
import { useSelector ,useDispatch} from 'react-redux';
import { setfilterSucces} from '../store/Reducers';

const BusquedaVaciaModal =({
}) => {
    const dispatch = useDispatch(); 
    const { filterSucces }  = useSelector(state => state.application);
    return(
        <Modal transparent={true} visible={filterSucces} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View>
              <Text style={styles.itemTextChar}> No existe ningun personaje con los filtros seleccionados  </Text>
          </View>
          <Text onPress={() => {dispatch(setfilterSucces(false))}} style={styles.itemTextChar}>Cerrar</Text>
          </View>
          </View>
      </Modal>
    )
}

export default BusquedaVaciaModal;
