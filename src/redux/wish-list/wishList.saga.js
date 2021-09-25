import {all,put,takeLatest,call,select} from '@redux-saga/core/effects'
import wishListActionType from './wishList.type'
import UserActionTypes from '../user/user.type'
import { getUserCart } from '../../firebase/firebase.utils'
import { selectCurrentUser } from '../user/user.selector'
import { selectListItems } from './wishList.selector'
import {clearList, setWishList} from './wishList.action'

export function * updateInFirebase(){
    const currentUser = yield select(selectCurrentUser)

    if(currentUser){
        const userWishListRef = yield getUserCart(currentUser.id) 
        const wishListItems = yield select(selectListItems)
        yield userWishListRef.update({wishListItems})
    }
}

export function * clearWishList(){
    yield put(clearList())
}

export function * setWishListFromFirebase(){
    const currentUser = yield select(selectCurrentUser)

    if(currentUser){
        const userWishListRef = yield getUserCart(currentUser.id) 
        const userWishListSnapshot = yield userWishListRef.get()
        const {wishListItems} = yield userWishListSnapshot.data()
        yield put(setWishList(wishListItems))
    }
}

export function *  onWishListChange(){
    yield takeLatest([
        wishListActionType.ADD_ITEM,
        wishListActionType.REMOVE_ITEM,
    ],updateInFirebase)
}

export function * onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearWishList)
} 

export function * onSignInSuccess(){
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS,setWishListFromFirebase)
}

export  function * wishListSaga(){  
    yield all([call(onWishListChange),call(onSignOutSuccess),call(onSignInSuccess)])
}