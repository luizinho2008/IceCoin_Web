import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Desenvolvedores.css';
import Logo from './imgs/icecoin.png';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
                <Link style={{textDecoration: "none", display: "block", marginLeft: "auto"}} to="/carteira"><h4>VOLTAR</h4></Link>
            </nav>
            <h1>Nossos desenvolvedores</h1>
            <h2 class='nomes'>Luiz Henrique Moreira Couto de Paula</h2>
            <img className='d' src="https://suap.ifsp.edu.br/media/alunos/fotos/2023/F7OZ6JrPnmvgSr03weY7RkRiZdZFCIy3Hsy63SZFmIw.jpg" alt="Luiz" /> <br /> <br />
            <h2 class='nomes'>Luis Vansan</h2>
            <img className='d' src="https://suap.ifsp.edu.br/media/alunos/fotos/2023/xCE4DbTHctL95ge4S-keF3Xia-rxRdIbmQujf_-oOmY.jpg" alt="Luis" /> <br /> <br />
            <h2 class='nomes'>Vincícius Otávio Sauerbronn</h2>
            <img className='d' src="https://suap.ifsp.edu.br/media/alunos/fotos/2023/ivj2mgT9t2Qr0FEv7FDhB0mhszzbEVHp6YiOGDjghE4.jpg" alt="Vinicius" /> <br /> <br />
            <h2 class='nomes'>Lucas Sorrilha Rolim de Moura</h2>
            <img className='d' src="https://suap.ifsp.edu.br/media/alunos/fotos/2023/Fsr9yFxEpoTGapHZmKy7c0QUrmELnQLZO671Mn8cdI8.jpg" alt="Lucas" /> <br /> <br />
            <h2 class='nomes'>Pedro Miguel Sarur Farias</h2>
            <img className='d' src="https://suap.ifsp.edu.br/media/alunos/fotos/2023/M0BCZuCrh2E8KWCqjLRzZk9fYZg6wXzNEk_1Mabg_Uo.jpg" alt="Pedro" /> <br /> <br />
        </div>
    );
}

export default Login;