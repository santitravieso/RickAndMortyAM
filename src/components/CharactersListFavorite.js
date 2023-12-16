import React from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import CharacterInListFavorite from './CharacterInListFavorite';
import { useSelector } from 'react-redux';




const CharactersListFavorite = ({
    renderFooter,
    commentTab,
    characterTab,
    flatList,
    takeFavourite
}) => {
  const { favs }  = useSelector(state => state.application);
return(
    <View style={{flex:28}}>
      <View style={{backgroundColor: 'black'}}>
      <Text style={{fontSize: 30, padding: 5, color: '#7FFF00', alignSelf: 'center', marginLeft: '5%'}}>Personajes Favoritos</Text>
      </View>
      <FlatList
          ref={flatList}
          style={styles.container}
          data={favs}
          renderItem= {({ item}) => {
            return (
            <CharacterInListFavorite
            item = {item}
            characterTab = {characterTab}
            takeFavourite= {takeFavourite}
            commentTab = {commentTab}
            ></CharacterInListFavorite>
          )}}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
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
  
