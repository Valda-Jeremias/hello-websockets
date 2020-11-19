require('dotenv').config() //Requiero de dotenv para las variables de entorno
const express = require('express') //Requiero de express
const app = express() //Defino la app de express
const http = require('http').createServer(app) //Requiero del modulo http para crear un servidor con la App
const io = require('socket.io')(http) //Requiero de socket.io y uso http

//Defino el PUERTO en un archivo oculto .env
const port = process.env.PORT

    //Uso en la app una vista estatica en la carpeta public
    app.use(express.static('public'));
    
    //Hago uso de IO para websockets
    io.on('connection', (socket) => {  //Establezco la conexión
        socket.on('chat message', (msg) => { //Si esta ON y se produce el evento msg utiliza una funcion
            socket.broadcast.emit('chat message', msg); //La funcion emite un evento bradcast que emite el mensaje
        })
    });

    //Alojamiento WEB
    http.listen(port, () => {
        console.log('Server running on port: '+port);
    })