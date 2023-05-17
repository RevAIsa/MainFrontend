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
import {LogoutOutlined} from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

export function  NavBar(props){
    return       <Header
    theme="dark"
     style={{
       display: 'flex',
       alignItems: 'center',
       justifyContent:"space-between",
       marginBottom: 10,
    
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
       }
       
       )
     
     }
     />
    
     <Button  onClick={props.onBack} htmlType="logout">
     <LogoutOutlined />
    </Button>
    </Header>;
  }
  
