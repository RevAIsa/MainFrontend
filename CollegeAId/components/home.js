import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input,  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Col, Tabs} from 'antd';
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const Home = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

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

return    <Layout  style={{width: '100%',
    display: 'flex',}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',

        }}
      >

        <Menu  
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
         <Button onClick={onBack} htmlType="register">
        Register
      </Button>
      <Col span={12}>col-12-1
      <TextArea rows={4} />
      </Col>
      <Col span={12}>col-12-2  <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Card Tab ${id}`,
            key: id,
            children: `Content of card tab ${id}`,
          };
        })}
      /></Col>
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