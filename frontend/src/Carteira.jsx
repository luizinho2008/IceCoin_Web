import React, { useEffect, useState } from 'react';
import './styles/Carteira.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import User from './imgs/user.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Carteira = () => {
    const [nome, setNome] = useState("");
    const [id, setId] = useState("");
    const [total, setTotal] = useState("");
    const navigate = useNavigate();

    // Função para validar e carregar informações do token
    const carregaInfo = () => {
        const token = Cookies.get('authToken');
        if (token) {
            try {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                console.log("Decoded Payload:", decodedPayload);
                setNome(decodedPayload.nome);
                setId(decodedPayload.id);
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                navigate("/login"); // Redireciona caso o token seja inválido
            }
        } else {
            navigate("/login"); // Redireciona caso o token não exista
        }
    };

    // Função para carregar o total do usuário
    const carregaTotal = () => {
        if (id) {
            axios
                .get(`https://icecoin.onrender.com/api/total/${id}`)
                .then((resposta) => {
                    console.log(resposta);
                    setTotal(resposta.data[0].total);
                })
                .catch((erro) => {
                    console.error("Erro ao buscar total:", erro);
                });
        }
    };

    // useEffect para carregar as informações do usuário ao montar o componente
    useEffect(() => {
        carregaInfo();
    }, []); // Executa uma vez ao montar o componente

    // useEffect para carregar o total sempre que o `id` mudar
    useEffect(() => {
        carregaTotal();
    }, [id]); // Observa alterações no `id`

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} id='logo' alt="logo icecoin" />
                <h2>ICECOIN</h2>
                <Link style={{ textDecoration: "none", marginLeft: 870 }} to="/desenvolvedores">
                    <h4>Desenvolvedores</h4>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/usuario" id="user">
                    <img src={User} alt="usuario" />
                </Link>
            </nav>
            <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                <h3>Olá {nome}!</h3> <br />
                <div id="total">
                    IC$ {total} - R$ {total * 25}
                </div>
            </div> <br />
            <Link to="/gerarendereco" style={{ textDecoration: "none" }}>
                <button className='actions'>Gerar endereço</button> <br />
            </Link>
            <Link to="/transferir" style={{ textDecoration: "none" }}>
                <button className='actions'>Transferir</button> <br />
            </Link>
            <Link to="/blockchain" style={{ textDecoration: "none" }}>
                <button className='actions'>Blockchain</button> <br />
            </Link>
            <Link to="/cotacao" style={{ textDecoration: "none" }}>
                <button className='actions'>Cotação</button> <br />
            </Link>
            <Link to="/seushashs" style={{ textDecoration: "none" }}>
                <button className='actions'>Seus Hashs</button>
            </Link> <br />
            <Link to="/seurelatorio" style={{ textDecoration: "none" }}>
                <button className='actions'>Seu relatório</button>
            </Link>
        </div>
    );
};

export default Carteira;