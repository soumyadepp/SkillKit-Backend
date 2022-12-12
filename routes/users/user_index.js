const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { FETCH_FAILED, FETCH_SUCCESS } = require('../../common/constants');
const User = require('../../models/User');
router.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
router.use(cors());

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