import {takeLatest,call,all, put} from 'redux-saga/effects';
import ItemActionTypes from "./item.type";
import { selectCurrentItemSuccess,selectCurrentItemFailure } from "./item.action";


export function * selectItem({payload:{id,type}}){
    try{
        yield put(selectCurrentItemSuccess({id,type}))
    }catch(error){
        yield put(selectCurrentItemFailure(error.message))
    }
}

export function * onSelectItem(){
    yield takeLatest(ItemActionTypes.SELECT_CURRENT_ITEM_START,selectItem)
}

export function * itemSaga(){
    yield all([call(onSelectItem)])
}