const mongoose = require('mongoose');

const TransactionType = {
    id: {
        type:String,
        required:true,
        unique:true
    },
    locale: {
        type:String,
    },
    protocol:{
        type:String,
        required:true
    },
    requested_scopes:{
        type:[String],
        required:true
    },
    acr_values: {
        type:[String]
    },
    ui_locales: {
        type:[String]
    },
    redirect_uri:{
        type:String,
        required:true
    },
    prompt:{
        type:[String]
    },
    state:{
        type:String
    },
    login_hint:{
        type:String,
    },
    response_mode:{
        type:String
    },
    response_type:{
        type:[String]
    }
}


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