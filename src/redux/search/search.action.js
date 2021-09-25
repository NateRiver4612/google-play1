import SearchActionType from "./searchAction.type";

export const SearchItem = (data)=>({
    type:SearchActionType.SEARCH_ITEM,
    payload:data
})

 