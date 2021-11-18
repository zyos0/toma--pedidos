import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Plates from "./pages/Plates/Plates";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/plates" element={<Plates />} />
                <Route path="/layout" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
