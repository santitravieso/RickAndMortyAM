import React, {useRef} from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import CharacterInListFavorite from './CharacterInListFavorite';

const CharactersListFavorite = ({
    data,
    handleLoadMore,
    renderFooter,
    characterTab,
    flatList,
    takeFavourite
}) => {
return(
    <View style={{flex:28}}>
      <View style={{backgroundColor: 'black'}}>
      <Text style={{fontSize: 30, padding: 5, color: '#7FFF00', alignSelf: 'center', marginLeft: '5%'}}>Personajes Favoritos</Text>
      </View>
      <FlatList
          ref={flatList}
          style={styles.container}
          data={data}
          renderItem= {({ item}) => {
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
  
