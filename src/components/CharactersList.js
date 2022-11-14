import React, {useRef} from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import CharacterInList from './CharacterInList';


const CharactersList = ({
    data,
    handleLoadMore,
    renderFooter,
    characterTab,
    flatList,
    addFavourite,
    takeFavourite
}) => {
return(
    <View style={{flex:28}}>
      <FlatList
          ref={flatList}
          style={styles.container}
          data={data}
          renderItem= {({ item }) => {
            return (
            <CharacterInList
            item = {item}
            characterTab = {characterTab}
            addFavourite= {addFavourite}
            takeFavourite= {takeFavourite}
            ></CharacterInList>)
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2} 
      />
      </View>
      
)
 }

export default CharactersList;


  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
    }
  });
  