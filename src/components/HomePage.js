import React,{useEffect, useRef} from 'react';
import { View, ActivityIndicator, Image, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import styles from '../styles/HomePageStyles';
import DefaultImage from '../../assets/fondo.jpg';
import DefaultImage2 from '../../assets/logo.png';
import FilterButtons from './FilterButtons';
import CharactersList from './CharactersList';
import FiltersModal from './FiltersModal';
import BusquedaVaciaModal from './BusquedaVaciaModal';
import CharacterViewModal from './CharacterViewModal';
import {ref, set, remove } from "firebase/database";
import { db } from '../../FirebaseConfig';
import { useSelector ,useDispatch} from 'react-redux';
import { setLastPage, setStatus, setCharacterModalItem, setCharacterLocation, setCharacterOrigin, setType, setSpecies, setGender, setCharacterModal,setData, setisLoading, setfilterSucces, setSearch, setShowModal, setpageCurrent} from '../store/Reducers';


const logo = Image.resolveAssetSource(DefaultImage2).uri;
const fondo = Image.resolveAssetSource(DefaultImage).uri;

const HomePage = () =>{
  
  const {data,isLoading, pageCurrent, lastPage, characterModal, search, showModal ,status, filterSucces, characterModalItem, species, type, origin, gender, location}  = useSelector(state => state.application);
  const apiURL = "https://rickandmortyapi.com/api/character/?page="+pageCurrent+"&name="+search+"&status="+status+"&species="+species+"&type="+type+"&gender="+gender
  const flatList = useRef();
  const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });
  const dispatch = useDispatch(); 
  useEffect(() => {
    setisLoading(true)
    getData()
    return () => {
    }
  }, [pageCurrent])
  const getFiltertData =async () => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => {
        if(res.results !=undefined){
        dispatch(setLastPage(res.info.next))
        dispatch(setData(res.results))
        dispatch(setisLoading(false))
      }
      else {
        if(pageCurrent==1){
          clearFilters()
          dispatch(setfilterSucces(true))
      }}
    }
        );
  }
  const getData =async () => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => {
        if(res.results !=undefined){
          dispatch(setLastPage(res.info.next))
          dispatch(setData(data.concat(res.results)))
          dispatch(setisLoading(false))
        } else {
          dispatch(setfilterSucces(true))
          dispatch(clearFilters())
        }
      }
          );
  }
  const renderFooter = () => {
    return (
      isLoading ?
      <View style ={styles.loader}>
        <ActivityIndicator size ="large"/>
      </View> : null)
  }
  const handleLoadMore = () => {
    if(lastPage != null){
      dispatch(setpageCurrent(pageCurrent + 1))
      dispatch(setisLoading(true))
  } }


  const handleChange = (text) =>{
    dispatch(setpageCurrent(1))
    dispatch(setSearch(text))
  }
  const rerender = () =>{
    dispatch(setpageCurrent(1))
    moveToTop()
    getFiltertData()
  }
  const clearFilters = () =>{
    dispatch(setSearch(""))
    clearModalFilters()
}
const clearModalFilters = () =>{
  dispatch(setStatus(""))
  dispatch(setSpecies(""))
  dispatch(setType(""))
  dispatch(setGender(""))
}
const characterTab = (character) =>{
  dispatch(setCharacterModal(true))
  dispatch(setCharacterModalItem(character))
  dispatch(setCharacterLocation(character.location))
  dispatch(setCharacterOrigin(character.origin))
  }

const addFavourite=(character) => {
  set(ref(db, 'favourites/' + character.id),{
    character: character
  })
  .then(() => {
    // Data saved successfully!
  })
  .catch((error) => {
    // The write failed...
  });
}

const takeFavourite=(character) =>{
  remove(ref(db, 'favourites/' + character.id));
}

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
    <>
    <ImageBackground source={{uri: fondo}} resizeMode="cover" style={styles.backgroundImage}>
    <Image source={{uri: logo}} style={styles.logo}></Image>
      <View style={styles.screen}>
      <TextInput style={styles.textInputStyle}
        placeholder= "Enter Name"
        placeholderTextColor= '#7FFF00'
        value={search}
        onChangeText={(text) => {
        handleChange(text); dispatch(setpageCurrent(1))}
        }/>
      <FilterButtons
        rerender={rerender}
        setShowModal={setShowModal}
        clearModalFilters={clearModalFilters}
        clearFilters={clearFilters}/>
      <CharactersList 
        data={data}
        handleLoadMore={handleLoadMore}
        renderFooter={renderFooter}
        characterTab={characterTab}
        addFavourite= {addFavourite}
        takeFavourite= {takeFavourite}
        flatList={flatList}
        />

      <FiltersModal
        showModal={showModal}
        species={species}
        type={type}
        setStatus={setStatus}
        setSpecies={setSpecies}
        setType={setType}
        setGender={setGender}
        rerender={rerender}
        setShowModal={setShowModal}
        setpageCurrent={setpageCurrent}/>
      <BusquedaVaciaModal/>
      <CharacterViewModal
      characterModal={characterModal}
      characterModalItem={characterModalItem}
      origin={origin}
      location={location}
      setCharacterModal={setCharacterModal}/>
      </View>
      </ImageBackground>    
              </>
              </SafeAreaView>
  )
}
export default HomePage;