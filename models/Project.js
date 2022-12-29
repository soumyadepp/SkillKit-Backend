const mongoose = require('mongoose');
const { TechType } = require('./common');

const ProjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    version:{
        type: String,
        required: true,
    },
    stackUsed:{
        type: {
            frontend: TechType,
            backend: [TechType],
            databases: [TechType]
        },
        required: true,
    },
    assignedUsers: {
        type: [String],
    },
    description:{
        type: String,
    },
    createdBy:{
        type:String,
        required: true
    },
    deadline:{
        type: String,
        default: "N.A"
    },
    status:{
        type:String,
        default:'pending'
    },
    eventId :  {
        type : String,
        default : ""
    },
    eTag : {
        type : Number,
        default : 0
    }
},{
    timestamps:true
});

module.exports = mongoose.model('projects',ProjectSchema);