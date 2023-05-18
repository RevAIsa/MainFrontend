import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input,  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Col, Row, Tabs} from 'antd';
import useToken from '../contexts/useToken';
import {LogoutOutlined,RollbackOutlined} from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

export function  NavBar(props){

    return <Header
    theme="dark"
     style={{
       display: 'flex',
       alignItems: 'center',
       justifyContent:"space-between",
       marginBottom: 10,
    
     }}
    >
    
     <Text style={styles.baseText}> CollegeAId </Text>
     <div>

    {props.onBack && <Button  onClick={props.onBack} htmlType="back">
    
     <Text>My Essays  </Text>
     <RollbackOutlined />
    </Button>    }
     <Button  onClick={props.onLogOut} htmlType="logout">
    <Text>Log Out   </Text>
     <LogoutOutlined />
    </Button>
    </div>
    </Header>;
  };


  const styles = StyleSheet.create({
    baseText: {
      fontWeight: 'bold',
      color: 'white',
    },
  });