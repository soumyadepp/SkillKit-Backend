const mongoose = require('mongoose');
const { SkillType, AddressType, ProjectType,TaskType } = require('./common');

const MetadataSchema = new mongoose.Schema({
    user_email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        unique:true,
    },
    picture:{
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
        default:'unassigned',
    },
    skills:{
        type:[SkillType],
        default:[]
    },
    assignedProjects:{
        type:[ProjectType],
        default:[],
    },
    assignedTasks:{
        type:[TaskType],
        default:[]
    }
},{timestamps:true});

module.exports = mongoose.model('metadata',MetadataSchema);
