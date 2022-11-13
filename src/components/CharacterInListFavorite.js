import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import styles from '../styles/CharacterInListStyles';

const CharacterInListFavorite =({
    item,
    characterTab,
    takeFavourite
}) => {
    const [isFavorite, setIsFavorite] = useState(true);
    const toggleFavorite = () => {
      if(isFavorite == true){
        setIsFavorite(false);
        takeFavourite(item);
    }
}
const flipAnimation = useRef( new Animated.Value( 0 ) ).current;
    let flipRotation = 0;
    flipAnimation.addListener( ( { value } ) => flipRotation = value );
    const fliptStyle = {
      transform: [ isFavorite ?
        { rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 360 ],
          outputRange: [ "0deg", "1080deg" ]
        } ) } : { rotateY: flipAnimation.interpolate( {
          inputRange: [ 0, 360 ],
          outputRange: [ "0deg", "720deg" ]
        } ) }
      ]
    };

    const flipFav = () => {
      Animated.timing( flipAnimation, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      } ).start();
    };
    const flipNoFav = () => {
      Animated.timing( flipAnimation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      } ).start();
    };
return(
        <Animated.View style={{...fliptStyle }}>
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => characterTab(item)}>
              <Image style={styles.itemImage} source={{uri: item.image}} />
              <View style={{flexDirection:"row"}}>
                <Text style={styles.itemText}>{item.name}</Text>
                {isFavorite && (
                  <TouchableOpacity style = {styles.favoriteButton} onPress = {() => (toggleFavorite(), !!flipRotation ? flipNoFav() : flipFav())}>
                    <Image style={styles.favoriteImage} source = {require('../../assets/likeVacio.png')}/>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )
}
export default CharacterInListFavorite;
