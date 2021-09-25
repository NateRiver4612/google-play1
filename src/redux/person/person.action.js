import PersonActionTypes from './person.type'

export const selectPersonStart = (info)=>({
    type:PersonActionTypes.SELECT_PERSON_START,
    payload:info
})

export const selectPersonSuccess = (person)=>({
    type:PersonActionTypes.SELECT_PERSON_SUCCESSS,
    payload:person
})

export const selectPersonFailure =(error)=>({
    type:PersonActionTypes.SELECT_PERSON_FAILURE,
    payload:error
})