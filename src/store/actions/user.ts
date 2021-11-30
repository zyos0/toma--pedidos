import { createAction, Dispatch } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import { loginUrl } from '../../constants/endpoints';
import { decodeToken, setToken } from '../../utils/tokenManagement';

export enum UserActionType {
    ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS',
    ON_LOGIN_ERROR = 'ON_LOGIN_ERROR',
    TOGGLE_LOADING_STATE = 'TOGGLE_LOADING_STATE',
    RESET_USER_STATE = 'RESET_USER_STATE',
}

const onLoginSuccess = createAction<any>(UserActionType.ON_LOGIN_SUCCESS);

const onLoginError = createAction<Error>(UserActionType.ON_LOGIN_ERROR);

const toggleLoadingState = createAction<boolean>(
    UserActionType.TOGGLE_LOADING_STATE
);
const resetUserState = createAction<undefined>(UserActionType.RESET_USER_STATE);

export const loginUser = (userData: any) => async (dispatch: Dispatch) => {
    dispatch(resetUserState());
    dispatch(toggleLoadingState(true));

    try {
        const { data: response } = await httpClient.post(
            loginUrl,
            userData,
            false
        );
        const expirationDate = new Date(response.expiracion);
        setToken(response.token, expirationDate);
        //window.location.href = platesRoute;
        //handleLoginSuccess()

        dispatch(onLoginSuccess(decodeToken()));
    } catch (error) {
        dispatch(onLoginError(error as Error));
    }

    dispatch(toggleLoadingState(false));
};

export const UserActions = {
    onLoginSuccess,
    onLoginError,
    toggleLoadingState,
    resetUserState,
    loginUser,
};
