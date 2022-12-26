const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { FETCH_FAILED, FETCH_SUCCESS,REGISTER_FAILED, REGISTER_SUCCESS } = require('../../common/constants');
const Task = require('../../models/Task');
const taskControllers = require('../../controllers/tasksController');
router.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
router.use(cors());

router.get('/',taskControllers.getAllTasks);

module.exports = router;