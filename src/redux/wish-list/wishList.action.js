import wishListActionType from "./wishList.type"

export const addItem = (item)=>({
    type:wishListActionType.ADD_ITEM,
    payload:item
})

export const removeItem = (item)=>({
    type:wishListActionType.REMOVE_ITEM,
    payload:item
})

export const clearList = ()=>({
    type:wishListActionType.CLEAR_LIST
})

export const setWishList = (items)=>({
    type:wishListActionType.SET_CART_FROM_FIREBASE,
    payload:items
})

export const toggleList = ()=>({
    type:wishListActionType.TOGGLE_LIST_HIDDEN
})



