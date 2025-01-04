import React from 'react';
import './styles/Usuario.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Usuario = () => {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // A requisição já irá enviar automaticamente os cookies, incluindo o token
        axios
            .get("https://icecoin.onrender.com/api/protected", { withCredentials: true })
            .then((resposta) => {
                // Agora você pode acessar os dados do usuário retornados pelo backend
                setNome(resposta.data.user.nome);
            })
            .catch((erro) => {
                console.error("Erro ao acessar dados do usuário:", erro);
                navigate("/login");  // Se não conseguir acessar, redireciona para login
            });
    }, []);

    const sair = () => {
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
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