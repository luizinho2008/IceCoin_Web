import { useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Carteira from './Carteira';
import Usuario from './Usuario';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/carteira' element={<Carteira />} />
                <Route path='/usuario' element={<Usuario />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App