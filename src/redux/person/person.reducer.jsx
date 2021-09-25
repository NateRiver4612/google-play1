import PersonActionTypes from "./person.type";

const INITIAL_STATE = {
    selected_person:null,
    error:null    
}

const personReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case PersonActionTypes.SELECT_PERSON_SUCCESSS:
            return{
                ...state,
                selected_person:action.payload,
                error:null
            }
        case PersonActionTypes.SELECT_PERSON_FAILURE:
            return{
                ...state,
                error:action.payload,
                selected_person:[]
            }
        default:
            return state
    }
}

export default personReducer
