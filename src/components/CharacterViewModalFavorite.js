import React from 'react';
import { Text, View, Image, Modal} from 'react-native';
import styles from '../styles/CharacterViewModalStyles';
import { db } from '../../FirebaseConfig';
import {update, set, ref, remove, onChildAdded, onChildRemoved, onValue } from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';
import { setCharacterModal} from '../store/Reducers';

const readComment = (id) =>{
  console.log("22222",id);
  const refBD = ref(db, 'favourites/'+ id + '/character/comment');
  onValue(refBD, (snapshot) => {
    const comment = snapshot.val();
    console.log("111111",comment);
    return comment;
  })}


  
  const CharacterViewModalFavorite =({
    /*characterModal,
    characterModalItem,
    origin,
    location,
    setCharacterModal*/
}) => {
    const {characterModal,characterModalItem, origin, location, comment}  = useSelector(state => state.application);
    const dispatch = useDispatch();
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
              <Text style={styles.itemText}>Comment: {comment}</Text>
            </View>
            <Text style={styles.filterTitle} onPress={() => dispatch(setCharacterModal(false))}>Close</Text>
          </View>
          </View>
      </Modal>
    )
}

export default CharacterViewModalFavorite;