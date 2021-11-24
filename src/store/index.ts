import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { platesReducer } from './reducers/plates';

export const store = configureStore({
    reducer: { user: userReducer, plates: platesReducer },
});
