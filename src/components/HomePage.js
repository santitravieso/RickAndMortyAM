import React,{useState, useEffect, useRef} from 'react';
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


const logo = Image.resolveAssetSource(DefaultImage2).uri;
const fondo = Image.resolveAssetSource(DefaultImage).uri;

const HomePage = () =>{
  const [data, setData] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [pageCurrent, setpageCurrent] = useState(1)
  const [search, setSearch] = useState("")
  const [lastPage, setLastPage] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus]= useState("");
  const [filterSucces, setfilterSucces]= useState(false);
  const [species, setSpecies] = useState("")
  const [type, setType] = useState("")
 // const [character, setCharacter]= useState({});
  const [gender, setGender] = useState("")
  const [characterModal, setCharacterModal] = useState(false)
  const [characterModalItem, setCharacterModalItem] = useState([])
  const [origin, setCharacterOrigin] = useState([])
  const [location, setCharacterLocation] = useState([])

 const apiURL = "https://rickandmortyapi.com/api/character/?page="+pageCurrent+"&name="+search+"&status="+status+"&species="+species+"&type="+type+"&gender="+gender
 const flatList = useRef();
 const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });

  useEffect(() => {
    setisLoading(true)
    getData()
    //getSearch()
    return () => {
    }
  }, [pageCurrent])
  const getFiltertData =async () => {
    console.log('aca', apiURL)
    fetch(apiURL)
      .then(res => res.json())
      .then(res => {
        if(res.results !=undefined){
        setLastPage(res.info.next)
        setData(res.results)
        setisLoading(false)
      }
      else {
        if(pageCurrent=1){
        setfilterSucces(true)
        clearFilters()
      }}
    }
        );
  }
  const getData =async () => {
    console.log('el otro', apiURL)
    fetch(apiURL)
      .then(res => res.json())
      .then(res => {
        if(res.results !=undefined){
          setLastPage(res.info.next)
          setData(data.concat(res.results))
          setisLoading(false)
        } else {
          setfilterSucces(true)
          clearFilters()
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
    setpageCurrent(pageCurrent + 1)
    setisLoading(true)
  } }


  const handleChange = (text) =>{
    setpageCurrent(1)
    setSearch(text)
  }
  const rerender = () =>{
    setpageCurrent(1)
    moveToTop()
    getFiltertData()
  }
  const clearFilters = () =>{
    setSearch("")
    clearModalFilters()
}
const clearModalFilters = () =>{
  setStatus("")
  setSpecies("")
  setType("")
  setGender("")
}
const characterTab = (character) =>{
  setCharacterModal(true)
  setCharacterModalItem(character)
  setCharacterLocation(character.location)
  setCharacterOrigin(character.origin)
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
        handleChange(text); setpageCurrent(1)}
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
      <BusquedaVaciaModal
        filterSucces={filterSucces}
        setfilterSucces={setfilterSucces}
        rerender={rerender}/>
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