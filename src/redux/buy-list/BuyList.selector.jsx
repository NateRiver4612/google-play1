import { createSelector } from "reselect"
const selectBuy = state =>state.buy 

export const selectBuyItems = createSelector(
    [selectBuy],
    buy => buy.buyItems
)

