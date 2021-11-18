import { UserState } from '../reducers/user';
import { createSelector } from '@reduxjs/toolkit';

const userStateSelector = (state: any): UserState => state.user;

export const userNameSelector = createSelector(
    userStateSelector,
    (userState) => userState.username
);
