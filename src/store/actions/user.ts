import { createAction } from '@reduxjs/toolkit';

export enum UserActionType {
    SET_USER_AUTH = 'SET_USER_AUTH',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    UPDATE_USERNAME = 'UPDATE_USERNAME',
}

// export const updateUserNameLegacy = (username: string) => {
//     return {
//         action: UserActionType.UPDATE_USERNAME,
//         payload: username,
//     };
// };

export const updateUsername = createAction<string>(
    UserActionType.UPDATE_USERNAME
);
export const updatePassword = createAction<string>(
    UserActionType.UPDATE_PASSWORD
);

