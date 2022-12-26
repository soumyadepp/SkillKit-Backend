const { FETCH_FAILED, FETCH_SUCCESS, EDIT_FAILED, USER_ALREADY_EXISTS, EDIT_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS } = require('../common/constants');
const UserMetadata = require('../models/UserMetaData');
const {cloudinary} = require('../common/cloudinary');

exports.getUserMetadata = async(req,res) => {
    UserMetadata.find({},(err,result) => {
        if(err){
            res.send({
                message: FETCH_FAILED
            })
        }
        else{
            res.send({
                data: result,
                message: FETCH_SUCCESS
            })
        }
    })
};

exports.getUserMetadataByEmail = async(req,res) => {
    const {email} = req.params;
    UserMetadata.findOne({user_email:email},(err,doc) => {
        if(err){
            res.send({
                message: FETCH_FAILED
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

exports.postUserMetadata = async(req,res) => {
    const {user_email, username,fullName,address, designation, skills,assignedProjects} = req.body;
    new UserMetadata({user_email,username,fullName,address, designation, skills,assignedProjects }).save((err, doc)=>{
        if(err)
        {
            res.send({
                message : REGISTER_FAILED
            });
        }
        else
        {
            res.send({
                data : doc,
                message : REGISTER_SUCCESS
            })
        }
    })
};

exports.updateBasicDetails = async(req,res) => {
    const {id} = req.params;
    const {username,fullName,designation} = req.body;
    UserMetadata.updateMany({user_email:id},{
        $set:{
            username:username,
            fullName:fullName,
            designation:designation
        }
    },(err,doc) => {
        if(err){
            if(err.code === 11000){
                res.status(402).send({
                    message: USER_ALREADY_EXISTS
                })
            }
            else{
                res.status(401).send({
                    message: EDIT_FAILED
                })
            }
        }
        else{
            res.send({
                data:doc,
                message:EDIT_SUCCESS
            })
        }
    })
};

exports.updateProfilePicture = async(req,res) => {
    const {id} = req.params;
    const {image} = req.body;
    const uploadedResponse = await cloudinary.uploader.upload(image,{
        upload_preset:'dev_preset'
    });
    UserMetadata.updateOne({user_email:id},{
        $set:{
            picture:uploadedResponse.secure_url
        }
    },(err,doc) => {
        if(err){
            res.send({
                message: EDIT_FAILED
            });
        }
        else{
            res.send({
                data:doc,
                message:EDIT_SUCCESS
            })
        }
    });
};

exports.updateSkills = async(req,res) => {
    const {id} = req.params;
    const {skills} = req.body;
    UserMetadata.updateMany({user_email:id},{
        $set:{
            skills:skills
        }
    },(err,doc) => {
        if(err){
            res.send({
                message : EDIT_FAILED
            })
        }
        else{
            res.send({
                data:doc,
                message:FETCH_SUCCESS
            })
        }
    })
}

exports.updateAddress = async(req,res) => {
    const {id} = req.params;
    const {address} = req.body;
    UserMetadata.updateOne({user_email:id},{
        $set:{
            address:address
        }
    },(err,doc) => {
        if(err){
            res.send({
                message:EDIT_FAILED
            })
        }
        else{
            res.send({
                data:doc,
                message:EDIT_SUCCESS
            })
        }
    });
};



