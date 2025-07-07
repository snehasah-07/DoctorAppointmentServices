import React from "react";
import { Form, Input, message } from "antd";
import "../styles/login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async(values) => {
    //Form Handler
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem('token', res.data.token);
        message.success('Logged in successfully');
        navigate('/');
      }
      else{
        message.error(res.data.message);
      }
    }
    catch(err){
      dispatch(hideLoading());
      console.log(err);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="form">
          <h3>Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" id="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" id="password" />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link className="link" to="/register">
            Don't have an account? Register
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
