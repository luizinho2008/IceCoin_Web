import React, { useEffect, useState } from 'react';
import './styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
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
            <p style={{color: "white", fontWeight: "bolder"}}>
                O IceCoin é uma criptomoeda emergente que combina tecnologia de
                ponta com um conceito inovador de economia digital.
                Criado para representar um avanço na forma como lidamos com dinheiro
                online, o IceCoin oferece segurança, rapidez e um sistema de
                transações descentralizado que promete mudar o mercado financeiro.
                Com uma base sólida em blockchain e uma crescente aceitação
                no mercado, o IceCoin é mais do que apenas uma moeda digital;
                é uma nova forma de interagir com a economia global.
            </p>
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