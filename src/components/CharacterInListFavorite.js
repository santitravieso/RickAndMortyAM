import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import styles from '../styles/CharacterInListStyles';

const CharacterInListFavorite =({
    item,
    characterTab,
    takeFavourite,
    translateX,
}) => {
    const toggleFavorite = () => {
      flipFav();
      //takeFavourite(item);
}
const flipAnimation = useRef( new Animated.Value( 0 ) ).current;
    let flipRotation = 0;
    flipAnimation.addListener( ( { value } ) => {
      flipRotation = value;
      if(value >= 180) {takeFavourite(item), flipAnimation.setValue(0) }});
    const fliptStyle = { 
      transform: [{ rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 180 ],
          outputRange: [ "0deg", "180deg" ]
        } ) }
      ],
      
    };

    const flipFav = () => {
      Animated.timing( flipAnimation, {
        toValue: 180,
        duration: 2000,
        useNativeDriver: true,
      } ).start();
      return true;
    };

   
return(
      <Animated.View style={{transform: [{ translateX}]}}>
        <Animated.View style={{...fliptStyle, backfaceVisibility:'hidden' }}>
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => characterTab(item)}>
              <Image style={styles.itemImage} source={{uri: item.image}} />
              <View style={{flexDirection:"row"}}>
                <Text style={styles.itemText}>{item.name}</Text>
                  <TouchableOpacity style = {styles.favoriteButton} onPress = {() => (toggleFavorite())}>
                    <Image style={styles.favoriteImage} source = {require('../../assets/likeLleno.png')}/>
                  </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
      )
}
export default CharacterInListFavorite;
