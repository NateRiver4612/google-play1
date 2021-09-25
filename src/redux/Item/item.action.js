import ItemActionTypes from './item.type'


export const selectCurrentItemStart = (item)=>({
    type:ItemActionTypes.SELECT_CURRENT_ITEM_START,
    payload:item
})

export const selectCurrentItemSuccess = (currentItem)=>({
    type:ItemActionTypes.SELECT_CURRENT_ITEM_SUCCESS,
    payload:currentItem
})

export const selectCurrentItemFailure = (error)=>({
    type:ItemActionTypes.SELECT_CURRENT_ITEM_FAILURE,
    payload:error,
})
