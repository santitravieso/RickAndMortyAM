import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Modal, Input, onChangeText, SafeAreaView, ImageBackground } from 'react-native';
//const fondo = { uri: "https://wallpapercrafter.com/desktop/384199-TV-Show-Rick-and-Morty-Phone-Wallpaper.jpg" };
//const logo = { uri: "https://assets.stickpng.com/images/58f37720a4fa116215a9240f.png" };

import DefaultImage from '../../assets/fondo.jpg';
import DefaultImage2 from '../../assets/logo.png';

const logo = Image.resolveAssetSource(DefaultImage2).uri;
const fondo = Image.resolveAssetSource(DefaultImage).uri;


const Characters = () =>{

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
  const [gender, setGender] = useState("")
  const [characterModal, setCharacterModal] = useState(false)
  const [characterModalItem, setCharacterModalItem] = useState([])
  const [origin, setCharacterOrigin] = useState([])
  const [location, setCharacterLocation] = useState([])
  


 const apiURL = "https://rickandmortyapi.com/api/character/?page="+pageCurrent+"&name="+search+"&status="+status+"&species="+species+"&type="+type+"&gender="+gender


  useEffect(() => {
    setisLoading(true)
    getData()
    //getSearch()
    return () => {

    }
  }, [pageCurrent])

  const geFiltertData =async () => {
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
        setfilterSucces(true)
        clearFilters()
      }
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
  const renderItem = ({item}) => {
    return(
      <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => characterTab(item)}>
          <Image style={styles.itemImage} source={{uri: item.image}} />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      isLoading ?
      <View style ={styles.loader}>
        <ActivityIndicator size ="large"/>
      </View> : null
    )
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
    geFiltertData()
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


  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
     
    <>
    <ImageBackground source={{uri: fondo}} resizeMode="cover" style={styles.backgroundImage}>
    <Image source={{uri: logo}} style={styles.logo}></Image>
      <View style={styles.screen}>
      <TextInput style={styles.textInputStyle}
        placeholder= "Ingrese nombre"
        placeholderTextColor= '#7FFF00'
        value={search}
        onChangeText={(text) => {
        handleChange(text)}
        }
        />
      <View style={{flexDirection:"row", flex: 2}}> 
        <TouchableOpacity style={styles.butons} onPress={() => rerender()}>
            <Text style={styles.butonsText}> Apply </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butons} onPress={() => {setShowModal(true); clearModalFilters()}}>
            <Text style={styles.butonsText}> More Filters </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butons} onPress={() => clearFilters()}>
            <Text style={styles.butonsText}> Clear Filters </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:28}}>
      <FlatList
          style={styles.container}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2} 
      />
      </View>
          
      <Modal transparent={true} visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View style={styles.fixedFilters}>
              <Text style={styles.filterTitle}> Status:  </Text>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => setStatus("dead")}> Dead </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => setStatus("alive")}> Alive </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.textFilters} onPress={() => setStatus("unknown")}> Unknown </Text></TouchableOpacity>
          </View>
          <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Species:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Ingrese especie"
                placeholderTextColor= '#7FFF00'
                value={species}
                onChangeText={newText => setSpecies(newText)}
              />
          </View>
          <View style={styles.textInputFilters}>
              <Text style={styles.filterTitle}> Tipo:  </Text>
              <TextInput style={styles.filterTextInputStyle}
                placeholder= "Ingrese Tipo"
                placeholderTextColor= '#7FFF00'
                value={type}
                onChangeText={newText => setType(newText)}
              />
          </View>
          <View style={styles.fixedFilters2} >
              <Text style={styles.filterTitle}> Genero:  </Text>
              <View style={styles.fixedFilters3}>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => setGender("female")}> Female </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => setGender("male")}> Male </Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.genderFilters} onPress={() => setGender("genderless")}> Genderless </Text></TouchableOpacity>
              <TouchableOpacity><Text  style={styles.genderFilters}onPress={() => setGender("unknown")}> Unknown </Text></TouchableOpacity>
              </View>
          </View>
          <Text style={styles.filterTitle} onPress={() => {rerender(); setShowModal(false)}}>Apply</Text>
          <Text style={styles.filterTitle} onPress={() => setShowModal(false)}>Cerrar</Text>
          </View>
          </View>
      </Modal>
      <Modal transparent={true} visible={filterSucces} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View>
              <Text> No existe ningun personaje con los filtros seleccionados  </Text>
          </View>
          <Text onPress={() => {setfilterSucces(false); rerender()}}>Cerrar</Text>
          </View>
          </View>
      </Modal>    
      <Modal transparent={true} visible={characterModal} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCardChar}>
            <View style={styles.itemRowModal}>
              <Text style={styles.itemTextChar}>{characterModalItem.name}</Text>
              <Image style={styles.itemImage} source={{uri: characterModalItem.image}} />
              <Text style={styles.itemText}>{characterModalItem.status}</Text>
              <Text style={styles.itemText}>{characterModalItem.species}</Text>
              <Text style={styles.itemText}>{characterModalItem.type}</Text>
              <Text style={styles.itemText}>{characterModalItem.gender}</Text>
              <Text style={styles.itemText}>{origin.name}</Text>
              <Text style={styles.itemText}>{location.name}</Text>
            </View>
            <Text style={styles.filterTitle} onPress={() => setCharacterModal(false)}>Cerrar</Text>
          </View>
          </View>
      </Modal>
      </View>
      </ImageBackground>    
              </>
              </SafeAreaView>
  )
}

export default Characters;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  logo: {
    height: '19%',
    width:'100%',
    marginTop: '30%'
  },
  backgroundImage:{
    height:'100%',
    width:'100%',
    justifyContent: 'center'
  },
  butons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginHorizontal: 3,
    marginBottom:15,
  },
  butonsText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#7FFF00',
    alignContent: 'center',
    
  },
  screen:{
    alignSelf: 'center'
  },
  itemRow: {
    marginBottom: '10%',
    borderWidth: 5,
    borderColor: '#7FFF00',
    backgroundColor: 'black',
    alignContent: 'center',
    alignSelf: 'center'
  },
  itemRowModal: {
    marginBottom: '10%',
    backgroundColor: 'black',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '2%'
  },

  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    margin: '4%'
  },
  itemText: {
    fontSize: 16,
    padding: 5,
    color: '#7FFF00',
    alignSelf: 'center'
  },
  itemTextChar: {
    fontSize: 25,
    padding: 5,
    color: '#7FFF00',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  textInputStyle: {
    borderWidth: 1,
    paddingLeft: '8%',
    marginTop: '0%',
    marginBottom: '5%',
    alignSelf: 'center',
    flex: 2,
    borderColor: '#7FFF00',
    backgroundColor: 'black',
    textDecorationColor: 'white',
    color: '#7FFF00',
    alignContent: 'center',
    maxWidth: '41%',
    width: 200,
    textAlign: 'center',
    paddingRight: '8%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '90%',
    height: '50%',
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7FFF00',
    borderWidth: '5%'
  },
  modalCardChar: {
    width: '90%',
    height: '60%',
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7FFF00',
    borderWidth: '5%'
  },
  fixedFilters: {
    flexDirection: "row",
    marginTop: '10%',
    flex: 1,
    marginBottom: '10%'
  },
  fixedFilters2: {
    flexDirection: "column",
    marginTop: '1%',
    flex: 2,
    marginBottom: '10%',
    alignContent: 'center',
    alignSelf: 'center'
  },
  fixedFilters3:{
    flexDirection: "row",
    marginTop: '1%',
    flex: 1,
    marginBottom: '1%'
  },
  textInputFilters: {
    flexDirection: "row",
    marginTop: '1%',
    flex: 2,
    marginBottom: '5%',
  },
  textFilters: {
    borderColor: '#7FFF00',
    borderWidth: '1%',
    borderRadius: 10,
    marginHorizontal: '2.8%',
    flex: 1,
    color: '#7FFF00',
    alignSelf: 'center',
    alignContent: 'center',
    paddingTop: '1%',
    padding: '2%'
  },
  filterTitle: {
    color: '#7FFF00',
    flex: 1,
    fontSize: 24
  },
  filterTextInputStyle: {
    borderWidth: 1,
    marginBottom: '5%',
    borderColor: '#7FFF00',
    backgroundColor: 'black',
    textDecorationColor: 'white',
    color: '#7FFF00',
    width: 200,
    textAlign: 'center',
    marginRight: '5%',
    padding: '2%',
  },
  genderFilters: {
    borderColor: '#7FFF00',
    borderWidth: '1%',
    borderRadius: 10,
    marginHorizontal: '1%',
    flex: 1,
    color: '#7FFF00',
    alignSelf: 'center',
    alignContent: 'center',
    paddingTop: '1%',
    padding: '2%'
  }

});
