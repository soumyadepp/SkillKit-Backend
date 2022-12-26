const { FETCH_FAILED, FETCH_SUCCESS } = require("../common/constants")
const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
    User.find({}, (err, doc) => {
        if (err) {
            res.send({
                message: FETCH_FAILED
            })
        }
        else {
            res.send({
                data: doc,
                message: FETCH_SUCCESS
            })
        }
    })
};

exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    User.find({ email: email }, (err, doc) => {
        if (err) {
            res.send({
                message: FETCH_FAILED
            })
        }
        else {
            res.send({
                data: doc,
                message: FETCH_SUCCESS
            })
        }
    })
}