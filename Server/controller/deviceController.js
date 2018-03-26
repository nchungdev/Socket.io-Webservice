var device = require('../model/device');

module.exports = {
    getAll: function (req, res) {
        device.find({}, function (err, rs) {
            if (err) return res.status(500).send("There was a problem finding the devices.");
            res.jsonp(rs);
        });
    },

    getOne: function (req, res) {
        device.find({
            id: req.params.id
        }, function (err, rs) {
            if (err) return res.status(500).send("There was a problem finding the device.");
            res.jsonp(rs);
        });
    },

    create: function (req, res) {
        var value = req.body;
        device.create(value, function (err, rs) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(rs);
        });
    },

    update: function (req, res) {
        var device = req.body;
        device.update({
            id: req.params.id
        }, device).exec(function (err, rs) {
            if (err) return res.status(500).send("There was a problem updating the information to the database.");
            res.json(rs);
        });
    },
    control: function (req, res) {
        var state = req.body.state;
        device.update({
            id: req.params.id
        }, state).exec(function (err, rs) {
            if (err) return res.status(500).send("There was a problem updating the information to the database.");
            res.json(rs);
        });
    },

    delete: function (req, res) {
        device.remove({
            id: req.params.id
        }, function (err, rs) {
            if (err) return res.status(500).send("There was a problem deleting the information to the database.");
            res.json(rs);
        });
    }
}
