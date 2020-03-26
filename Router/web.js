const router = require('express').Router()
const HomeController = require('../Apps/Controllers/Home.controller')
const StaffController = require('../Apps/Controllers/Staff.controller')
const StudentAndTutorController = require('../Apps/Controllers/StudentAndTutor.controller')
const auth = require('../Apps/midderware/au.midderware')

// router.get('/', HomeController.Home_Page)
router.get('/login', HomeController.GetLogin)
router.post('/login', HomeController.PostLogin)
router.get('/logout', HomeController.LogOut)
router.get('/staff',auth.reqAuth, auth.CheckStaff, StaffController.Page_Index)
router.get('/staff/profile',auth.reqAuth, auth.CheckStaff, StaffController.Staff_Profile)
router.get('/Faculty/Create', auth.reqAuth, auth.CheckStaff, StaffController.Get_Create_Faculty)
router.get('/Faculty/Update/:faculty_id', auth.reqAuth, auth.CheckStaff, StaffController.Get_Update_Faculty)
router.get('/Faculty/Delete/:faculty_id', auth.reqAuth, auth.CheckStaff, StaffController.Delete_Faculty)
router.get('/Faculty/Subject/:faculty_id', auth.reqAuth, auth.CheckStaff, StaffController.Subject_Page)
router.get('/Subject/Create', auth.reqAuth, auth.CheckStaff, StaffController.Get_Create_Subject)
router.get('/Subject/Update/:subject_id', auth.reqAuth, auth.CheckStaff, StaffController.Get_Update_Subject)
router.get('/Subject/Delete/:subject_id', auth.reqAuth, auth.CheckStaff, StaffController.Get_Update_Subject)
router.get('/Faculty/subject/class/:subject_id', auth.reqAuth, auth.CheckStaff, StaffController.Class_Page)
router.get('/Faculty',auth.reqAuth, auth.CheckStaff, StaffController.Faculty_Page)
router.get('/class', StaffController.Class_Page)
router.get('/subject', StaffController.Subject_Page)
router.get('/', HomeController.Home_Page)
router.get('/student',auth.reqAuth ,StudentAndTutorController.Class_Page)
router.get('/student/detail',auth.reqAuth ,StudentAndTutorController.Profile_Page)
module.exports = router
