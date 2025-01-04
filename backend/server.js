const express = require("express");
const app = express();
const db = require("./db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 9000;
const jwtSecret = "seu_segredo_aqui"; // Mude isso para o seu segredo real

// Configuração do CORS
app.use(cors({
    origin: "https://icecoin.vercel.app", // URL do seu frontend
    credentials: true, // Permite enviar e receber cookies
}));

app.use(express.json());
app.use(cookieParser());

// Middleware para autenticação do token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "Token não encontrado" });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = decoded; // Aqui você coloca os dados do usuário no request
        next(); // Passa para o próximo middleware ou rota
    });
};

// Rota de login
app.post("/api/authenticate", (req, res) => {
    const { nome, senha } = req.body;
    const sql = `SELECT * FROM usuarios WHERE nome = ? AND senha = ?`;

    db.query(sql, [nome, senha], (erro, resultados) => {
        if (erro) {
            console.error("Erro ao consultar o MySQL:", erro);
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ message: "Nome ou senha incorretos" });
        }

        const usuario = resultados[0];
        const payload = {
            id: usuario.id_usuario,
            nome: usuario.nome,
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000, // 1 hora de expiração
        });

        console.log('Cookie setado com sucesso:', token); // Log para verificação

        res.status(200).json({ message: "Login bem-sucedido" });
    });
});

app.get("/api/protected", authenticateToken, (req, res) => {
    // Se passou pela autenticação, o usuário está autenticado
    res.status(200).json({ message: "Acesso autorizado", user: req.user });
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

app.get("/api/historico/:id", (req, res) => {
    const sql = `SELECT * FROM historico WHERE id_usuario = ?`;
    db.query(sql, [req.params.id], (erro, resultados) => {
        if(erro) {
            return res.json("Erro ao listar o histórico do usuário no MySQL");
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
});

app.put("/api/decrescimo", (req, res) => {
    const {valor, remetente} = req.body;

    const sql = `UPDATE contas SET saldo = saldo - ? WHERE endereco = ?`;
    db.query(sql, [valor, remetente], (erro, resultados) => {
        if(erro) {
            res.json(erro);
        } else {
            res.json(resultados);
        }
    })
});

app.put("/api/acrescimo", (req, res) => {
    const {valor, destinatario} = req.body;

    const sql = `UPDATE contas SET saldo = saldo + ? WHERE endereco = ?`;
    db.query(sql, [valor, destinatario], (erro, resultados) => {
        if(erro) {
            res.json(erro);
        } else {
            res.json(resultados);
        }
    })
});

app.post("/api/transacao", (req, res) => {
    const {remetente, destinatario, valor} = req.body;

    const sql = `INSERT INTO transacoes(enderecoRemetente, enderecoDestinatario, valor) VALUES(?, ?, ?)`;
    db.query(sql, [remetente, destinatario, valor], (erro, resultados) => {
        if(erro) {
            res.json(erro);
        } else {
            res.json(resultados);
        }
    })
});

app.post("/api/bloco", (req, res) => {
    const {hba, hb, remetente, destinatario, valor} = req.body;

    const sql = `INSERT INTO blockchain(hash_bloco_anterior, hash_bloco, remetente, destinatario, valor) VALUES(?, ?, ?, ?, ?)`;
    db.query(sql, [hba, hb, remetente, destinatario, valor], (erro, resultados) => {
        if(erro) {
            res.json(erro);
        } else {
            res.json(resultados);
        }
    })
});

app.get("/api/hashanterior", (req, res) => {
    const sql = `SELECT * FROM blockchain ORDER BY id_bloco DESC LIMIT 1`;
    db.query(sql, (erro, resultados) => {
        if(erro) {
            res.json(erro);
        } else {
            res.json(resultados[0].hash_bloco);
        }
    })
});

app.get("/api/idDestinatario/:endereco", (req, res) => {
    const sql = `SELECT * FROM contas WHERE endereco = ?`;
    db.query(sql, [req.params.endereco], (erro, resultados) => {
        if(erro) {
            res.json(erro);
        } else {
            res.json(resultados[0].id_usuario);
        }
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});