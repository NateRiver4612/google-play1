import NavBarActionTypes from './navbar.type';
import {toggleNavBar} from './navbar.utils'


const INITIAL_STATE = {
    panel:'panel1',
};


const navbarReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case NavBarActionTypes.TOGGLE_NAV_BAR:
            return{
                ...state,
                panel: toggleNavBar(action.payload)
            }
    default:
        return state
    }
}

export default navbarReducer;