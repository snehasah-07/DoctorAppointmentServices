import {React, useEffect, useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorsList from '../components/DoctorsList';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  //login user data
  const getUserData = async() => {
    try{
      const res = await axios.get('/api/v1/user/getAllDoctors',{
        headers:{
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    if(res.data.success){
      setDoctors(res.data.data);
    }
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    getUserData();
  }
  ,[]);

  return (
    <Layout>
      <h3 className='text-center'>Doctors List</h3>
      <hr></hr>
      <Row>
        {doctors && doctors.map(doctor => (
          <DoctorsList doctor={doctor}></DoctorsList>
        ))}
      </Row>
    </Layout>
  );
}

export default HomePage