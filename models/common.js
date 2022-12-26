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
const ProjectType = {
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    version:{
        type: String,
        required: true,
    },
    description:{
        type:String,
    },
    stackUsed:{
        type:{
            frontend:TechType,
            backend:[TechType],
            databases:[TechType]
        },
        required:true
    },
    deadline:{
        type:String,
        default:"N.A."
    },
    status:{
        type:String,
        default:"pending"
    },
    createdBy:{
        type:String,
        required: true
    },
}

const TaskType = {
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
    assignedBy:{
        type:String,
        required:true
    }
}

const UserDetailType = {
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
    },
    user_email:{
        type:String,
        required:true,
        unique:true
    },
    designation:{
        type:String,
        required:true,
        default:'unassigned'
    }
}


module.exports = {AddressType,SkillType,TechType,TransactionType,ProjectType,TaskType,UserDetailType};