import BuyActionTypes from "./BuyListAction.type";

export const BuyItemStart = (item)=>({
    type:BuyActionTypes.BUY_ITEM_START,
    payload:item
})

export const BuyItemSuccess = (data)=>({
    type:BuyActionTypes.BUY_ITEM_SUCCESS,
    payload:data
})

export const BuyItemFailure = (error)=>({
    type:BuyActionTypes.BUY_ITEM_FAILURE,
    payload:error
})

export const SetBuyItems = (items)=>({
    type:BuyActionTypes.SET_BUY_ITEMS_FROM_FIREBASE,
    payload:items
})

export const ClearBuyItems = ()=>({
    type:BuyActionTypes.CLEAR_BUY_ITEMS,
})

