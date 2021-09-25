import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const  selectCart = state =>state.carts

export const selectCartCategories = memoize(option=> createSelector(
    [selectCart],
    carts => carts ? carts.cartCategories[option] : []
));

export const selectToggleCart = createSelector(
    [selectCart],
    carts => carts.hidden
)

export const selectCurrentCart = createSelector(
    [selectCart],
    carts => carts.currentCart
)



