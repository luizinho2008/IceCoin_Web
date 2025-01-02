import React from 'react';
import './styles/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const logar = (event) => {
        event.preventDefault();
        if(nome === "" || senha === "") {
            toast.error("Preencha os campos corretamente", {
                style: {
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    outline: "none",
                },
            });
        }
        else {
            axios.post("https://icecoin.onrender.com/api/authenticate", { nome, senha })
            .then(resposta => {
                console.log(resposta);
                if(resposta.status === 401 || resposta.status === 404) {
                    toast.error(resposta.data.message || "Erro desconhecido", {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            outline: "none",
                        }
                    });
                }
                else {
                    sessionStorage.setItem("token", resposta.data.token);
                    navigate("/carteira");
                }
            })
            .catch(erro => {
                if (erro.response) {
                    toast.error(erro.response.data.message || "Erro ao logar, tente novamente.", {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            outline: "none",
                        },
                    });
                } else {
                    toast.error("Erro ao logar, tente novamente.", {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            outline: "none",
                        },
                    });
                }
            });
        }
    };    

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

            <form id="form" onSubmit={logar} style={{color: "white"}}>
                <label>Nome: </label> <br />
                <input type="text" id="nome" style={{outline: "none"}} onChange={(e) => setNome(e.target.value)}/> <br /> <br />
                
                <label>Senha:</label> <br />
                <input type="password" id="senha" style={{outline: "none"}} onChange={(e) => setSenha(e.target.value)}/> <br /> <br />

                <button id='button'>Enviar</button> <br /> <br />

                <Link style={{textDecoration: "none"}} to="/cadastro"><p id='linkagem'>Não possui cadastro?</p></Link>
            </form>
            <ToastContainer 
                position="bottom-right"
                autoClose={3000} 
                hideProgressBar={false}
                closeOnClick 
                pauseOnHover 
                draggable 
                theme="colored" 
            />
        </div>
    );
}

export default Login;