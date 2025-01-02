import React from 'react';
import './styles/GerarEndereco.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const GerarEndereco = () => {
    const [id, setId] = useState("");
    const [idConta, setIdConta] = useState("");
    const navigate = useNavigate();

    const carregaInfo = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            console.log("Decoded Payload:", decodedPayload);
            setId(decodedPayload.id);
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        carregaInfo();
    }, []);

    const criaEndereco = () => {
        const newHash = uuidv4();
        setIdConta(newHash);

        axios.get("http://localhost:9000/api/hashs")
        .then(resposta => {
            console.log(resposta);
            if(resposta.data.length === 0) {
                axios.post("http://localhost:9000/api/hashs", {hash: newHash, id_usuario: id, saldo: 20000})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })

                axios.post("http://localhost:9000/api/bloco", {hba: 0, hb: 0, remetente: null, destinatario: null, valor: 20000})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })

                axios.post("http://localhost:9000/api/historico", {id_usuario: id, valor: 20000})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })
            } else {
                axios.post("http://localhost:9000/api/hashs", {hash: newHash, id_usuario: id, saldo: 0})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })
            }
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    useEffect(() => {
        if(id && !idConta) {
            criaEndereco();
        }
    }, [id]);

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>
            <h1>O hash da sua conta criada é: </h1>
            <div id="endereco">
                {idConta}
            </div> <br /> <br />
            <Link style={{textDecoration: "none"}} to="/carteira"><button id="button3">Voltar</button></Link>
        </div>
    );
}

export default GerarEndereco;