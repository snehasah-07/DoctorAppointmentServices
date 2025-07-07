const express = require("express");

const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

const {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
} = require("../controllers/doctorCtrl");

//Post get doctor info
router.post("/getDoctorInfo", authmiddleware, getDoctorInfoController);

//Post update profile
router.post("/updateProfile", authmiddleware, updateProfileController);

//Post get single doc info
router.post("/getDoctorById", authmiddleware, getDoctorByIdController);

module.exports = router;
