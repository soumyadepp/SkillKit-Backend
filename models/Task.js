const mongoose = require('mongoose');
const { ProjectType, UserDetailType } = require('./common');

const TaskSchema = new mongoose.Schema({
    taskNumber:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    project:{
        type:ProjectType,
        required:true,
    },
    deadline:{
        type:String,
        required:true,
    },
    assignedUsers:{
        type: [UserDetailType],
        default:[]
    },
    assignedBy: {
        type:String,
        required:true,
        default:'admin'
    }
},{timestamps:true});

module.exports = mongoose.model('tasks',TaskSchema);