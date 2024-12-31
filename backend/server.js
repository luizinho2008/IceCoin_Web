const express = require("express");
const app = express();

const db = require("./db");
const jwt = require('jsonwebtoken');
const port = 9000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/api/authenticate", (req, res) => {
    const {nome, senha} = req.body;
    const sql = `SELECT * FROM usuarios WHERE nome = ? and senha = ?`;

    db.query(sql, [nome, senha], (erro, resultados) => {
        if(erro) {
            return res.status(404).json({ message: "Falha ao realizar a consulta ao MySQL" });
        }
        
        if(resultados.length === 0) {
            return res.status(401).json({ message: "Nome ou senha incorretos" });
        }

        const usuario = resultados[0];
        console.log("Usuario:", usuario);
        const payload = {
            id: usuario.id_usuario,
            nome: usuario.nome
        };

        const token = jwt.sign(payload, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8552c541e2e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8552c541e', { expiresIn: '1h' });
        res.status(201).json({ message: "Login bem-sucedido", token });
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
            return res.status(200).json("Usuário já cadastrado");
        } else {
            const sql = `INSERT INTO usuarios(nome, senha) VALUES(?, ?)`;
            db.query(sql, [nome, senha], (erro, resultados) => {
                if (erro) {
                    res.json("Falha ao realizar a consulta ao MySQL");
                } else {
                    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", resultados, id: resultados.insertId});
                }
            });
        }
    });
});

app.post("/api/historico", (req, res) => {
    const { id_usuario, valor } = req.body;

    const sql = `INSERT INTO historico(id_usuario, valor) VALUES(?, ?)`;
    db.query(sql, [id_usuario, valor], (erro, resultados) => {
        if (erro) {
            return res.json("Erro ao inserir o histórico no MySQL");
        }
        else {
            res.json(resultados);
        }
    });
});

app.get("/api/blockchain", (req, res) => {
    const sql = `SELECT * FROM blockchain`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.json("Erro ao listar a blockchain");
        }
        else {
            res.json(resultados);
        }
    });
});

app.get("/api/total/:id", (req, res) => {
    const sql = `SELECT SUM(saldo) AS total FROM contas WHERE id_usuario = ?`;
    db.query(sql, [req.params.id], (erro, resultados) => {
        if(erro) {
            res.json(`Falha ao buscar saldo`);
        } else {
            res.json(resultados);
        }
    })
})

app.get("/api/hashs", (req, res) => {
    const sql = `SELECT * FROM contas`;
    db.query(sql, (erro, resultados) => {
        if(erro) {
            res.json(`Falha ao buscar os hashs`);
        } else {
            res.json(resultados);
        }
    })
})

app.get("/api/hashs/:id", (req, res) => {
    const sql = `SELECT * FROM contas WHERE id_usuario = ?`;
    db.query(sql, [req.params.id], (erro, resultados) => {
        if(erro) {
            res.json(`Falha ao buscar os hashs`);
        } else {
            res.json(resultados);
        }
    })
})

app.post("/api/hashs", (req, res) => {
    const {hash, id_usuario, saldo} = req.body;

    const sql = `INSERT INTO contas(endereco, id_usuario, saldo) VALUES(?, ?, ?)`;
    db.query(sql, [hash, id_usuario, saldo], (erro, resultados) => {
        if(erro) {
            res.json(`Falha ao inserir a conta`);
        } else {
            res.json(resultados);
        }
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando com express na porta ${port}`);
});