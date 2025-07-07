import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Table } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);
  
  //get users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success){
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //antd table cols
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        <span>
          {record.isDoctor ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (text, record) => (
        <span>
          {record.isAdmin ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='d-flex'>
          <button className="btn btn-danger">Block</button>
        </div>
      ), 
    },
  ];
  
  return (
    <Layout>
        <h3 className='text-center'>All Users</h3>
        <hr></hr>
        <Table columns={columns} dataSource={users}></Table>
    </Layout>
  )
};

export default Users;
