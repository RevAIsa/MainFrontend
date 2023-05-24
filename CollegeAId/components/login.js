import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import useToken from '../contexts/useToken';
import axios from '../api/axios';
import '../styles/Login.css';

// import assets
import Logo from "../assets/collegeaid_logo.png"

// api paths
const LOGIN_URL = '/auth/login';

const LogIn = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const onFinish = async (values) => {
    console.log(JSON.stringify({ email: values.username, password: values.password }));

    try {
      const response = await axios.post(LOGIN_URL, { email: values.username, password: values.password });
      console.log(JSON.stringify(response));
      const accessToken = response?.data;
      setToken(accessToken);
      navigate('/essays');
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const onRegister = () => {
    navigate('/register');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='register-container'>
      <img src={Logo} alt="Logo" className='logo-image' />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={onRegister} htmlType="register" className='registerButton'>
            Register
          </Button>
          <Button type="primary" htmlType="submit" className="login-button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;


