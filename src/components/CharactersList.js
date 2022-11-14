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
      <Animated.FlatList
          ref={flatList}
          style={styles.container}
          data={data}
          renderItem= {({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const translateX = scrollY.interpolate({
              inputRange,
              outputRange: [30, 30, -300]
            })
            return (
            <CharacterInList
            item = {item}
            characterTab = {characterTab}
            translateX = {translateX}
            addFavourite= {addFavourite}
            takeFavourite= {takeFavourite}
            ></CharacterInList>)
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2} 
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true}
            )}
            scrollEventThrottle={16}
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
  