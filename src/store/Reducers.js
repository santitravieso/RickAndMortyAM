import { createSlice } from '@reduxjs/toolkit';

export const Reducers = createSlice({
    name: 'application',
    initialState:{
        data: [],
        isLoading: false,
        pageCurrent: 1,
        search: "",
        lastPage: "",
        showModal:false,
        status:"", 
        filterSucces:false,
        species:"",
        type:"",
        // const [character, setCharacter]= useState({});
        gender:"",
        characterModal:false,
        characterModalItem:[],
        origin:[],
        location:[],
        isFavorite:false,
        noFavs:true,
        favs:[],
        comment: ""
    },
    reducers:{
        setData:(state,action) =>
        {
            state.data = action.payload
        },
        setisLoading:(state,action) =>
        {
            state.isLoading = action.payload
        },
        setpageCurrent:(state,action) =>
        {   
            state.pageCurrent = action.payload
        },
        setSearch:(state,action) =>
        {
            state.search = action.payload
        },
        setLastPage:(state,action) =>
        {
            state.lastPage = action.payload
        },
        setShowModal:(state,action) =>
        {
            state.showModal = action.payload
        },
        setStatus:(state,action) =>
        {
            state.status = action.payload
        },
        setfilterSucces:(state,action) =>
        {   
            state.filterSucces = action.payload
        },
        setSpecies:(state,action) =>
        {
            state.species = action.payload
        },
        setType:(state,action) =>
        {
            state.type = action.payload
        },
        setGender:(state,action) =>
        {
            state.gender = action.payload
        },
        setCharacterModal:(state,action) =>
        {
            state.characterModal = action.payload
        },
        setCharacterModalItem:(state,action) =>
        {
            state.characterModalItem = action.payload
        },
        setCharacterOrigin:(state,action) =>
        {
            state.origin = action.payload
        },
        setCharacterLocation:(state,action) =>
        {
            state.location = action.payload
        },
        setIsFavorite:(state,action)  =>
        {
            state.isFavorite = action.payload
        },
        setNoFavs:(state,action)  =>
        {
            state.noFavs = action.payload
        },
        setFavs:(state,action)  =>
        {
            state.favs = action.payload
        },
        setCharacterComment:(state,action)  =>
        {
            state.comment = action.payload
        },
    }
})


export const {setData, setisLoading, setpageCurrent, setSearch, setFavs, setLastPage, setShowModal, setStatus, setfilterSucces, setSpecies, setType, setGender, setCharacterModal, setCharacterModalItem, setCharacterOrigin, setCharacterLocation,setNoFavs, setIsFavorite, setCharacterComment } = Reducers.actions;

export default Reducers.reducer;
