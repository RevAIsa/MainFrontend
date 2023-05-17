import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import useToken from '../contexts/useToken';
import AuthContext from '../contexts/AuthProvider';
import axios from '../api/axios';
const LOGIN_URL = '/auth/login';


const LogIn = () => {
    //const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const {token, setToken} = useToken();

    const onFinish = async (values) => {
      console.log( JSON.stringify({email: values.username ,password: values.password }));
      try {
        const response = await axios.post(LOGIN_URL,
          {email: values.username ,password: values.password },
        );
        console.log(JSON.stringify(response));
        const accessToken = response?.data;
        setToken(accessToken);
        navigate('/home')
    } catch (err) {
      console.log(err);
        if (!err?.response) {
            setErrMsg('No Server Response');
        }  else {
            setErrMsg('Login Failed');
        }
          }
      };

      const onRegister = () => {
        navigate('/register')
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

return <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
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
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button onClick={onRegister} htmlType="register">
        Register
      </Button>
    </Form.Item>
  </Form>;
 
}

export default LogIn;