import React from 'react';
import './styles/Cadastro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const cadastrar = (event) => {
        event.preventDefault();
        if(nome === "" || senha !== confirmarSenha) {
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
            axios.post("https://icecoin.onrender.com/api/cadastro", { nome, senha })
            .then(resposta => {
                console.log(resposta);
                if(resposta.status === 200) {
                    toast.success(resposta.data, {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            outline: "none",
                        }
                    });
                }
                else if(resposta.status === 201) {
                    toast.success(resposta.data.mensagem, {
                        style: {
                            backgroundColor: "green",
                            color: "white",
                            fontWeight: "bold",
                            outline: "none",
                        }
                    });

                    axios.post("https://icecoin.onrender.com/api/historico", {id_usuario: resposta.data.id, valor: 0})
                    .then(resposta => {
                        console.log(resposta);
                    })
                    .catch(erro => {
                        console.log(erro);
                    })
                }
                else {
                    toast.error(resposta.data, {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            outline: "none",
                        }
                    });
                }
            })
            .catch(erro => {
                console.log(erro);
                toast.error("Erro ao cadastrar, tente novamente.", {
                    style: {
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        outline: "none",
                    },
                });
            });
        }
    };

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>
            <p style={{color: "white", fontWeight: "bolder"}}>
                O IceCoin é uma criptomoeda emergente que combina tecnologia de
                ponta com um conceito inovador de economia digital.
                Criado para representar um avanço na forma como lidamos com dinheiro
                online, o IceCoin oferece segurança, rapidez e um sistema de
                transações descentralizado que promete mudar o mercado financeiro.
                Com uma base sólida em blockchain e uma crescente aceitação
                no mercado, o IceCoin é mais do que apenas uma moeda digital;
                é uma nova forma de interagir com a economia global.
            </p>
            <form id="form" onSubmit={cadastrar} style={{color: "white"}}>
                <label>Nome: </label> <br />
                <input type="text" id="nome" style={{outline: "none"}} onChange={(e) => setNome(e.target.value)} /> <br />

                <label>Senha:</label> <br />
                <input type="password" id="senha" style={{outline: "none"}} onChange={(e) => setSenha(e.target.value)} /> <br />

                <label>Confirmar senha:</label> <br />
                <input type="password" id="confirmarSenha" style={{outline: "none"}} onChange={(e) => setConfirmarSenha(e.target.value)} /> <br /> <br />

                <button id='button'>Enviar</button> <br /> <br />

                <Link style={{textDecoration: "none"}} to="/login"><p id='linkagem'>Já possui cadastro?</p></Link>
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

export default Cadastro;