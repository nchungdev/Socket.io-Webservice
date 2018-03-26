require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = require('colors');
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
var list_device = [];
io.on('connection', function (socket) {
    console.log('New client connect'.gray);
    socket.on('list-device', function (data) {
        console.log(data);
        socket.broadcast.emit('list-device', data);
    });
    socket.on('led-change', function (data) {
        socket.broadcast.emit('led-change', data);
    });
    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });
});
