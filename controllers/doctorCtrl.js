const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
        userId: req.body.userId
    });
    res.status(200).send({
        success: true,
        message: "Doctor info fetched successfully",
        data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        message: "Error in getting doctor info",
        success: false,
        error
    });
  }
};

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({
            userId: req.body.userId
        }, req.body, 
    );
        res.status(201).send({
            success: true,
            message: "Doctor info updated successfully",
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in updating doctor info",
            success: false,
            error
        });
    }
};

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId});
        res.status(200).send({
            success: true,
            message: "Doctor info fetched successfully",
            data: doctor,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            message: "Error in getting doctor info",
            success: false,
            error
        });
    }

}

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
};
