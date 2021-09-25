import ItemActionTypes from './item.type'

const INITIAL_STATE = {
    currentItem:null,
    error:null,
}


const itemReducer= (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case ItemActionTypes.SELECT_CURRENT_ITEM_SUCCESS:
            return {
                ...state,
                currentItem:action.payload,
                error:null
            }
        case ItemActionTypes.SELECT_CURRENT_ITEM_FAILURE:
            return{
                ...state,
                error:action.payload
            }
        default:
            return state
    }
 
}

export default itemReducer