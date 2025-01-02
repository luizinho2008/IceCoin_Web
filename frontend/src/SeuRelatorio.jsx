import React, { useState, useEffect } from 'react';
import './styles/SeuRelatorio.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './imgs/icecoin.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SeuRelatorio = () => {
    const [id, setId] = useState("");
    const [historico, setHistorico] = useState([]);
    const navigate = useNavigate();

    const carregaInfo = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            setId(decodedPayload.id);
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        carregaInfo();
    }, []);

    const carregaHistorico = () => {
        axios.get(`http://localhost:9000/api/historico/${id}`)
        .then(resposta => {
            console.log(resposta);
            setHistorico(resposta.data);
        })
        .catch(erro => {
            console.log(erro);
        })
    };

    useEffect(() => {
        if(id) {
            carregaHistorico();
        }
    }, [id]);

    const prepararDadosGrafico = () => {
        const labels = historico.map(item => new Date(item.data_criacao).toLocaleDateString());
        const data = historico.map(item => item.valor);

        return {
            labels,
            datasets: [
                {
                    label: 'Histórico de Transações de IceCoin',
                    data,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    tension: 0,
                }
            ]
        };
    };

    return (
        <div>
            <nav id='nav'>
                <img src={Logo} alt="logo icecoin" />
                <h2>ICECOIN</h2>
            </nav>

            <div className="container mt-5 text-center">
                <div className="chart-container">
                    <Line data={prepararDadosGrafico()} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: { 
                                ticks: { 
                                    maxRotation: 45,
                                    minRotation: 45,
                                    color: 'white',
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    }
                                },
                                grid: {
                                    color: 'white',
                                    lineWidth: 1,
                                }
                            },
                            y: { 
                                ticks: { 
                                    color: 'white',
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    }
                                },
                                grid: {
                                    color: 'white',
                                    lineWidth: 1,
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Histórico de Transações de IceCoin',
                                font: {
                                    size: 20,
                                    weight: 'bold',
                                },
                                color: 'white'
                            }
                        }
                    }} />
                </div>
            </div> <br />
            <Link style={{textDecoration: "none"}} to="/carteira"><button id="button3">Voltar</button></Link>
        </div>
    );
};

export default SeuRelatorio;