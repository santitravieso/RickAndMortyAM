import React from 'react';
import { Text, View, Image, Modal} from 'react-native';
import styles from '../styles/CharacterViewModalStyles';


const CharacterViewModal =({
    characterModal,
    characterModalItem,
    origin,
    location,
    setCharacterModal
}) => {
    return(
        <Modal transparent={true} visible={characterModal} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCardChar}>
            <View style={styles.itemRowModal}>
              <Text style={styles.itemTextChar}>{characterModalItem.name}</Text>
              <Image style={styles.itemImage} source={{uri: characterModalItem.image}} />
              <Text style={styles.itemText}>{characterModalItem.status}</Text>
              <Text style={styles.itemText}>{characterModalItem.species}</Text>
              <Text style={styles.itemText}>{characterModalItem.type}</Text>
              <Text style={styles.itemText}>{characterModalItem.gender}</Text>
              <Text style={styles.itemText}>{origin.name}</Text>
              <Text style={styles.itemText}>{location.name}</Text>
              
            </View>
            <Text style={styles.filterTitle} onPress={() => setCharacterModal(false)}>Close</Text>
          </View>
          </View>
      </Modal>
    )
}

export default CharacterViewModal;


