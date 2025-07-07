const express = require('express');
const {
  loginController,
  registerController,
  authController,
  registerDoctorController,
  getAllNotificationsController,
  deleteAllNotificationsController,
  getAllDoctorsController,
  bookAppointmentController,
} = require("../controllers/userCtrl");
const authmiddleware = require('../middlewares/authmiddleware');

const router = express.Router();

router.post('/login', loginController);

router.post('/register', registerController);

router.post('/getUserData', authmiddleware, authController); 

router.post("/register-doctor", authmiddleware, registerDoctorController); 

router.post("/get-all-notifications", authmiddleware, getAllNotificationsController); 

router.post(
  "/delete-all-notifications",
  authmiddleware,
  deleteAllNotificationsController
); 

router.get("/getAllDoctors", authmiddleware, getAllDoctorsController);

//book appointment
router.post("/book-appointment", authmiddleware, bookAppointmentController);

module.exports = router;
