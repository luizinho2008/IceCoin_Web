import React, { useState, useEffect } from 'react';
import './styles/Transferir.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SHA256 from 'crypto-js/sha256';
import Cookies from 'js-cookie';

const Transferir = () => {
    const [id, setId] = useState("");
    const [contas, setContas] = useState([]);
    const [remetente, setRemetente] = useState("");
    const [destinatario, setDestinatario] = useState("");
    const [valor, setValor] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            setId(decodedPayload.id);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (id) {
            axios.get(`https://icecoin.onrender.com/api/hashs/${id}`)
                .then((resposta) => {
                    setContas(resposta.data);
                })
                .catch((erro) => {
                    console.error("Erro ao carregar contas:", erro);
                });
        }
    }, [id]);

    const calcularHash = (hba, r, d, q) => {
        const dados = hba + r + d + q;
        return SHA256(dados).toString();
    };

    const realizaTransacao = async (event) => {
        event.preventDefault();

        if (!remetente || !destinatario || !valor) {
            toast.error("Preencha todos os campos corretamente");
            return;
        }
        if (remetente === destinatario) {
            toast.error("O remetente e o destinatário não podem ser iguais");
            return;
        }

        try {
            const contaRemetente = contas.find(conta => conta.endereco === remetente);
            if (!contaRemetente) {
                toast.error("Conta remetente inválida");
                return;
            }

            if (parseFloat(valor) > parseFloat(contaRemetente.saldo)) {
                toast.error("Saldo insuficiente para realizar a transferência");
                return;
            }

            await axios.put("https://icecoin.onrender.com/api/decrescimo", { valor, remetente });
            await axios.put("https://icecoin.onrender.com/api/acrescimo", { valor, destinatario });

            await axios.post("https://icecoin.onrender.com/api/transacao", { remetente, destinatario, valor });

            const respostaHash = await axios.get("https://icecoin.onrender.com/api/hashanterior");
            const hashAnterior = respostaHash.data;
            const hashBloco = calcularHash(hashAnterior, remetente, destinatario, valor);

            await axios.post("https://icecoin.onrender.com/api/bloco", {
                hba: hashAnterior,
                hb: hashBloco,
                remetente,
                destinatario,
                valor,
            });

            const respostaIdDestinatario = await axios.get(`https://icecoin.onrender.com/api/idDestinatario/${destinatario}`);
            const idDestinatarioAtualizado = respostaIdDestinatario.data;

            if(id !== idDestinatarioAtualizado) {
                const saldoRemetenteResposta = await axios.get(`https://icecoin.onrender.com/api/total/${id}`);
                const novoSaldoRemetente = saldoRemetenteResposta.data[0].total;

                let novoSaldoDestinatario = 0;
                if(idDestinatarioAtualizado) {
                    const saldoDestinatarioResposta = await axios.get(`https://icecoin.onrender.com/api/total/${idDestinatarioAtualizado}`);
                    novoSaldoDestinatario = saldoDestinatarioResposta.data[0].total;
                }

                await axios.post(`https://icecoin.onrender.com/api/historico`, {
                    id_usuario: id,
                    valor: novoSaldoRemetente,
                });

                await axios.post(`https://icecoin.onrender.com/api/historico`, {
                    id_usuario: idDestinatarioAtualizado,
                    valor: novoSaldoDestinatario,
                });
            }

            toast.success("Transferência realizada com sucesso!");
            navigate("/carteira");
        } catch (erro) {
            console.error("Erro durante a transação:", erro);
            toast.error("Ocorreu um erro durante a transação");
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