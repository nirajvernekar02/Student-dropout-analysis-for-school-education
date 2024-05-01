const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.post('/register',adminController.registerAdmin)

router.post('/get-admin',adminController.getAllAdmins)

router.post('/login',adminController.loginAdmin)

router.put('/udpate-admin',adminController.updateAdmin)

router.delete('/delete-admin',adminController.deleteAdmin)

router.get('/get-admin-By-Id',adminController.getAdminById)

module.exports = router