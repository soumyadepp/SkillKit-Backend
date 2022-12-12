const mongoose = require('mongoose');


const TechType = {
    name: {
        type:String,
        required:true,
    },
    image: {
        type:String,
        required:true,
    }
}

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
    }
},{
    timestamps:true
});

module.exports = mongoose.model('projects',ProjectSchema);