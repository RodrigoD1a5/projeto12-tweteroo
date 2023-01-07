import express, { json } from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(json());

const PORT = 5000;

const usuarios = [];

const tweets = [];

server.post("/sign-up", (req, res) => {
    const data = req.body;
    usuarios.push(data);
    res.send("OK");
});

server.post("/tweets", (req, res) => {
    const data = req.body;
    if (!usuarios.find((item) => item.username === data.username)) {
        res.send("UNAUTHORIZED");
        return;
    }
    tweets.push(data);
    res.send("OK");
});

server.get("/tweets", (req, res) => {
    const dezUltimosTweets = [];
    for (let i = 1; dezUltimosTweets.length < 10; i++) {
        if (i > tweets.length) break;
        const { username } = tweets[tweets.length - i];
        console.log(username);
        const { avatar } = usuarios.find(u => u.username === username);
        dezUltimosTweets.push({ ...tweets[tweets.length - i], avatar });
    }
    res.send(dezUltimosTweets);

});

server.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}!`);
});