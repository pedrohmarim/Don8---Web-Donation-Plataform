const express = require('express')
const router = express.Router()
const signController = require('../controllers/SignController')
const companySignController = require('../controllers/CompanySignUpController')
const handleLogin = require('../controllers/handleLogin')
const caseController = require('../controllers/caseController')
const returnAccountData = require('../controllers/returnAccountData')

router.post('/signup', signController.store)
router.put('/addAddress', signController.addAddress)

router.post('/companysignup', companySignController.store)
router.put('/addAddressCompany', companySignController.addAddress)

router.post('/case', caseController.store)
router.get('/showPosts', caseController.selectPosts)
router.get('/showViewPost', caseController.selectByPostId)

router.get('/login', handleLogin.loginCheck)
router.get('/user', returnAccountData.selectUser)
router.get('/company', returnAccountData.selectCompany)
router.get('/allUsers', returnAccountData.selectAllUsers)

module.exports = router