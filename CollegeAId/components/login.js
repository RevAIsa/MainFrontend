import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import axios from '../api/axios';
import '../styles/Login.css';
import useStore from "../Store";

// import assets
import Logo from "../assets/collegeaid_logo.png"

// api paths
const LOGIN_URL = '/auth/login';

const LogIn = () => {

  // create state variables 
  const [errorMessage, setErrorMessage] = useState();

  // zustand state function to setUserId
  const setUserId = useStore(state => state.setUserId);

  const navigate = useNavigate();
  const signIn = useSignIn();

  const formRef = useRef(null);

  // trigger the login button when the enter key is pressed on the keyboard
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      formRef.current.submit();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // this is the logic for the login process 
  // this we need to log the user in, add the token to their cookies, and then go to that users essayDashbaord
  const onFinish = async (values) => {
    try {

      // get the login response from the server
      const response = await axios.post(LOGIN_URL, {
        email: values.email, 
        password: values.password
      });
      console.log(response.data);

      // use signIn from react-auth-kit to store the cookie
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: ({ email: values.email })
      });

      // set the zustandglobal state userId to the logged in users id
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
  }

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
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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
