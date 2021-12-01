import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { platesReducer } from './reducers/plates';
import { clientsReducer } from './reducers/clients';
import { invoiceReducer } from './reducers/invoices';

export const store = configureStore({
    reducer: {
        user: userReducer,
        plates: platesReducer,
        clients: clientsReducer,
        invoice: invoiceReducer,
    },
});
