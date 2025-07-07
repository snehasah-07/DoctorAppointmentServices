import React from 'react';
import Layout from '../components/Layout';
import { message, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const markAll = async()=>{
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/get-all-notifications',
        {
          userId: user._id
        },
        {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.success);
      }
      else{
        message.error(res.data.message);
      } 

    }
    catch(err){
      dispatch(hideLoading());
      console.log(err)
      message.error("Something went wrong");
    }
  };

  const deleteAll = async()=>{
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/delete-all-notifications',
        {
          userId: user._id
        },
        {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.success);
      }
      else{
        message.error(res.data.message);
      }
    }
    catch(err){
      console.log(err);
      message.error('Something went wrong')
    }
  };

  
  return (
    <Layout>
      <h3 className="text-center">Notifications Page</h3>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={markAll}>
              Mark all as read
            </button>
          </div>
          {user?.notification.map((notifications) => (
            <div
              className="card"
              onClick={navigate(notifications.onClickPath)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-text">{notifications.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={deleteAll}>
              Delete all
            </button>
          </div>
          {user?.seenNotification.map((seenNotifications) => (
            <div
              className="card"
              onClick={navigate(seenNotifications.onClickPath)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-text">{seenNotifications.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;