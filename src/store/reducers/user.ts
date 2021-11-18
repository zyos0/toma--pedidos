import { updateUsername, UserActions, UserActionType } from '../actions/user';

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

const updateUsernameApplier = (state: UserState, action: UserActions) => {
    return {
        ...state,
        username: action.payload,
    };
};

export const userReducer = (state = getInitialState(), action:UserActions) => {
    switch (action.type) {
        case UserActionType.UPDATE_USERNAME:
            return updateUsernameApplier(state, action);
    }
    return state;
};
