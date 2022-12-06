const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const db = require('./db');

const router = require('./network/routes');

db('mongodb+srv://user:user1234@telegrom.uolbskq.mongodb.net/?retryWrites=true&w=majority')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router(app);

app.use('/app', express.static('public'));

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
  });

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    // socket.emit('mensaje', 'Bienvenido');
})

app.listen(3000);
console.log('La aplicacion está escuchando en http://localhost:3000/app');