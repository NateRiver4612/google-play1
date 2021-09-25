import StoreActionTypes  from "./store.type";

const INITIAL_STATE = {
    Items:null,
    UserComments:null,
    isFetching:false,
    errorMessage:undefined
};

const storeReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case StoreActionTypes.FETCH_COLLECTION_START:
        case StoreActionTypes.FETCH_USERS_START:
            return{
                ...state,
                isFetching:true   
            }
        case StoreActionTypes.FETCH_COLLECTION_SUCCESS:
            return{
                ...state,
                isFetching:false,
                Items:action.payload
            }
        case StoreActionTypes.FETCH_USERS_SUCCESS:
            return{
                ...state,
                isFetching:false,
                UserComments:action.payload
            }
        case StoreActionTypes.FETCH_COLLECTION_FAILURE:
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
    default:
        return state
    }
}

export default storeReducer;











