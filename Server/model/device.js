var mongoose = require('../connect/mongoose');const deviceSchema = new mongoose.Schema({
    id: Number,
    name: String,
    position: String,
    state: Boolean,
    connect: Boolean
});

module.exports = mongoose.model('device', deviceSchema);;
