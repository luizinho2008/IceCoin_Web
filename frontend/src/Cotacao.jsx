import React from 'react';
import './styles/Cotacao.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav> <br />
            <div id="valor">
                1 IceCoin(IC$) equivale a R$25.00
            </div> <br /> <br />
            <Link style={{textDecoration: "none"}} to="/carteira"><button id="button2">Voltar</button></Link>
        </div>
    );
}

export default Login;