import {call,all,put,takeLatest,select} from '@redux-saga/core/effects'
import BuyActionTypes from './BuyListAction.type'
import {getUserBuyItems} from '../../firebase/firebase.utils'
import { selectCurrentUser } from '../user/user.selector'
import {ClearBuyItems, BuyItemSuccess,SetBuyItems, BuyItemFailure } from './BuyList.action'
import { selectBuyItems } from './BuyList.selector'
import UserActionTypes from '../../redux/user/user.type'
import { removeItem } from '../wish-list/wishList.action'

export function * buyItem({payload:{doc,item,date}}){
    try{
        yield put(BuyItemSuccess({doc,item,date}))
        yield put(removeItem({doc,item}))
    }catch(error){
        yield put(BuyItemFailure(error.message))
    }
}

export function * updateToFirestore(){
    const currentUser = yield select(selectCurrentUser)

    if(currentUser){
        const buyItems = yield select(selectBuyItems)
        const userBuyRef = yield getUserBuyItems(currentUser.id)
        yield userBuyRef.update({buyItems})
    }

}

export function  * clearBuyItems(){
    yield put(ClearBuyItems())
}

export function * setBuyItemsFromFirebase(){
    const currentUser = yield select(selectCurrentUser)
    if(currentUser){
        const userBuyRef = yield getUserBuyItems(currentUser.id)
        const snapShot = yield userBuyRef.get()
        const {buyItems} = yield snapShot.data()
        yield put(SetBuyItems(buyItems))
    }
}

export function * onBuyItem(){
    yield takeLatest(BuyActionTypes.BUY_ITEM_START,buyItem)
}

export function* onBuyItemsSuccess(){
    yield takeLatest(BuyActionTypes.BUY_ITEM_SUCCESS,updateToFirestore)
}

export function * onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearBuyItems)
} 

export function * onSignInSuccess(){
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS,setBuyItemsFromFirebase)
}

export function * buySaga(){
    yield all([call(onBuyItem),call(onBuyItemsSuccess),call(onSignInSuccess),call(onSignOutSuccess)])
}