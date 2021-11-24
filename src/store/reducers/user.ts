import { createReducer } from '@reduxjs/toolkit';
import { UserActions } from '../actions/user';

export interface UserState {
    authenticated: boolean;
    authenticationInProgress: boolean;
    userData: any;
    authenticationError: { message: string } | null;
}

const getInitialState = (): UserState => {
    return {
        authenticated: false,
        authenticationInProgress: false,
        userData: null,
        authenticationError: null,
    };
};

const onLoginSuccess = (
    state: UserState,
    { payload }: ReturnType<typeof UserActions.onLoginSuccess>
) => {
    return {
        ...state,
        userData: payload,
    };
};

const onLoginError = (
    state: UserState,
    { payload }: ReturnType<typeof UserActions.onLoginError>
) => {
    return {
        ...state,
        authenticationError: { message: payload.message },
    };
};

const toggleLoadingState = (
    state: UserState,
    { payload }: ReturnType<typeof UserActions.toggleLoadingState>
) => {
    return {
        ...state,
        authenticationInProgress: payload,
    };
};

const resetUserState = (state: UserState) => getInitialState();

const userReducerBuilder = (builder: any) => {
    builder.addCase(UserActions.onLoginSuccess, onLoginSuccess);
    builder.addCase(UserActions.onLoginError, onLoginError);
    builder.addCase(UserActions.toggleLoadingState, toggleLoadingState);
    builder.addCase(UserActions.resetUserState, resetUserState);
};

export const userReducer = createReducer(getInitialState(), userReducerBuilder);
