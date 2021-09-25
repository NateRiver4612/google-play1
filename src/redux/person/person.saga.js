import {takeLatest,call,all,put} from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import { selectPersonSuccess,selectPersonFailure } from './person.action';
import PersonActionTypes from './person.type';

export function * selectPerson({payload:{name,job}}){
    const collectionRef = firestore.collection('people')
    try{
        const collection = yield collectionRef.doc(job)
        const snapShot = yield collection.get()
        const {people} = yield snapShot.data()
        var person = yield null
        yield people.map(pp=>{
            if(pp.name === name){ 
               person = pp
            }
        })
        yield put(selectPersonSuccess({job:job,...person}))
    }catch(error){
        yield put(selectPersonFailure(error.message))
    }
}

export function * onSelectPerson(){
    yield takeLatest(PersonActionTypes.SELECT_PERSON_START,selectPerson)
}

export function * personSaga(){
    yield all([call(onSelectPerson)])
}