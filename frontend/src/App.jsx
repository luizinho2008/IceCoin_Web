import { useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Carteira from './Carteira';
import Usuario from './Usuario';
import Desenvolvedores from './Desenvolvedores';
import Cotacao from './Cotacao';
import Blockchain from './Blockchain';
import SeusHashs from './SeusHashs';
import GerarEndereco from './GerarEndereco';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/carteira' element={<Carteira />} />
                <Route path='/usuario' element={<Usuario />} />
                <Route path='/desenvolvedores' element={<Desenvolvedores />} />
                <Route path='/cotacao' element={<Cotacao />} />
                <Route path='/blockchain' element={<Blockchain />} />
                <Route path='/seushashs' element={<SeusHashs />} />
                <Route path='/gerarendereco' element={<GerarEndereco />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App