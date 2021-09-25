import UserActionTypes from "./user.type";

export const signInWithGoggleStart = ()=>({
    type:UserActionTypes.GOOGLE_SIGN_IN_START
})

export const signOutStart = ()=>({
    type:UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = ()=>({
    type:UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error)=>({
    type:UserActionTypes.SIGN_OUT_FAILURE,
    payload:error
})


export const signInSuccess = (user)=>({
    type:UserActionTypes.SIGN_IN_SUCCESS,
    payload:user
})

export const checkUserSession = ()=>({
    type:UserActionTypes.CHECK_USER_SESSION,
})

export const signInFailure = (error)=>({
    type:UserActionTypes.SIGN_IN_FAILURE,
    payload:error
})

export const toggleUser = ()=>({
    type:UserActionTypes.TOGGLE_USER_HIDDEN
})