const express = require('express');
const app = express();
const server = require('http').Server(app);

const config = require('./config');

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket')
const db = require('./db');
const router = require('./network/routes');

db(config.dbUrl)

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

socket.connect(server)

router(app);

app.use(config.publicRoute, express.static('public'));

// app.get('/socket.io/socket.io.js', (req, res) => {
//   res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
//   });

// io.on('connection', (socket) => {
//     console.log('Nuevo cliente conectado');
//     socket.emit('mensaje', 'Bienvenido');
// })

// setInterval(function () {
//   io.emit('mensaje', 'Hola, Les escribo a todos');
// }, 3000)

server.listen(config.port, function () {
  console.log('La aplicacion está escuchando en '+ config.host +':' + config.port);
}); 