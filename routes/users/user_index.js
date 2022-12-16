const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { FETCH_FAILED, FETCH_SUCCESS, EDIT_FAILED, EDIT_SUCCESS } = require('../../common/constants');
const User = require('../../models/User');
const UserMetaData = require('../../models/UserMetaData');
router.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
router.use(cors());


router.post('/metaData',(req, res)=>{
    const {user_id, username,fullName,address, designation, skills} = req.body;
    console.log(user_id, address, designation, skills);
    new UserMetaData({user_id,username,fullName,address, designation, skills }).save((err, doc)=>{
        if(err)
        {
            res.send({
                message : FETCH_FAILED
            });
        }
        else
        {
            res.send({
                data : doc,
                message : FETCH_SUCCESS
            })
        }
    })

});

router.patch('/metadata/basic/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const {username,fullName,designation} = req.body;
        await UserMetaData.updateMany({user_email:id},{
            $set:{
                username:username,
                fullName:fullName,
                designation:designation
            }
        });
        const sendData = await UserMetaData.findOne({user_email:id});
        res.send({
            data:sendData,
            message:EDIT_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: EDIT_FAILED
        })
    }
})

router.patch('/metadata/address/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const {address} = req.body;
        await UserMetaData.updateOne({user_email:id},{
            $set:{
                address:address
            }
        });
        const sendData = await UserMetaData.findOne({user_email:id});
        res.send({
            data:sendData,
            message:EDIT_SUCCESS
        })

    } catch (error) {
        console.log(error);
        res.send({
            message: EDIT_FAILED
        })
    }
});


router.patch('/metadata/skills/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const {skills} = req.body;
        await UserMetaData.updateMany({user_email:id},{
            $set:{
                skills:skills
            }
        });

        const sendData = await UserMetaData.findOne({user_email:id});

        res.send({
            data: sendData,
            message: EDIT_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: EDIT_FAILED
        })
    }
})

router.get('/metaData/:email', async(req, res)=>{
    try {
        const {email} = req.params;
        const metadataByEmail = await UserMetaData.findOne({user_email:email});
        res.send({
            data:metadataByEmail,
            message:FETCH_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message:FETCH_FAILED
        })
    }
});


router.get('/:email',async(req,res) => {
    try {
        const {email} = req.params;        
        const userData = await User.findOne({email:email});
        res.send({
            data: userData,
            message:FETCH_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: FETCH_FAILED
        })
    }
})

router.get('/',async(req,res) => {
    try {
        const data = await User.find();
        res.send({
            data: data,
            message: FETCH_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: FETCH_FAILED
        })
    }
});

module.exports = router;
