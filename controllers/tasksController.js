const { FETCH_FAILED, FETCH_SUCCESS } = require("../common/constants")
const Task = require("../models/Task")

exports.getAllTasks = async(req,res) => {
    Task.find({},(err,doc) => {
        if(err){
            res.send({
                message:FETCH_FAILED
            })
        }
        else{
            res.send({
                data: doc,
                message: FETCH_SUCCESS
            })
        }
    })
};