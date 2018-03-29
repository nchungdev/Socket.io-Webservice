var express = require('express');
var cors = require('cors');
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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/public'));

app.route('/login')
    .get(function (req, res, next) {
        res.send("Hello");
    });

app.route('/devices')
    .get(deviceController.getAll)
    .post(deviceController.create)

app.route('/devices/:id')
    .get(deviceController.getOne)
    .delete(deviceController.delete);

app.route('/devices/control/:id')
    .put(deviceController.update);

io.once('connection', function (socket) {
    console.log('New client connect'.gray + ": " + socket.id);

    //    socket.once("login", function (data) {
    //        if (data == "admin") {
    //            socket.emit('authorized', {
    //                tokenid: socket.id
    //            });
    //        }
    //    });
    socket.on('list-device', function (data) {
        socket.emit('list-device', data);
        console.log(data);
    });

    socket.on("c2s-ledchange", function (data) {
        socket.broadcast.emit("s2d-ledchange", data);
        console.log(socket.id.magenta + ": " + data);
    });

    socket.on("d2s-ledchange", function (data) {
        socket.broadcast.emit("s2c-ledchange", data);
        console.log(socket.id.magenta + ": " + data);
    });
    socket.on('door-change', function (data) {
        socket.broadcast.emit('door-change', data);
        console.log(data);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray + ": " + socket.id);
    });

});
