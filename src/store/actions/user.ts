export enum UserActionType {
    SET_USER_AUTH = 'SET_USER_AUTH',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    UPDATE_USERNAME = 'UPDATE_USERNAME',
}

export interface UserActions {
    type: UserActionType;
    payload?: any;
}

export const updateUsername = (username: string): UserActions => {
    return {
        type: UserActionType.UPDATE_USERNAME,
        payload: username,
    };
};
