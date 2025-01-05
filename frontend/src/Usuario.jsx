import React from 'react';
import './styles/Usuario.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Usuario = () => {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://icecoin.onrender.com/api/protected", { withCredentials: true })
        .then((resposta) => {
            setNome(resposta.data.user.nome);
        })
        .catch((erro) => {
            console.error("Erro ao acessar dados do usuário:", erro);
            navigate("/login");
        });
    }, []);

    const sair = () => {
        axios.get("https://icecoin.onrender.com/api/logout", { withCredentials: true })
        .then((resposta) => {
            console.log(resposta);
        })
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