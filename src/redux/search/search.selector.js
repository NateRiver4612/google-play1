import { createSelector } from "reselect"

const selectSearch = state => state.search

export const selectSearchField = createSelector(
    [selectSearch],
    search => search.searchField
)



