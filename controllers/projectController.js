const { FETCH_FAILED, 
    FETCH_SUCCESS, 
    REGISTER_FAILED, 
    REGISTER_SUCCESS, 
    EDIT_FAILED, 
    EDIT_SUCCESS, 
    DELETE_FAILED, 
    DELETE_SUCCESS } = require("../common/constants")
const Project = require("../models/Project")
const UserMetadata = require('../models/UserMetaData');

exports.getAllProjects = async (req, res) => {
    Project.find({}, (err, doc) => {
        if (err) {
            res.status(400).send({
                message: FETCH_FAILED
            });
        }
        else {
            res.send({
                data: doc,
                message: FETCH_SUCCESS
            })
        }
    })
};

exports.addProject = async(req,res, next) => {
    const { name, version, description, stackUsed, assignedUsers, createdBy, deadline } = req.body;
    new Project({name,version,description,stackUsed,assignedUsers,createdBy,deadline}).save((err,doc) => {
        if(err){
            res.status(409).send({
                message: REGISTER_FAILED
            });
        }
        else{
            req.params = {id : doc.id};
            next();
            // res.send({
            //     data: doc,
            //     message: REGISTER_SUCCESS
            // })
        }
    })
};

exports.updateProject = async(req,res,next) => {
    const {id} = req.params;
    const { name, version, description, stackUsed, assignedUsers, deadline, status } = req.body;

    let updation = {
        name:name,
        version:version,
        description:description,
        stackUsed:stackUsed,
        assignedUsers:assignedUsers,
        deadline:deadline,
        status:status,
        eventId : req.body.eventId,
        eTag : req.body.eTag
    }

    if(!!!req.body.eventId)
    {
        delete updation["eventId"];
        delete updation["eTag"];
    }

    Project.findByIdAndUpdate(id,{
        $set:updation
    },(err,doc) => {
        if(err){
            res.status(400).send({
                message: EDIT_FAILED
            })
        }
        else{
            next();
            // res.send({
            //     data:doc,
            //     message: EDIT_SUCCESS
            // })
        }
    })
};

exports.deleteProject = async(req,res) => {
    const {id} = req.params;
    Project.findByIdAndDelete(id,(err,doc) => {
        if(err){
            res.status(406).send({
                message:DELETE_FAILED
            })
        }
        else{
            res.send({
                data:doc,
                message:DELETE_SUCCESS
            })
        }
    })
};

exports.assignProject = async(req,res,next) => {
    try {
        const { id } = req.params;
        const { assignedUsers } = req.body;
        const projectToAdd = await Project.findOne({ _id: id });
        if (assignedUsers) {
            for (var x of assignedUsers) {
                await Project.updateMany({ _id: id }, {
                    $addToSet: {
                        assignedUsers: x
                    }
                })
                .then(async() => {
                    await UserMetadata.updateMany({user_email:x},{
                        $addToSet:{
                            assignedProjects:projectToAdd
                        }
                    })
                    .then(() => {
                        console.log(`Completely updated the data of user ${x}`);
                    })
                })
            }
        }
        const sendData = await Project.findById(id);
        next();
        // res.send({
        //     data: sendData,
        //     message: EDIT_SUCCESS
        // })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: EDIT_FAILED
        })
    }
};

exports.unassignProject = async(req,res,next) => {
    try {
        const {id} = req.params;
        const {userToUnassign} = req.body;
        const projectToUnassign = await Project.findOne({_id: id});
        const updatedProjectData = await Project.updateMany({_id:id},{
            $pull:{
                assignedUsers:userToUnassign
            }
        })
        const updatedUserData = await UserMetadata.findOneAndUpdate({user_email:userToUnassign},{
            $pull:{
                assignedProjects: {
                    _id: projectToUnassign._id,
                    name:projectToUnassign.name,
                    version:projectToUnassign.version,
                    description:projectToUnassign.description,
                    stackUsed:projectToUnassign.stackUsed,
                    deadline:projectToUnassign.deadline,
                    status:projectToUnassign.status,
                    createdBy:projectToUnassign.createdBy,
                }
            }
        })
        next();
        // res.send({
        //     data: userToUnassign,
        //     message: EDIT_SUCCESS
        // })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:EDIT_FAILED
        })
    }
};

exports.updateProjectStatus = async(req,res) => {
    try {
        const { id } = req.params;
        const {status} = req.body;
        const ans = await Project.findByIdAndUpdate(id, {
            $set: {
                status: status
            }
        })
        res.send({
            data: ans,
            message: EDIT_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: EDIT_FAILED
        })
    }
}