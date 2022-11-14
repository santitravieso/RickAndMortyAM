import React, {useRef} from 'react';
import { StyleSheet, View, FlatList, Animated, Dimensions, Text} from 'react-native';
import CharacterInListFavorite from './CharacterInListFavorite';
const {width, height} = Dimensions.get('window');

const ITEM_SIZE = width * 0.70;

const CharactersListFavorite = ({
    data,
    handleLoadMore,
    renderFooter,
    characterTab,
    flatList,
    takeFavourite
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
return(
    <View style={{flex:28}}>
      <View style={{backgroundColor: 'black'}}>
      <Text style={{fontSize: 30, padding: 5, color: '#7FFF00', alignSelf: 'center', marginLeft: '5%'}}>Personajes Favoritos</Text>
      </View>
      <FlatList
          ref={flatList}
          style={styles.container}
          data={data}
          renderItem= {({ item, index }) => {
            return (
            <CharacterInListFavorite
            item = {item}
            characterTab = {characterTab}
            takeFavourite= {takeFavourite}
            ></CharacterInListFavorite>
          )}}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2} 
      />
      </View>
      
)
 }

export default CharactersListFavorite;


  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
    }
  });
  
