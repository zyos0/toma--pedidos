import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Plates from './pages/Plates/Plates';
import {
    baseRoute,
    clientsRoute,
    invoicesRoute,
    loginRoute,
    platesRoute,
} from './constants/routes';
import { decodeToken, getToken } from './utils/tokenManagement';
import { useDispatch } from 'react-redux';
import { UserActions } from './store/actions/user';
import PrivateRoute from './components/PrivateRoute';
import Clients from './pages/Clients';
import InvoiceCreate from './pages/InvoiceCreate/InvoiceCreate';
import Invoices from './pages/Invoices/Invoice';
import InvoiceDetails from './pages/InvoiceDetail/InvoiceDetails';

const MainRouter = () => {
    const token = getToken();
    const dispatch = useDispatch();

    if (token) {
        const decodedUserData = decodeToken();
        dispatch(UserActions.onLoginSuccess(decodedUserData));
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={baseRoute} element={<Login />} />
                <Route path={loginRoute} element={<Login />} />
                <Route
                    path={platesRoute}
                    element={
                        <PrivateRoute>
                            <Plates />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={clientsRoute}
                    element={
                        <PrivateRoute>
                            <Clients />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={`${invoicesRoute}/new`}
                    element={
                        <PrivateRoute>
                            <InvoiceCreate />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={invoicesRoute}
                    element={
                        <PrivateRoute>
                            <Invoices />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={`${invoicesRoute}/:id`}
                    element={
                        <PrivateRoute>
                            <InvoiceDetails />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<span>OOPS! 404</span>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
