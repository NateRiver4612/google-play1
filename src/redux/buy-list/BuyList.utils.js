export const buyItem = (buyItems,itemToBuy)=>{
    const checkExist = buyItems.find(item=>
        item['doc'] === itemToBuy['doc'] && item['item'].id === itemToBuy['item'].id 
    )
    if(checkExist){
        return buyItems
    }
    return [...buyItems,itemToBuy]
}