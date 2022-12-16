const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const Project = require('../../models/Project');
const { FETCH_SUCCESS,
    FETCH_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    EDIT_SUCCESS,
    EDIT_FAILED,
    DELETE_FAILED,
    DELETE_SUCCESS } = require('../../common/constants');
bodyParser.urlencoded({ extended: true, limit: '50mb' });

router.use(cors());
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const data = await Project.find();
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
})

router.post('/', async (req, res) => {
    try {
        const { name, version, description, stackUsed, assignedUsers, createdBy, deadline } = req.body;
        const newProject = new Project({
            name,
            version,
            description,
            stackUsed,
            assignedUsers,
            createdBy,
            deadline,
        });
        await newProject.save();
        res.send({
            data: newProject,
            message: REGISTER_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: REGISTER_FAILED
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, version, description, stackUsed, assignedUsers, deadline,status} = req.body;
        await Project.findByIdAndUpdate(id, {
            name: name,
            version: version,
            description: description,
            stackUsed: stackUsed,
            assignedUsers: assignedUsers,
            deadline: deadline,
            status:status
        });
        res.send({
            message: EDIT_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: EDIT_FAILED
        })
    }
});

router.put('/assign/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { assignedUsers } = req.body;
        await Project.updateMany({ _id: id }, {
            $set: {
                assignedUsers: assignedUsers
            }
        });
        const sendData = await Project.findById(id);
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
});

router.put('/status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.body?.status;
        const ans = await Project.findByIdAndUpdate(id,{
            $set:{
                status:status
            }
        })
        res.send({
            message: EDIT_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: EDIT_FAILED
        })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        Project.findByIdAndDelete(id);
        res.send({
            message: DELETE_SUCCESS
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: DELETE_FAILED
        })
    }
})

module.exports = router;
