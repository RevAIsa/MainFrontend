import React, { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import useToken from '../contexts/useToken';
import axios from '../api/axios';
import "../styles/Register.css"
import { useSignIn } from 'react-auth-kit';
import useStore from "../Store";

const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';

// import assets
import Logo from "../assets/collegeaid_logo.png"

const Register = () => {

  // create state variables 
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();
  const signIn = useSignIn();

  // zustand state function to setUserId
  const setUserId = useStore(state => state.setUserId);

  const onFinish = async (values) => {
    console.log(JSON.stringify({
      firstName: values.firstname,
      lastName: values.lastname,
      password: values.password,
      email: values.email,
      graduationYear: values.graduationyear
    }));

    try {
      // Register the user using the API
      const response_register = await axios.post(REGISTER_URL, {
        firstName: values.name,
        lastName: values.last,
        password: values.password,
        email: values.email,
        graduationYear: values.grad, 
        essays: []
      });
      console.log(JSON.stringify(response_register));

      // Login the user using the API
      const response = await axios.post(LOGIN_URL, {
        email: values.email,
        password: values.password,
      });
      console.log(JSON.stringify(response));

      // use signIn from react-auth-kit to store the cookie
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: ({ email: values.email })
      });

      // set the zustand global state userId to the logged in users id
      setUserId(response.data.userId);

      navigate("/essayDashboard");

    } catch (error) {

      // show a username or password error if username or password was incorrect
      if (error.response && error.response.status === 400) {

        const { message } = error.response.data;
        setErrorMessage(message);

      } else {
        console.log(error);
      }
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
          {errorMessage && (
              <Alert
              message={errorMessage}
              type="error"
              showIcon
              closable
              onClose={() => setErrorMessage('')}
              />
          )}
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
