const mysql = require("mysql2");

const hostname = "nx6vj.h.filess.io";
const database = "IceCoin_betweenfox";
const port = 3307;
const username = "IceCoin_betweenfox";
const password = "186f084cc6f22a27c5ff1ea3faf39e85896fb47e";

const connexionDB = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database,
    port: port
});

connexionDB.connect(erro => {
    if(erro) {
        console.log(`Falha ao se conectar com o MySQL: ${erro}`);
    } else {
        console.log(`Conectado com sucesso ao MySQL`);
    }
});

module.exports = connexionDB;