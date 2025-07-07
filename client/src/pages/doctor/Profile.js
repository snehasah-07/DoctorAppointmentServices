import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment';


const Profile = () => {
    const {user} = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Form Handler
    const onFinishHandler = async (values) => {
        try {
        dispatch(showLoading());
        const res = await axios.post(
            "/api/v1/doctor/updateProfile",
            { ...values, userId: user._id, 
                timings: [
                    moment(values.timings[0]).format('HH:mm'),
                    moment(values.timings[1]).format('HH:mm'),
                ],
             },
            {
            headers: {
                'authorization' : `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        dispatch(hideLoading());
        if (res.data.success) {
            message.success(res.data.message);
            navigate("/");
        } else {
            message.error(res.data.message);
        }
        } catch (err) {
        console.log(err);
        message.error("Something went wrong");
        }
    };


    const getDoctorInfo = async()=>{
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo', {
                userId: params.id
            },{
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.data.success){
                setDoctor(res.data.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorInfo();
        //eslint-disable-next-line
    }, []);

    return (
      <Layout>
        <h3 className="text-center">Manage Profile</h3>
        <hr />
        {doctor && (
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="m-0"
            initialValues={{...doctor,
                timings: [
                    moment(doctor.timings[0], 'HH:mm'),
                    moment(doctor.timings[1], 'HH:mm'),
                ],
            }}
          >
            <h4>Personal Details: </h4>
            <Row gutter={18}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input type="text" id="firstName" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input type="text" id="lastName" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { required: true, message: "Phone number is required" },
                  ]}
                >
                  <Input type="text" id="phone" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input type="email" id="email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input type="text" id="website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Address is required" }]}
                >
                  <Input type="text" id="address" />
                </Form.Item>
              </Col>
            </Row>
            <h4>Professional Details: </h4>
            <Row gutter={18}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  rules={[
                    { required: true, message: "Specialization is required" },
                  ]}
                >
                  <Input type="text" id="specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  rules={[
                    { required: true, message: "Experience is required" },
                  ]}
                >
                  <Input type="text" id="experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees Per Consulatation"
                  name="fees"
                  rules={[{ required: true, message: "Fees is required" }]}
                >
                  <Input type="number" id="fees" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Timings"
                  name="timings"
                  rules={[{ required: true, message: "Timings are required" }]}
                >
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button type="submit" className="btn btn-primary form-btn ">
                  Update
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Layout>
    );
};

export default Profile;