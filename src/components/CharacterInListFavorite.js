import React, { useRef} from 'react';
import { Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import styles from '../styles/CharacterInListStyles';
const CharacterInListFavorite =({
    item,
    characterTab,
    takeFavourite,
    commentTab,
}) => {
    item=item.character
    const toggleFavorite = () => {
      flipFav();
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
        <Animated.View style={{...fliptStyle, backfaceVisibility:'hidden' }}>
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => characterTab(item)}>
              <Image style={styles.itemImage} source={{uri: item.image}} />
              <View style={{flexDirection:"row"}}>
                <Text style={styles.itemText}>{item.name}</Text>
                  <TouchableOpacity style = {styles.favoriteButton} onPress = {() => (toggleFavorite())}>
                    <Image style={styles.favoriteImage} source = {require('../../assets/likeLleno.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.favoriteButton} onPress = {() => (commentTab(item))}>
                    <Image style={styles.favoriteImage} source = {require('../../assets/comment.png')}/>
                  </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )
}
export default CharacterInListFavorite;
