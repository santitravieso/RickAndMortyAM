import { LOG_API_PENDING, LOG_API_SUCCESS } from "../actionTypes/apiActionTypes";

export function handleLoading(){
    return (dispatch) => {
        let apiData = {apiURL: "https://rickandmortyapi.com/api/character/?page="+pageCurrent+"&name="+search+"&status="+status+"&species="+species+"&type="+type+"&gender="+gender}
    }
}


export function logApiPending(){
    return{
        type: LOG_API_PENDING
    }
}
export function logApiSuccess(apiData){
    return{
        type: LOG_API_SUCCESS,
        payload: apiData
    }
}
