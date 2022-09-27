import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Modal, Input, onChangeText } from 'react-native';

const Characters = () =>{

const [data, setData] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [pageCurrent, setpageCurrent] = useState(1)
  const [search, setSearch] = useState("")
  const [lastPage, setLastPage] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus]= useState("");
  const [showError, setShowError] = useState(false);

  


 const apiURL = "https://rickandmortyapi.com/api/character/?page="+pageCurrent+"&name="+search+"&status="+status+"&species="+"&type="+"&gender="


  useEffect(() => {
    console.log(search)
    console.log(status)
    setisLoading(true)
    getData()
    console.log(apiURL)
    //getSearch()
    return () => {

    }
  }, [pageCurrent])

  const geFiltertData =async () => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => {
        if(res.results !=undefined){
        setLastPage(res.info.next)
        setData(res.results)
        setisLoading(false)
      }
        else{
            setShowError(true)
            
        }
    }
        );
  }

  const getData =async () => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => {
        setLastPage(res.info.next)
        setData(data.concat(res.results))
        setisLoading(false)
      });
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
    console.log("page current")
    setpageCurrent(pageCurrent + 1)
    setisLoading(true)
  } }
  const handleChange = (text) =>{
            setpageCurrent(1)
            console.log(text)
            setSearch(text)
            rerender()
  }
  const rerender = () =>{
        setpageCurrent(1)
        console.log(apiURL)
        geFiltertData()
  }

  return (

    <>
   
    <TextInput style={styles.textInputStyle}
        placeholder= "Ingrese nombre"
        value={search}
        onChangeText={(text) => 
        handleChange(text)
        }
        />
    <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text> Boton </Text>
    </TouchableOpacity>
        <FlatList
              style={styles.container}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.2} />
              
        <Modal transparent={true} visible={showModal} animationType="slide">
            <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
            <View>
                <Text> status:  </Text>
                <TouchableOpacity><Text onPress={() => setStatus("dead")}> Dead </Text></TouchableOpacity>
                <TouchableOpacity><Text onPress={() => setStatus("alive")}> Alive </Text></TouchableOpacity>
                <TouchableOpacity><Text onPress={() => setStatus("unknown")}> Unknown </Text></TouchableOpacity>
            </View>
            <Text onPress={() => setShowModal(false)}>Cerrar</Text>
            <Text onPress={() => rerender()}>Render</Text>
            </View>
            </View>
        </Modal>
        <View>
                    <Modal transparent={true} visible={showError} animationType="slide">
                    <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                    <Text> No se encontró coincidencia  </Text>
                    
                    <Text onPress={() => setShowError(false)}>Cerrar</Text>
                    
                    </View> </View>
                    </Modal>
                </View>
                  
              </>

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
});
