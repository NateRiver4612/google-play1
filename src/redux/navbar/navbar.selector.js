import { createSelector } from 'reselect';

const selectNavbar = state => state.navbar;

export const selectNavBar = createSelector(
    [selectNavbar],
    navbar => navbar.panel
)












