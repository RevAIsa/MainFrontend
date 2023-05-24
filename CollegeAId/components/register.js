import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import useToken from '../contexts/useToken';
import axios from '../api/axios';
import "../styles/Register.css"

const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';

// import assets
import Logo from "../assets/collegeaid_logo.png"

const Register = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const onFinish = async (values) => {
    console.log(JSON.stringify({
      firstName: values.name,
      lastName: values.last,
      password: values.password,
      email: values.email,
      graduationYear: values.grad
    }));

    try {
      // Register the user using the API
      const response_register = await axios.post(REGISTER_URL, {
        firstName: values.name,
        lastName: values.last,
        password: values.password,
        email: values.email,
        graduationYear: values.grad
      });
      console.log(JSON.stringify(response_register));

      // Login the user using the API
      const response = await axios.post(LOGIN_URL, {
        email: values.email,
        password: values.password,
      });
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.token;
      setToken(accessToken);
      navigate('/essayDashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const onBack = () => {
    navigate('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='register-container'>
      <img src={Logo} alt="Logo" className='logo-image'/>
        <div className='form-container'>
          <Form
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
            className='register-form'
          >
            <Form.Item
              label="First Name"
              name="firstname"
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
              name="lastname"
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
              name="graduationyear"
              rules={[
                {
                  required: true,
                  message: 'Please input your graduation year!',
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onBack} htmlType="Back" className='back-button'>
                  Back
                </Button>
                <Button type="primary" htmlType="Register" className='register-button'>
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
    </div>
  );
};

export default Register;
