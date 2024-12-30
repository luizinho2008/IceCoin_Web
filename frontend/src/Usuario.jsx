import React from 'react';
import './styles/Usuario.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Usuario = () => {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const carregaInfo = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            console.log("Decoded Payload:", decodedPayload);
            setNome(decodedPayload.nome);
        }
    }

    useEffect(() => {
        carregaInfo();
    }, []);

    const sair = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>
            <h1>Usuário: {nome}</h1>
            <button id="sair" onClick={sair}>Sair</button>
        </div>
    );
}

export default Usuario;