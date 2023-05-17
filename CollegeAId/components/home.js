import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
      };

      const onBack = () => {
        navigate('/')
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

return <Button onClick={onBack} htmlType="register">
        Register
      </Button>

 
}

export default Home;