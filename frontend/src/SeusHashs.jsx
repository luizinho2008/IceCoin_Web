import React from 'react';
import './styles/SeusHashs.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SeusHashs = () => {
    const [id, setId] = useState("");
    const [contas, setContas] = useState([]);
    const navigate = useNavigate();

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
        // A requisição já irá enviar automaticamente os cookies, incluindo o token
        axios
            .get("https://icecoin.onrender.com/api/protected", { withCredentials: true })
            .then((resposta) => {
                setId(resposta.data.user.id);
            })
            .catch((erro) => {
                console.error("Erro ao acessar dados do usuário:", erro);
                navigate("/login");  // Se não conseguir acessar, redireciona para login
            });
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