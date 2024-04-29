const express = require('express')
const router = express.Router()
const searchController = require('../controllers/searchController')

router.get('/search-school',searchController.searchSchools)


router.get('/search-student',searchController.searchStudents)

module.exports = router