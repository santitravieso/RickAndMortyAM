import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles/FiltersModalStyles';
import { useSelector ,useDispatch} from 'react-redux';
import { setStatus, setSpecies, setType, setGender, setShowModal, setpageCurrent} from '../store/Reducers';

const FiltersModal =({
    rerender,
}) => {
    const dispatch = useDispatch(); 
    const { showModal, species, type }  = useSelector(state => state.application);
    return(
        <Modal transparent={true} visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View style={styles.fixedFilters}>
              <Text style={styles.filterTitle}> Status:  </Text>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => {dispatch(setpageCurrent(1));dispatch(setStatus("dead"))}}> Dead </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => {dispatch(setpageCurrent(1));dispatch(setStatus("alive"))}}> Alive </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => {dispatch(setpageCurrent(1));dispatch(setStatus("unknown"))}}> Unknown </Text></TouchableOpacity>
          </View>
          <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Species:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Enter Specie"
                placeholderTextColor= '#7FFF00'
                value={species}
                onChangeText={newText => {dispatch(setSpecies(newText)); dispatch(setpageCurrent(1))}}
              />
          </View>
          <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Type:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Enter Type"
                placeholderTextColor= '#7FFF00'
                value={type}
                onChangeText={newText => {dispatch(setType(newText)); dispatch(setpageCurrent(1))}}
              />
          </View>
          <View style={styles.fixedFilters2} >
              <Text style={styles.filterTitle2}> Gender:  </Text>
              <View style={styles.fixedFilters3}>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => {dispatch(setpageCurrent(1));dispatch(setGender("female"))}}> Female </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => {dispatch(setpageCurrent(1));dispatch(setGender("male"))}}> Male </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() =>{dispatch(setpageCurrent(1));dispatch(setGender("genderless"))}}> Genderless </Text></TouchableOpacity>
              <TouchableOpacity><Text  style={styles.genderFilters}onPress={() => {dispatch(setpageCurrent(1));dispatch(setGender("unknown"))}}> Unknown </Text></TouchableOpacity>
              </View>
          </View>
          <Text style={styles.filterTitle} onPress={() => {rerender(); dispatch(setShowModal(false))}}>Apply</Text>
          <Text style={styles.filterTitle} onPress={() => dispatch(setShowModal(false))}>Close</Text>
          </View>
          </View>
      </Modal>
    )
}

export default FiltersModal;


