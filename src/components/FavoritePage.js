import React,{useState, useEffect, useRef} from 'react';
import { View, ActivityIndicator, Image, Text, SafeAreaView, ImageBackground } from 'react-native';
import styles from '../styles/HomePageStyles';
import DefaultImage from '../../assets/fondo.jpg';
import DefaultImage2 from '../../assets/logo.png';
import { db } from '../../FirebaseConfig';
import {update, set, ref, remove, onChildAdded, onChildRemoved } from "firebase/database";
import CharactersListFavorite from './CharactersListFavorite';
import CharacterViewModalFavorite from './CharacterViewModalFavorite';
import CommentModalInput from './CommentModalInput';

const logo = Image.resolveAssetSource(DefaultImage2).uri;
const fondo = Image.resolveAssetSource(DefaultImage).uri;

const FavoritePage = () =>{
  const [data, setData] = useState([]);
  const [characterModal, setCharacterModal] = useState(false)
  const [characterModalItem, setCharacterModalItem] = useState([])
  const [origin, setCharacterOrigin] = useState([])
  const [location, setCharacterLocation] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [lastPage, setLastPage] = useState("")
  const [pageCurrent, setpageCurrent] = useState(1)
  const [commentModal, setCommentModal]= useState(false)
  const [characterIDComment, setCharacterIDComment] = useState([])
  const [noFavs, setNoFavs] = useState(true)



  const flatList = useRef();

  useEffect(() => {
    setisLoading(true)
    onChildAdded(ref(db, 'favourites/'), (char) =>{
      setData(prevData => [...prevData, char.val().character])
    })

    onChildRemoved(ref(db, 'favourites/'), (char) =>{
      setData(prevData => prevData.filter(element => element.id !== char.val().character.id))
    })
  }, [])
  useEffect(() => {
    if (data.length===0) {
      setNoFavs(false)
    } else {
      console.log(data.length)
      setNoFavs(true)}
},[data])


  const handleLoadMore = () => {
    if(lastPage != null){
    setpageCurrent(pageCurrent + 1)
    setisLoading(true)
  } }

  const characterTab = (character) =>{
    setCharacterModal(true)
    setCharacterModalItem(character)
    setCharacterLocation(character.location)
    setCharacterOrigin(character.origin)
    }

    const commentTab = (character) => {
      setCommentModal(true)
      setCharacterIDComment(character.id)
    }
    const addComment = (text, id) => {
      update(ref(db, "favourites/"+id+"/character")
      ,{
         comment: text
       })
     }
    const renderFooter = () => {
      return (
        isLoading ?
        <View style ={styles.loader}>
          <ActivityIndicator size ="large"/>
        </View> : null)
    }  
  const takeFavourite=(character) =>{
    remove(ref(db, 'favourites/' + character.id));
  }
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
    <>
    <ImageBackground source={{uri: fondo}} resizeMode="cover" style={styles.backgroundImage}>
    <Image source={{uri: logo}} style={styles.logo}></Image>

    {!noFavs && (
        <View style={styles.screen}>
            <View backgroundColor='black'>
            <Text style={{fontSize: 30, padding: 5, color: '#7FFF00', alignSelf: 'center', marginLeft: '5%'}}>No hay personajes favoritos</Text>
          <Text  style={styles.screen}container>No hay personajes favoritos</Text>
          </View>
        </View>)}
    {noFavs && (       
      <View style={styles.screen}>
      <CharactersListFavorite 
        data={data}
        handleLoadMore={handleLoadMore}
        renderFooter={renderFooter}
        commentTab = {commentTab}
        characterTab={characterTab}
        takeFavourite= {takeFavourite}
        flatList={flatList}
        />

      <CharacterViewModalFavorite
      characterModal={characterModal}
      characterModalItem={characterModalItem}
      origin={origin}
      location={location}
      setCharacterModal={setCharacterModal}/>
      <CommentModalInput
        addComment = {addComment}
        setCommentModal = {setCommentModal}
        commentModal = {commentModal}
        characterIDComment= {characterIDComment}
        />
              </View>  
      )}
      </ImageBackground>    
              </>
              </SafeAreaView>
  )
}
export default FavoritePage;