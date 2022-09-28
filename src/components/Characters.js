import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Modal, Input, onChangeText, SafeAreaView } from 'react-native';

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
        <Image style={styles.itemImage} source={{uri: item.image}} />
        <Text style={styles.itemText}>{item.name}</Text>
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


  return (
    <SafeAreaView>
    <>
   
      <TextInput style={styles.textInputStyle}
        placeholder= "Ingrese nombre"
        value={search}
        onChangeText={(text) => {
        handleChange(text)}
        }
        />
      <TouchableOpacity onPress={() => rerender()}>
          <Text> apply </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setShowModal(true); clearModalFilters()}}>
          <Text> Mas Filtros </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearFilters()}>
          <Text> clear filters </Text>
      </TouchableOpacity>
      <FlatList
          style={styles.container}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2} 
      />
          
      <Modal transparent={true} visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <View style={styles.fixedFilters}>
              <Text> status:  </Text>
              <TouchableOpacity><Text onPress={() => setStatus("dead")}> Dead </Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={() => setStatus("alive")}> Alive </Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={() => setStatus("unknown")}> Unknown </Text></TouchableOpacity>
          </View>
          <View style={styles.textInputFilters}>
              <Text> Species:  </Text>
              <TextInput style={styles.textInputStyle}
                placeholder= "Ingrese especie"
                value={species}
                onChangeText={newText => setSpecies(newText)}
              />
          </View>
          <View style={styles.textInputFilters}>
              <Text> Tipo:  </Text>
              <TextInput style={styles.textInputStyle}
                placeholder= "Ingrese Tipo"
                value={type}
                onChangeText={newText => setType(newText)}
              />
          </View>
          <View style={styles.fixedFilters} >
              <Text> Genero:  </Text>
              <TouchableOpacity><Text onPress={() => setGender("female")}> Female </Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={() => setGender("male")}> Male </Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={() => setGender("genderless")}> Genderless </Text></TouchableOpacity>
              <TouchableOpacity><Text onPress={() => setGender("unknown")}> Unknown </Text></TouchableOpacity>
          </View>
          <Text onPress={() => setShowModal(false)}>Cerrar</Text>
          <Text onPress={() => {rerender(); setShowModal(false)}}>Render</Text>
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
              </></SafeAreaView>
  )
}

export default Characters;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff'
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1
  },

  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },
  itemText: {
    fontSize: 16,
    padding: 5
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 45,
    borderColor: '#009688',
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedFilters: {
    flexDirection: "row"
  },
  /*textInputFilters: {
    flexDirection: "row"
  }*/
});
