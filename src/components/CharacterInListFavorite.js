import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import styles from '../styles/CharacterInListStyles';

const CharacterInListFavorite =({
    item,
    characterTab,
    takeFavourite,
    translateX
}) => {
    const [isFavorite, setIsFavorite] = useState(true);
    const toggleFavorite = async () => {
      if(isFavorite == true){
        flipFav();
        setIsFavorite(false);
        //takeFavourite(item);
    }
}
const flipAnimation = useRef( new Animated.Value( 0 ) ).current;
    let flipRotation = 0;
    flipAnimation.addListener( ( { value } ) => {
      flipRotation = value;
      if(value >= 360) takeFavourite(item) });
    const fliptStyle = {
      transform: [ isFavorite ?
        { rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 360 ],
          outputRange: [ "0deg", "1080deg" ]
        } ) } : { rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 360 ],
          outputRange: [ "0deg", "720deg" ]
        } ) }
      ],
      
    };

    const flipFav = () => {
      Animated.timing( flipAnimation, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      } ).start();
      setIsFavorite(false);
      return true;
    };
    const flipNoFav = () => {
      Animated.timing( flipAnimation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      } ).start();
    };

   
return(
      <Animated.View style={{transform: [{ translateX}]}}>
        <Animated.View style={{...fliptStyle }}>
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
