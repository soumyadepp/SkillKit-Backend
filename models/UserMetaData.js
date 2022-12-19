const mongoose = require('mongoose');
const { SkillType, AddressType, TechType } = require('./common');

const ProjectType = {
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
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
    }
}

const MetadataSchema = new mongoose.Schema({
    user_email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
    },
    fullName:{
        type:String,
    },
    address:{
        type:AddressType
    },
    designation:{
        type:String,
        enum:['software_engineer_1',
        'software_engineer_2',
        'software_engineer_3',
        'ui_ux_designer',
        'project_manager',
        'program_manager',
        'engineering_lead',
        'product_head',
        'design_engineer',
        'data_analyst',
        'business_analyst',
        'associate_software_engineer',
        'senior_software_engineer'],
    },
    skills:{
        type:[SkillType]
    },
    assignedProjects:{
        type:[ProjectType]
    }
},{timestamps:true});

module.exports = mongoose.model('metadata',MetadataSchema);
