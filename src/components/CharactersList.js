import React from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import CharacterInList from './CharacterInList';
import { useSelector } from 'react-redux';


const CharactersList = ({
    handleLoadMore,
    renderFooter,
    characterTab,
    flatList,
    addFavourite,
    takeFavourite,

}) => {
  const {data}  = useSelector(state => state.application);
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
          onEndReachedThreshold={2.5} 
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
  