const mongoose = require('mongoose');

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

const SkillType = {
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
}

const MetadataSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    address:{
        type:AddressType
    },
    designation:{
        type:String,
        enum:['software_engineer_1','software_engineer_2','software_engineer_3','ui_ux_designer','project_manager','program_manager','engineering_lead','product_head','design_engineer','data_analyst','business_analyst','associate_software_engineer','senior_software_engineer'],
    },
    skills:{
        type:[SkillType]
    }
});

module.exports = mongoose.model('metadata',MetadataSchema);
