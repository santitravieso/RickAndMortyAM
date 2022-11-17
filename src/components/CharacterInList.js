import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import styles from '../styles/CharacterInListStyles';
import {ref, set, remove, onChildAdded, onChildRemoved } from "firebase/database";
import { db } from '../../FirebaseConfig';



const CharacterInList =({
    item,
    characterTab,
    addFavourite,
    takeFavourite,
    data
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    useEffect(() => {
      const charactersRef = ref(db, 'favourites/');
      setIsFavorite(false)
      onChildAdded(charactersRef, (char) => {
         console.log(item)
          if (char.val().character.id==item.id){
              setIsFavorite(true);
              console.log(item.name)
          }
      })

      onChildRemoved(charactersRef, (char) => {
          if (char.val().character.id==item.id){
              setIsFavorite(false);
          }
      });console.log(isFavorite, item.id)

  }, [data])
    const toggleFavorite = () => {
      if(isFavorite == true){
        takeFavourite(item)
        
      }else{
        addFavourite(item);
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
        <Animated.View style={{...fliptStyle  }}>
        <View style={styles.itemRow}>
          <TouchableOpacity onPress={() => characterTab(item)}>
            <Image style={styles.itemImage} source={{uri: item.image}} />
            <View style={{flexDirection:"row"}}>
              <Text style={styles.itemText}>{item.name}</Text>
              {!isFavorite && (
                <TouchableOpacity style = {styles.favoriteButton} onPress = {() => (toggleFavorite(), !!flipRotation ? flipNoFav() : flipFav())}>
                  <Image style={styles.favoriteImage} source = {require('../../assets/likeVacio.png')}/>
                </TouchableOpacity>
              )}
              {isFavorite && (
                <TouchableOpacity style = {styles.favoriteButton} onPress = {() => (toggleFavorite(), !!flipRotation ? flipNoFav() : flipFav())}>
                  <Image style={styles.favoriteImage} source = {require('../../assets/likeLleno.png')}/>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
        </Animated.View>
    )
}

export default CharacterInList;

