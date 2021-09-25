import { call,all ,takeLatest, put} from "@redux-saga/core/effects";
import UserActionTypes from "./user.type";
import {signInSuccess, signInFailure,signOutFailure,signOutSuccess} from '../../redux/user/user.action'
import { provider,auth ,createUserProfileDocument} from "../../firebase/firebase.utils";
import { getCurrentUser } from "../../firebase/firebase.utils";
export function* googleSignIn(){
    try{
         const {user}  = yield auth.signInWithPopup(provider)
         const userRef = yield call(createUserProfileDocument,user)
         const userSnapShot = yield userRef.get()

         yield put(signInSuccess({id:userSnapShot.id,...userSnapShot.data()}))
    }catch(error){
        yield put(signInFailure(error.message))
    }
}   

export function * isUserAuthenticated(){
    try{
        const user = yield getCurrentUser()
        const userRef = yield call(createUserProfileDocument,user)
        const userSnapShot = yield userRef.get()

        yield put(signInSuccess({id:userSnapShot.id,...userSnapShot.data()}))
    }catch(error){
        yield put(signInFailure(error.message))
    }
}

export function * signOut(){
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error.message))
    }
}

export function * onSignInWithGoogle(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,googleSignIn)
}

export function * onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}

export function * onSignOut(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function * userSaga(){
    yield all([call(onSignInWithGoogle),call(onCheckUserSession),call(onSignOut)])
}