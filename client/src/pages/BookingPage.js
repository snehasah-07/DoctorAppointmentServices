import { React, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { DatePicker, message, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null); // Initialize to null
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const dispatch = useDispatch();

  // Login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // eslint-disable-next-line

  return (
    <Layout>
      <h3 className="text-center">Booking Page</h3>
      <hr></hr>
      <div className="container">
        {doctor ? (
          <div>
            <div>
              <b>Doctor Name:</b> {doctor.firstName} {doctor.lastName}
            </div>
            <div>
              <b>Specialization:</b> {doctor.specialization}
            </div>
            <div>
              <b>Experience:</b> {doctor.experience}
            </div>
            <div>
              <b>Fees per consultation:</b> {doctor.fees}
            </div>
            <div>
              <b>Timings:</b>{" "}
              {doctor.timings && doctor.timings.length > 0
                ? `${doctor.timings[0]} to ${doctor.timings[1]}`
                : "Not available"}
            </div>
            <div className="">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              ></DatePicker>

              <TimePicker
                format="HH:mm"
                onChange={(values) => setTime(moment(values).format("HH:mm"))}
              ></TimePicker>
              <button className="btn btn-primary mt-2">
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Appointment
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
