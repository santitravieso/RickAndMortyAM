import React from 'react';
import { StyleSheet, Text, View, Modal} from 'react-native';
import styles from '../styles/BusquedaVaciaModalStyles';


const BusquedaVaciaModal =({
    filterSucces,
    setfilterSucces,
    rerender
}) => {
    return(
        <Modal transparent={true} visible={filterSucces} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View>
              <Text style={styles.itemTextChar}> No existe ningun personaje con los filtros seleccionados  </Text>
          </View>
          <Text onPress={() => {setfilterSucces(false); rerender()}} style={styles.itemTextChar}>Cerrar</Text>
          </View>
          </View>
      </Modal>
    )
}

export default BusquedaVaciaModal;
