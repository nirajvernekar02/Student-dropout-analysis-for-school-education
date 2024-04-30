const express = require('express')
const router = express.Router()
const analyticController = require('../controllers/analyticsController')

router.get('/dropout-ratio/school', analyticController.getDropoutRatioBySchool);
router.get('/dropout-ratio/area', analyticController.getDropoutRatioByArea);
router.get('/dropout-ratio/gender', analyticController.getDropoutRatioByGender);
router.get('/dropout-ratio/caste', analyticController.getDropoutRatioByCaste);
router.get('/dropout-ratio/standard', analyticController.getDropoutRatioByStandard);

router.get('/dropout-ratio/age', analyticController.getDropoutRatioByAge);
router.get('/dropout-ratio/location', analyticController.getDropoutRatioByLocation);

router.get('/total-drop-out',analyticController.calculateDropoutRatio)

router.get('/max-dropout-age',analyticController.findMaxDropoutAge)

router.get('/state-wise',analyticController.compareDropoutRatioStatewise)



module.exports = router