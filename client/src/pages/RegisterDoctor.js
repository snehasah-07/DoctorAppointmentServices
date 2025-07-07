import { Col, Form, Input, Row, TimePicker } from "antd";
import Layout from "./../components/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
 

const RegisterDoctor = () => {
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Form Handler
    const onFinishHandler = async (values) => {
        try{
            dispatch(showLoading());
            const res = await axios.post(
              "/api/v1/user/register-doctor",
              { ...values, userId: user._id },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
                navigate('/');
            }
            else{
                message.error(res.data.message);
            }
        }
        catch(err){
            console.log(err);
            message.error("Something went wrong");
        }
    };

  return (
    <Layout>
      <h3 className="text-center">Register as a Doctor</h3>
      <hr></hr>
      <Form layout="vertical" onFinish={onFinishHandler} className="m-0">
        <h4>Personal Details: </h4>
        <Row gutter={18}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "First name is required" }]}
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
              rules={[{ required: true, message: "Phone number is required" }]}
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
              rules={[{ required: true, message: "Experience is required" }]}
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
                Register
              </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default RegisterDoctor;
