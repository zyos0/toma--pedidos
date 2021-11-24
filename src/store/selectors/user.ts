import { UserState } from '../reducers/user';
import { createSelector } from '@reduxjs/toolkit';

const userStateSelector = (state: any): UserState => state.user;

export const authenticationInProgressSelector = createSelector(
    userStateSelector,
    (userState) => userState.authenticationInProgress
);

export const authenticationErrorSelector = createSelector(
    userStateSelector,
    (userState) => userState.authenticationError
);

export const userIsAuthenticatedSelector = createSelector(
    userStateSelector,
    (userState)=>userState.authenticated
)
