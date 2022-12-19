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

const SkillType = {
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    value:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
}

const AddressType = {
    street:{
        type:String,
        required:true
    },
    line1:{
        type:String,
        required:true
    },
    line2:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
}

module.exports = {AddressType,SkillType,TechType,TransactionType};