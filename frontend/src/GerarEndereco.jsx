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

    useEffect(() => {
        axios.get("https://icecoin.onrender.com/api/protected", { withCredentials: true })
        .then((resposta) => {
            setId(resposta.data.user.id);
        })
        .catch((erro) => {
            console.error("Erro ao acessar dados do usuário:", erro);
            navigate("/login");
        });
    }, []);   

    const criaEndereco = () => {
        const newHash = uuidv4();
        setIdConta(newHash);

        axios.get("https://icecoin.onrender.com/api/hashs")
        .then(resposta => {
            console.log(resposta);
            if(resposta.data.length === 0) {
                axios.post("https://icecoin.onrender.com/api/hashs", {hash: newHash, id_usuario: id, saldo: 20000})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })

                axios.post("https://icecoin.onrender.com/api/bloco", {hba: 0, hb: 0, remetente: null, destinatario: null, valor: 20000})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })

                axios.post("https://icecoin.onrender.com/api/historico", {id_usuario: id, valor: 20000})
                .then(resposta => {
                    console.log(resposta);
                })
                .catch(erro => {
                    console.log(erro);
                })
            } else {
                axios.post("https://icecoin.onrender.com/api/hashs", {hash: newHash, id_usuario: id, saldo: 0})
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