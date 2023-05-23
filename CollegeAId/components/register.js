import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import useToken from '../contexts/useToken';
import AuthContext from '../contexts/AuthProvider';
import axios from '../api/axios';
const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, userLogin } from './features/auth/authActions'

const Register = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const onFinish = (values) => {
    /*  console.log( JSON.stringify({
        firstName: values.name,
        lastName: values.last,
        password: values.password,
        email: values.email,
        graduationYear: values.grad
        }));
      try {
        const response_register = await axios.post(REGISTER_URL,
          {
            firstName: values.name,
            lastName: values.last,
            password: values.password,
            email: values.email,
            graduationYear: values.grad
            },
        );
        console.log(JSON.stringify(response_register));
*/

    dispatch(registerUser(values.name, values.last, values.password, values.email, values.grad))
    dispatch(userLogin(values.email, values.password))

    /* const response = await axios.post(LOGIN_URL,
       {
         email: values.email,
         password: values.password,
       },
     );
     console.log(JSON.stringify(response));
 
     const accessToken = response?.data?.token;
     setToken(accessToken);
     navigate('/home')
 */
  };

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/home')
  }, [navigate, userInfo, success])

  const onBack = () => {
    navigate('/')
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <Form
    name="basic"
    labelCol={{
      span: 10,
    }}
    wrapperCol={{
      span: 20,
    }}
    style={{
      maxWidth: 700,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="First Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your first name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Last Name"
      name="last"
      rules={[
        {
          required: true,
          message: 'Please input your last name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Graduation Year"
      name="grad"
      rules={[
        {
          required: true,
          message: 'Please input your last name!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="Register">
        Register
      </Button>
      <Button onClick={onBack} htmlType="Back">
        back
      </Button>
    </Form.Item>
  </Form>;

}

export default Register;