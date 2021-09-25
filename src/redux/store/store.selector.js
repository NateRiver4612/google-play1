import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const selectStore = (state) =>state.store


export const selectItems = createSelector(
    [selectStore],
    store=> store.Items
)

export const selectMovies = createSelector(
    [selectItems],
    Items => Items['movies']
);

export const selectBooks = createSelector(
    [selectItems],
    Items =>Items['books']
)

export const selectItemsByOption = memoize((option)=>createSelector(
    [selectItems],
    Items => Items? Items[option]: []
))

export const selectStoreIsLoaded = createSelector(
    [selectStore],
    store => !!store.Items
)

export const selectStoreFetching = createSelector(
    [selectStore],
    store => store.isFetching
);


export const selectMoviesByType = memoize((category) => createSelector(
    [selectItems],
    Items => Items? Items['movies'][category]: []
));

export const selectBooksByType = memoize((category) => createSelector(
    [selectItems],
    Items => Items? Items['books'][category]: []
));

export const selectUserComments = createSelector(
    [selectStore],
    store => store.UserComments
);


export const selectRelatedCollection = ((doc,category)=>createSelector(
    [selectItems],
    Items => Items ? Items[doc][category]:[]
));

export const selectItemDetail = ((doc,category,id) => createSelector(
    [selectItems],
    Items => Items? Items[doc][category][id] : [] 
));


export const getCurrentItem = createSelector(
    [selectStore],
    store => store.currentItem
)

export const getCurrentItemLoaded = createSelector(
    [selectStore],
    store => !!store.currentItem
)











