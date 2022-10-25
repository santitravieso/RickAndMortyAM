import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles/FiltersModalStyles';


const FiltersModal =({
    showModal,
    species,
    type,
    setStatus,
    setSpecies,
    setType,
    setGender,
    rerender,
    setShowModal,
    setpageCurrent,
    
}) => {
    return(
        <Modal transparent={true} visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View style={styles.fixedFilters}>
              <Text style={styles.filterTitle}> Status:  </Text>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => {setpageCurrent(1);setStatus("dead")}}> Dead </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => {setpageCurrent(1);setStatus("alive")}}> Alive </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => {setpageCurrent(1);setStatus("unknown")}}> Unknown </Text></TouchableOpacity>
          </View>
          <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Species:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Enter Specie"
                placeholderTextColor= '#7FFF00'
                value={species}
                onChangeText={newText => {setSpecies(newText); setpageCurrent(1)}}
              />
          </View>
          <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Type:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Enter Type"
                placeholderTextColor= '#7FFF00'
                value={type}
                onChangeText={newText => {setType(newText); setpageCurrent(1)}}
              />
          </View>
          <View style={styles.fixedFilters2} >
              <Text style={styles.filterTitle2}> Gender:  </Text>
              <View style={styles.fixedFilters3}>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => {setpageCurrent(1);setGender("female")}}> Female </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => {setpageCurrent(1);setGender("male")}}> Male </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() =>{setpageCurrent(1);setGender("genderless")}}> Genderless </Text></TouchableOpacity>
              <TouchableOpacity><Text  style={styles.genderFilters}onPress={() => {setpageCurrent(1);setGender("unknown")}}> Unknown </Text></TouchableOpacity>
              </View>
          </View>
          <Text style={styles.filterTitle} onPress={() => {rerender(); setShowModal(false)}}>Apply</Text>
          <Text style={styles.filterTitle} onPress={() => setShowModal(false)}>Close</Text>
          </View>
          </View>
      </Modal>
    )
}

export default FiltersModal;


