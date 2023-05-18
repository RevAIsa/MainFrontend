import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input,  } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Col, Row, Tabs} from 'antd';
import useToken from '../contexts/useToken';
import {LogoutOutlined} from '@ant-design/icons';
import { EssayReviewer } from './essayReviewer';
import { NavBar } from './NavBar';
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;



const Home = () => {
    const {state} = useLocation();
    const { title } = state;
    console.log(title);
    const {token, setToken} = useToken();
    console.log(token)

    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
      };

      const onBack = () => {
        navigate('/essays')
      };


      const onLogOut = () => {
        navigate('/')
      };


      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

return <Layout  style={{width: '100%',}}>
    <NavBar onBack = {onBack} onLogOut = {onLogOut}/>

      <Content

        style={{
          padding: '0 50px',
        }}
      >

        <div
          className="site-layout-content"
          style={{
         
          }}
        >
          <Text>{title}</Text>

    
         <EssayReviewer/>

        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
}

export default Home;