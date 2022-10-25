import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/CharacterInListStyles';

const CharacterInList =({
    item,
    characterTab

}) => {
    return(
        <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => characterTab(item)}>
          <Image style={styles.itemImage} source={{uri: item.image}} />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
}

export default CharacterInList;

