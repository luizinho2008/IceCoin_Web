import React, { useState, useEffect } from 'react';
import './styles/Transferir.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Transferir = () => {
    const [id, setId] = useState("");
    const [contas, setContas] = useState([]);
    const navigate = useNavigate();
    const [remetente, setRemetente] = useState("");
    const [destinatario, setDestinatario] = useState("");
    const [valor, setValor] = useState("");

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
    };

    const carregaSuasContas = () => {
        axios
            .get(`http://localhost:9000/api/hashs/${id}`)
            .then((resposta) => {
                console.log(resposta);
                setContas(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    };

    useEffect(() => {
        carregaInfo();
    }, []);

    useEffect(() => {
        if (id) {
            carregaSuasContas();
        }
    }, [id]);

    const realizaTransacao = (event) => {
        event.preventDefault();
        if (!remetente || !destinatario || !valor) {
            toast.error("Preencha todos os campos corretamente", {
                style: {
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    outline: "none",
                }
            });
            return;
        }
        const contaRemetente = contas.find(conta => conta.endereco === remetente);
        if (parseFloat(valor) > parseFloat(contaRemetente.saldo)) {
            toast.error("Saldo insuficiente para realizar a transferência", {
                style: {
                    backgroundColor: "red",
                    color: "white",
                }
            });
            return;
        }
        else {
            axios.put("http://localhost:9000/api/decrescimo", {valor, remetente})
            .then(resposta => {
                console.log(resposta);
            })
            .catch(erro => {
                console.log(erro);
            })

            axios.put("http://localhost:9000/api/acrescimo", {valor, destinatario})
            .then(resposta => {
                console.log(resposta);
            })
            .catch(erro => {
                console.log(erro);
            })

            axios.post("http://localhost:9000/api/transacao", {remetente, destinatario, valor})
            .then(resposta => {
                console.log(resposta);
            })
            .catch(erro => {
                console.log(erro);
            })
        }
        
    };

    return (
        <div>
            <nav id="nav">
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>
            <form id="form" onSubmit={realizaTransacao}>
                <label>De:</label> <br />
                <select name="account" id="account" onChange={(e) => setRemetente(e.target.value)}>
                    <option value="">Selecione uma conta</option>
                    {contas.map(conta => (
                        <option key={conta.id_conta} value={conta.endereco}>
                            Hash: {conta.endereco} - IC$ {conta.saldo}
                        </option>
                    ))}
                </select> <br /> <br />
                <label>Para:</label>
                <input type="text" onChange={(e) => setDestinatario(e.target.value)} /> <br /> <br />
                <label>Valor:</label>
                <input
                    type="number"
                    step="0.01"
                    onChange={(e) => setValor(e.target.value)}
                /> <br /> <br />
                <button id="button4">Transferir</button>
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
};

export default Transferir;