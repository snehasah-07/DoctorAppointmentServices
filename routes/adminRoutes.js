const express = require("express");

const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.get("/getAllUsers", authmiddleware, getAllUsersController);

router.get("/getAllDoctors", authmiddleware, getAllDoctorsController);

router.post("/changeAccountStatus", authmiddleware, changeAccountStatusController);

module.exports = router;
