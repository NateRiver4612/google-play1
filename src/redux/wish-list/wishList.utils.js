export const addItemToList=(listItems,ItemToAdd)=>{
    console.log(ItemToAdd['item'].price)
    const checkExistence = listItems.find(listItem =>
        listItem['item'].id === ItemToAdd['item'].id && listItem['doc'] === ItemToAdd['doc']   
    )
    if(checkExistence){
        return listItems
    }
    return [...listItems,ItemToAdd]
}

export const removeItemFromList = (listItems,ItemToRemove)=>{
    if(ItemToRemove['doc'] === 'movies'){
        return listItems.filter(listItem => 
            listItem['doc']==='books'  || 
            (listItem['doc'] === 'movies' && listItem['item'].id !== ItemToRemove['item'].id) 
        )
    }
    if(ItemToRemove['doc'] === 'books'){
        return listItems.filter(listItem => 
            listItem['doc']==='movies'  || 
            (listItem['doc'] === 'books' && listItem['item'].id !== ItemToRemove['item'].id) 
        )
    }
    
}
