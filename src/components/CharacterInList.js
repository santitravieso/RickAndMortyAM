import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/CharacterInListStyles';

const CharacterInList =({
    item,
    characterTab

}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      if(isFavorite == true){
        setIsFavorite(false);
      }else{
        setIsFavorite(true);
      }
      
    }
    return(
        <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => characterTab(item)}>
          <Image style={styles.itemImage} source={{uri: item.image}} />
          <Text style={styles.itemText}>{item.name}</Text>
          {!isFavorite && (
            <TouchableOpacity style = {styles.favoriteButton} onPress = {() => toggleFavorite()}>
              <Image style={styles.favoriteImage} source = {require('../../assets/likeVacio.png')}/>
            </TouchableOpacity>
          )}
          {isFavorite && (
            <TouchableOpacity style = {styles.favoriteButton} onPress = {() => toggleFavorite()}>
              <Image style={styles.favoriteImage} source = {require('../../assets/likeLleno.png')}/>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    )
}

export default CharacterInList;

