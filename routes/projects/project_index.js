const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const projectController = require('../../controllers/projectController');
bodyParser.urlencoded({ extended: true, limit: '50mb' });

router.use(cors());
router.use(bodyParser.json());

router.get('/',projectController.getAllProjects);
router.post('/',projectController.addProject);
router.put('/:id',projectController.updateProject);
router.put('/assign/:id',projectController.assignProject);
router.put('/unassign/:id',projectController.unassignProject);
router.put('/status/:id', projectController.updateProjectStatus);
router.delete('/:id',projectController.deleteProject);

module.exports = router;
