import SearchActionType from "./searchAction.type"

const INITIAL_STATE={
    searchField:''
}

const searchReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SearchActionType.SEARCH_ITEM:
            return{
                ...state,
                searchField:action.payload
            }
        default:
            return state
    }
}

export default searchReducer 