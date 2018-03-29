var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1/smarthome';
mongoose.connect(uri, function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Mongodb connected");
    }
});
module.exports = mongoose;
