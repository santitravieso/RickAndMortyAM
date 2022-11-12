import React,{useState, useEffect, useRef} from 'react';
import { View, ActivityIndicator, Image, Text, SafeAreaView, ImageBackground } from 'react-native';
import styles from '../styles/HomePageStyles';
import DefaultImage from '../../assets/fondo.jpg';
import DefaultImage2 from '../../assets/logo.png';
import CharactersList from './CharactersList';
import CharacterViewModal from './CharacterViewModal';

const logo = Image.resolveAssetSource(DefaultImage2).uri;
const fondo = Image.resolveAssetSource(DefaultImage).uri;

const FavoritePage = () =>{
 
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
    <>
    <ImageBackground source={{uri: fondo}} resizeMode="cover" style={styles.backgroundImage}>
    <Image source={{uri: logo}} style={styles.logo}></Image>
      <View style={styles.screen}>
       <Text>FAVORITO</Text> 
      </View>
      </ImageBackground>    
              </>
              </SafeAreaView>
  )
}
export default FavoritePage;