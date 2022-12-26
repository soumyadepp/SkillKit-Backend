const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const userMetadataController = require('../../controllers/metadataController');
const usersController = require('../../controllers/usersController');

router.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
router.use(cors());

//user metadata

router.get('/metadata',userMetadataController.getUserMetadata);

router.get('/metadata/:email',userMetadataController.getUserMetadataByEmail);

router.post('/metadata',userMetadataController.postUserMetadata);

router.patch('/metadata/basic/:id',userMetadataController.updateBasicDetails);

router.patch('/metadata/image/:id',userMetadataController.updateProfilePicture);

router.patch('/metadata/address/:id',userMetadataController.updateAddress);

router.patch('/metadata/skills/:id',userMetadataController.updateSkills);


//users
router.get('/',usersController.getAllUsers);

router.get('/:email',usersController.getUserByEmail);

module.exports = router;
