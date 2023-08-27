const express=require('express');
const { loginController, registorController, authCtrl, test,getProfile, getUser } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { applyDoctor, getDoctor } = require('../controller/doctorController');
const { createAppointment, getAppointmentsByPatient, deleteAppointment } = require('../controller/appoinmentController');
const { verifyDoctor, rejectDoctor } = require('../controller/adminController');

const router=express.Router()

router.post('/login',loginController);
router.post('/registor',registorController);
router.post('/getUserData',authMiddleware,authCtrl);
router.post('/test',authMiddleware,test)
router.post('/apply-doctor',applyDoctor)
router.post('/profile',getProfile);
router.get('/getdoctor',getDoctor);
router.get('/getuser',getUser);
router.post('/createAppointment',createAppointment);
router.get('/getAppointmentsByPatient/:patientId',getAppointmentsByPatient);
router.get('/deleteAppointment/:id',deleteAppointment);
router.get('/verifydoctor/:id',verifyDoctor)
router.get('/rejectdoctor/:id',rejectDoctor)
module.exports=router;