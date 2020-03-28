const express = require('express')
const router = express.Router()
const HomeController = require('../Apps/Controllers/Home.controller')
const auth = require('../Apps/midderware/au.midderware')

router.route('/')
    .get(HomeController.Home_Page)
router.route('/login')
    .get(HomeController.GetLogin)
    .post(HomeController.PostLogin)
router.route('/ForgotPassword')
    .get(HomeController.Get_Forgot_Password)
    .post(HomeController.Post_Forgot_Password)
router.route('/logout', auth.reqAuth)
    .get(HomeController.LogOut)
module.exports = router