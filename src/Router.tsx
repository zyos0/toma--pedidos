import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Plates from './pages/Plates/Plates';
import { baseRoute, loginRoute, platesRoute } from './constants/routes';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={baseRoute} element={<Login />} />
                <Route path={loginRoute} element={<Login />} />
                <Route path={platesRoute} element={<Plates />} />
                <Route path="*" element={<span>OOPS! 404</span>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
