require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = require('colors');
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var deviceController = require("./controller/deviceController");

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
        console.log(data);
    });
    socket.on('door-change', function (data) {
        socket.broadcast.emit('door-change', data);
        console.log(data);
    });
    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });

    app.route('/login')
        .get(function (req, res, next) {
            res.send("Hello");
        });
    app.route('/devices')
        .get(deviceController.getAll)
        .post(deviceController.create)
        .put()
        .delete();

    app.route('/devices/:id')
        .get(deviceController.getOne)
        .post()
        .put(deviceController.update)
        .delete(deviceController.delete);

    app.route('/devices/control/:id')
        .put(deviceController.update);

});
