const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const projectController = require('../../controllers/projectController');
const calendarController = require('../../controllers/calendarController');
bodyParser.urlencoded({ extended: true, limit: '50mb' });

router.use(cors());
router.use(bodyParser.json());

router.get('/',projectController.getAllProjects);
router.post('/',projectController.addProject,calendarController.createEvent,projectController.updateProject, calendarController.updateEvent);
router.put('/:id',projectController.updateProject, calendarController.updateEvent);
router.put('/assign/:id',projectController.assignProject,calendarController.updateEvent);
router.put('/unassign/:id',projectController.unassignProject,calendarController.updateEvent);
router.put('/status/:id', projectController.updateProjectStatus);
router.delete('/:id',projectController.deleteProject);

module.exports = router;
