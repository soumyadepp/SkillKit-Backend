const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { FETCH_FAILED, FETCH_SUCCESS } = require('../../common/constants');
const User = require('../../models/User');
const UserMetaData = require('../../models/UserMetaData');
router.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
router.use(cors());


router.post('/metaData', (req, res)=>{
    const {user_id, address, designation, skills} = req.body;

    console.log(user_id, address, designation, skills);

    new UserMetaData({user_id, address, designation, skills }).save((err, doc)=>{

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

router.put('/metaData', (req, res)=>{

    const {user_id, address, designation, skills} = req.body;

    UserMetaData.findOne({user_id}, (err, docs)=>{
        if(err)
        {
            res.send({
                message : FETCH_FAILED
            })
        }
        else
        {
            console.log(docs);
            UserMetaData.findByIdAndUpdate(docs._id, {address, designation, skills}).then((docs)=>{
                res.send({
                    data : docs,
                    message : FETCH_SUCCESS
                });
            }).catch((e)=>{
                res.send({
                    message : FETCH_FAILED
                })
            })
        }
    })
});

router.get('/metaData', (req, res)=>{

    const {user_id} = req.body;

    UserMetaData.findOne({user_id : user_id}, (err, docs)=>{
        if(err)
        {
            console.log(err);
            res.send({
                message : FETCH_FAILED
            })
        }
        else
        {
            console.log(docs);
            res.send({
                data : docs,
                message : FETCH_SUCCESS
            });
        }
    })
});

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
