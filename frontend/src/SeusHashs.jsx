import React from 'react';
import './styles/SeusHashs.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SeusHashs = () => {
    const [id, setId] = useState("");
    const [contas, setContas] = useState([]);
    const navigate = useNavigate();

    const carregaInfo = () => {
        const token = sessionStorage.getItem("token");
        if(token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            console.log("Decoded Payload:", decodedPayload);
            setId(decodedPayload.id);
        } else {
            navigate("/login");
        }
    }

    const carregaSeusHashs = () => {
        axios.get(`https://icecoin.onrender.com/api/hashs/${id}`)
        .then(resposta => {
            setContas(resposta.data);
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
            carregaSeusHashs();
        }
    }, [id]);
    
    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
                <Link style={{textDecoration: "none", display: "block", marginLeft: "auto"}} to="/carteira"><h4>VOLTAR</h4></Link>
            </nav>
            <h1>Veja aqui todas as suas contas:</h1>
            <div id="contas">
                {
                    contas.map(conta => (
                        <div key={conta.id_conta}>
                            <h2 className="data">Endereço: {conta.endereco} - Saldo: IC$ {conta.saldo}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SeusHashs;