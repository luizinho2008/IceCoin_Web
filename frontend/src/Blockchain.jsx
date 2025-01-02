import React, { useEffect } from 'react';
import './styles/Blockchain.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';

const Blockchain = () => {
    const [blockchain, setBlockchain] = useState([]);

    const carregaBlockchain = () => {
        axios.get("https://icecoin.onrender.com/api/blockchain")
        .then(resposta => {
            setBlockchain(resposta.data);
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    useEffect(() => {
        carregaBlockchain();
    }, []);

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav> <br />
            <Link style={{textDecoration: "none"}} to="/carteira"><button id="button3">Voltar</button></Link>
            <div id="cadeiaBlocos">
                {
                    blockchain.map(bloco => (
                        <div key={bloco.id_bloco}>
                            <h1>
                                {bloco.id_bloco === 1 ? 'Bloco Gênese:' : `Bloco ${bloco.id_bloco}:`}
                            </h1>
                            {bloco.id_bloco !== 1 && (
                                <>
                                    <h1 style={{ textAlign: "left" }}>Remetente: {bloco.remetente}</h1>
                                    <h1 style={{ textAlign: "left" }}>Destinatário: {bloco.destinatario}</h1>
                                </>
                            )}
                            <h1 style={{ textAlign: "left" }}>Hash do bloco: {bloco.hash_bloco}</h1>
                            <h1 style={{ textAlign: "left" }}>Hash do bloco anterior: {bloco.hash_bloco_anterior}</h1>
                            <h1 style={{ textAlign: "left" }}>Valor: {bloco.valor}</h1> 
                            <br /> <br />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Blockchain;