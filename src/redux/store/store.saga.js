import {takeLatest,call,all, put} from 'redux-saga/effects';
import StoreActionTypes from './store.type';
import { convertCollectionsSnapshotToMap,firestore } from '../../firebase/firebase.utils';
import { fetchCollectionFailure, fetchCollectionSuccess,fetchUsersSuccess} from './store.action';
import firebase from 'firebase/compat/app';

export function* fetchCollectionAll(){
    const collectionRef = yield firestore.collection('store')

    try{
        const snapShot = yield collectionRef.get()
        const Items = convertCollectionsSnapshotToMap(snapShot)

        yield put(fetchCollectionSuccess(Items))   

    }catch(error){
        yield put(fetchCollectionFailure(error.message))
    }
}

export function * pushUserComment({payload:{currentUser,value,randomID,comment,option,itemID}}){
    const userRef = firestore.collection('commentors').doc(option)
    try{

    const DATE = new Date()
    const dateString = DATE.toDateString().split(' ')
    const timeString = DATE.toTimeString().split(' ')
    const date = `${dateString},${timeString}`
    
    yield userRef.update({
        comments:
        firebase.firestore.FieldValue.arrayUnion({...currentUser,value,randomID,itemID,date,comment,option})
    })}catch(error){
        console.log(error)
    }
}


export function* fetchUsersComments({payload:option}){
    yield put(fetchUsersSuccess(option))
}

export function* onfetchCollectionsStart(){
    yield takeLatest(StoreActionTypes.FETCH_COLLECTION_START, fetchCollectionAll);
}

export function * onPushUserCommentStart(){
    yield takeLatest(StoreActionTypes.PUSH_USER_COMMENT,pushUserComment)
}

export function * onfetchUsersStart(){
    yield takeLatest(StoreActionTypes.FETCH_USERS_START,fetchUsersComments)
}

export function * storeSaga(){
    yield all([call(onfetchCollectionsStart),call(onPushUserCommentStart),call(onfetchUsersStart)])
}




