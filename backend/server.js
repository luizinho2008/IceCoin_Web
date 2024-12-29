const express = require("express");
const app = express();

const db = require("./db");
const port = 9000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/api/authenticate", (req, res) => {
    const {nome, senha} = req.body;
    const sql = `SELECT * FROM usuarios WHERE nome = ? and senha = ?`;

    db.query(sql, [nome, senha], (erro, resultados) => {
        if(erro) {
            res.json("Falha ao realizar a consulta ao MySQL");
        }
        else {
            res.json(resultados);
        }
    })
});

app.post("/api/cadastro", (req, res) => {
    const { nome, senha } = req.body;

    const checkUserSql = `SELECT * FROM usuarios WHERE nome = ?`;
    db.query(checkUserSql, [nome], (erro, resultados) => {
        if (erro) {
            return res.json("Erro ao verificar o usuário no MySQL");
        }

        if (resultados.length > 0) {
            return res.json("Usuário já cadastrado");
        } else {
            const sql = `INSERT INTO usuarios(nome, senha) VALUES(?, ?)`;
            db.query(sql, [nome, senha], (erro, resultados) => {
                if (erro) {
                    res.json("Falha ao realizar a consulta ao MySQL");
                } else {
                    res.json({ mensagem: "Usuário cadastrado com sucesso", resultados });
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando com express na porta ${port}`);
});