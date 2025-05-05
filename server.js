const http = require("http");

const HOST = 'localhost';
const PORT = 8000;

const handler = (req, res) => {
    res.writeHead(200);
    res.end('Hello my JavaScript!');
};

const server = http.createServer(handler);
server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});


