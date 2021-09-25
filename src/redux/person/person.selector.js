import { createSelector} from "reselect";

const selectPerson = state =>state.person   

export const selectCurrentPerson = createSelector(
    [selectPerson],
    person => person.selected_person
)

export const selectCurrentPersonLoading = createSelector(
    [selectPerson],
    person => !!person.selected_person
)

