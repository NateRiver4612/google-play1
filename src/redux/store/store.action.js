import StoreActionTypes from './store.type'
import {firestore} from '../../firebase/firebase.utils'
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


export const fetchCollectionsStart = ()=> ({
    type: StoreActionTypes.FETCH_COLLECTION_START,
});

export const fetchPeoplesStart =()=>({
    type:StoreActionTypes.FETCH_PEOPLE_START
})

export const pushUserCommentStart = (userData)=>({
    type:StoreActionTypes.PUSH_USER_COMMENT,
    payload:userData
})

export const fetchUsersStart = (option)=>({
    type:StoreActionTypes.FETCH_USERS_START,
    payload:option
})


export const fetchUsersSuccess = (users)=>({
    type:StoreActionTypes.FETCH_USERS_SUCCESS,
    payload:users
})

export const fetchUsersFailure = (error)=>({
    type:StoreActionTypes.FETCH_USERS_FAILURE,
    payload:error
})




export const fetchPeoplesSuccess =(people)=>({
    type:StoreActionTypes.FETCH_COLLECTION_SUCCESS,
    payload:people
})

export const fetchPeopleFailure =()=>({

})


export const fetchCollectionSuccess = (collection) =>({
    type:StoreActionTypes.FETCH_COLLECTION_SUCCESS,
    payload : collection
})

export const fetchCollectionFailure = (errorMessage)=>({
    type:StoreActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage.message
})


export const fetchCollectionAsync = (document)=>{
    return dispatch=>{
        const collectionRef = firestore.collection('store');

        dispatch(fetchCollectionsStart());

        collectionRef.doc(document).get().then(snapShot=>{
            const {categories} = snapShot.data()
            const collectionMap = convertCollectionsSnapshotToMap(categories)
            dispatch(fetchCollectionSuccess(collectionMap))
        }).catch(error=>dispatch(fetchCollectionFailure(error.message)))

}
}


