import React, { useEffect, useState } from 'react';
import './styles/Carteira.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import User from './imgs/user.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Carteira = () => {
    const [nome, setNome] = useState("");
    const [id, setId] = useState("");
    const [total, setTotal] = useState("");
    const navigate = useNavigate();

    const carregaInfo = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            console.log("Decoded Payload:", decodedPayload);
            setNome(decodedPayload.nome);
            setId(decodedPayload.id);
        } else {
            navigate("/login");
        }
    }

    const carregaTotal = () => {
        axios.get(`http://localhost:9000/api/total/${id}`)
        .then(resposta => {
            console.log(resposta);
            setTotal(resposta.data[0].total);
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    useEffect(() => {
        carregaInfo();
    }, []);

    useEffect(() => {
        if(id) {
            carregaTotal();
        }
    }, [id]);

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} id='logo' alt="logo icecoin" />
                <h2>ICECOIN</h2>
                <Link style={{textDecoration: "none"}} to="/usuario" id="user"><img src={User} alt="usuario" /></Link>
            </nav>
            <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                <h3>Olá {nome}!</h3> <br />
                <div id="total">
                    IC$ {total} - R$ {total * 25}
                </div>
            </div>
        </div>
    );
};

export default Carteira;