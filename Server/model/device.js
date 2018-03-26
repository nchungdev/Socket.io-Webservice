var mongoose = require('../connect/mongoose');
const deviceSchema = new mongoose.Schema({
    id: Number,
    name: String,
    typeDevice: String,
    state: Number
});

module.exports = mongoose.model('device', deviceSchema);;
