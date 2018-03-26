var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1/smarthome';
mongoose.connect(uri);
module.exports = mongoose;
