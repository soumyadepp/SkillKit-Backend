const mongoose = require('mongoose');
const { TransactionType } = require('./common');


const UserSchema = new mongoose.Schema({
    connection:{
        type:String,
        required:true
    },
    client:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tenant:{
        type:String,
        required:true,
    },
    transaction:{
        type:TransactionType
    },
    request_language:{
        type:String,
    }
});

module.exports = mongoose.model('users',UserSchema);