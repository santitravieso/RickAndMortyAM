import React, {useRef} from 'react';
import { StyleSheet, View, FlatList, Animated, Dimensions} from 'react-native';
import CharacterInList from './CharacterInList';
const {width, height} = Dimensions.get('window');

const ITEM_SIZE = width * 0.70;

const CharactersList = ({
    data,
    handleLoadMore,
    renderFooter,
    characterTab,
    flatList,
    addFavourite,
    takeFavourite
}) => {
const scrollY = useRef(new Animated.Value(0)).current;
return(
    <View style={{flex:28}}>
      <FlatList
          ref={flatList}
          style={styles.container}
          data={data}
          renderItem= {({ item, index }) => {
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
  