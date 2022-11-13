import React, {useRef} from 'react';
import { StyleSheet, View, FlatList, Button} from 'react-native';
import CharacterInListFavorite from './CharacterInListFavorite';
import CharacterInList from './CharacterInListFavorite';

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
      <FlatList
          ref={flatList}
          style={styles.container}
          data={data}
          renderItem= {({ item }) => (
            <CharacterInListFavorite
            item = {item}
            characterTab = {characterTab}
            takeFavourite= {takeFavourite}
            ></CharacterInListFavorite>
        )}
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
  
