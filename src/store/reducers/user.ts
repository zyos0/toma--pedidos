import { updateUsername } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';

export interface UserState {
    username: string;
    password: string;
    authenticated: boolean;
}

const getInitialState = (): UserState => {
    return {
        username: '',
        password: '',
        authenticated: false,
    };
};

const updateUsernameApplier = (state: UserState, action: any) => {
    const userName = action.payload;
    state.username = userName;
};

const userReducerBuilder = (builder: any) => {
    builder.addCase(updateUsername, updateUsernameApplier);
};

export const userReducer = createReducer(getInitialState(), userReducerBuilder);
