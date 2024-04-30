const express = require('express')
const router = express.Router()
const countController = require('../controllers/countanalyticController')


router.get('/total-counts',countController.getSchoolCounts)


router.get('total-by-school',countController.getTotalStudentsInSchool)

module.exports = router