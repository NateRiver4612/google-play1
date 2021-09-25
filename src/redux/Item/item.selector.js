import { createSelector} from "reselect"

const selectItem = (state)=>state.item

export const getCurrentItem = createSelector(
    [selectItem],
    item => item.currentItem
)

export const getCurrentItemLoaded = createSelector(
    [selectItem],
    item=> !!item.currentItem
)

