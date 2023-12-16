import React,{useState, useEffect, useRef} from 'react';
import { View, ActivityIndicator, Image, Text, SafeAreaView, ImageBackground } from 'react-native';
import styles from '../styles/HomePageStyles';
import DefaultImage from '../../assets/fondo.jpg';
import DefaultImage2 from '../../assets/logo.png';
import { db } from '../../FirebaseConfig';
import {update, ref, get, remove, onChildAdded, onChildRemoved, onValue } from "firebase/database";
import CharactersListFavorite from './CharactersListFavorite';
import CharacterViewModalFavorite from './CharacterViewModalFavorite';
import CommentModalInput from './CommentModalInput';
import { setFavs,setisLoading,setCharacterComment,setCharacterModal,setCharacterModalItem, setCharacterLocation, setCharacterOrigin } from '../store/Reducers';
import { useDispatch, useSelector } from 'react-redux';
const logo = Image.resolveAssetSource(DefaultImage2).uri;
const fondo = Image.resolveAssetSource(DefaultImage).uri;

const FavoritePage = () =>{
  const [commentModal, setCommentModal]= useState(false)
  const [characterIDComment, setCharacterIDComment] = useState([])
  const [noFavs, setNoFavs] = useState(true)
  const [comentario, setcomentario] = useState("")

  const dispatch = useDispatch(); 
  const { favs, isLoading }  = useSelector(state => state.application); 

  const flatList = useRef();

  useEffect(() => {
    dispatch(setisLoading(true))
    onChildAdded(ref(db, 'favourites/'), (char) =>{
      //dispatch(setData(prevData => [...prevData, char.val().character]))
      getCharactersFromFavs()
    })

    onChildRemoved(ref(db, 'favourites/'), (char) =>{
      //dispatch(setData(prevData => prevData.filter(element => element.id !== char.val().character.id)))
      getCharactersFromFavs()
    })
    getCharactersFromFavs()
  }, [])
  useEffect(() => {
    if (favs.length===0) {
      setNoFavs(false)
    } else {
    setNoFavs(true)}
},[favs])
  const getCharactersFromFavs = () => {
    const aux = []
    get(ref(db,'favourites')).then((snapshot) => {
      if (snapshot.exists()) {
          snapshot.forEach((groupSnapshot) => {aux.push(JSON.parse(JSON.stringify(groupSnapshot)))}) 
          dispatch(setFavs(aux))
      } else {
          console.log("No data available");
          dispatch(setFavs([]))
      }
      }).catch((error) => {
          console.error(error);
      });     
  };

  const getComment = (id) =>{
    console.log("22222",id);
    const refBD = ref(db, 'favourites/'+ id + '/character/comment');
    onValue(refBD, (snapshot) => {
      dispatch(setCharacterComment(snapshot.val()))
    })}
  const characterTab = (character) =>{
    dispatch(setCharacterModal(true))
    dispatch(setCharacterModalItem(character))
    dispatch(setCharacterLocation(character.location))
    dispatch(setCharacterOrigin(character.origin))
    setcomentario(getComment(character.id))
    }

    const commentTab = (character) => {
      setCharacterIDComment(character.id)
      setCommentModal(true)
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
        renderFooter={renderFooter}
        commentTab = {commentTab}
        characterTab={characterTab}
        takeFavourite= {takeFavourite}
        flatList={flatList}
        />

      <CharacterViewModalFavorite/>
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