import React, { useEffect, useState } from 'react';
import './styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const logar = async (event) => {
        event.preventDefault();

        if (!nome || !senha) {
            alert('Preencha os campos corretamente.')
            return;
        }

        axios.post("https://icecoin.onrender.com/api/authenticate", {nome, senha}, {withCredentials: true})
        .then(resposta => {
            console.log(resposta);
            navigate("/carteira");
        })
        .catch(erro => {
            console.log(erro);
        })
    };


    return (
        <div>
            <nav id="nav">
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>
            <form id="form" onSubmit={logar} style={{ color: 'white' }}>
                <label>Nome: </label>
                <input
                    type="text"
                    id="nome"
                    style={{ outline: 'none' }}
                    onChange={(e) => setNome(e.target.value)}
                />
                <br />
                <br />
                <label>Senha:</label>
                <input
                    type="password"
                    id="senha"
                    style={{ outline: 'none' }}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <br />
                <br />
                <button id="button">Enviar</button>
                <br />
                <br />
                <Link style={{ textDecoration: 'none' }} to="/cadastro">
                    <p id="linkagem">Não possui cadastro?</p>
                </Link>
            </form>
        </div>
    );
};

export default Login;