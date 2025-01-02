import React from 'react';
import './styles/SeuRelatorio.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const SeuRelatorio = () => {
    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>
            <p style={{color: "white", fontWeight: "bolder", fontSize: 20}}>
            O IceCoin é uma criptomoeda emergente que combina tecnologia de
            ponta com um conceito inovador de economia digital.
            Criado para representar um avanço na forma como lidamos com dinheiro
            online, o IceCoin oferece segurança, rapidez e um sistema de
            transações descentralizado que promete mudar o mercado financeiro.
            Com uma base sólida em blockchain e uma crescente aceitação
            no mercado, o IceCoin é mais do que apenas uma moeda digital;
            é uma nova forma de interagir com a economia global.
            </p>
        </div>
    );
}

export default SeuRelatorio;