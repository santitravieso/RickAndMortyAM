const initialState = {
    isLoading: false,
    error: false,
    data: "",
    pageCurrent: 1,
    lastPage:"", 
}


export default function apiReducer(state = initialState, action){
    switch (action.type){
        case LOG_API_PENDING:
            return{
                ...state,
                isLoading: true,
                error: false,
            }
        case LOG_API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                data: action.payload
            }
        default: 
            return state;
    }
}

