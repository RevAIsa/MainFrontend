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

export function EssayReviewer(){
    return       <Row justify="space-evenly" gutter={[24, 16]}>
    <Col span={12}>
    <TextArea style={{ height: 700, resize: 'none' }}
     />
    </Col>
    <Col span={12}>  <Tabs
      defaultActiveKey="1"
      type="card"
      size={"small"}
  
      items={["Hooks","Themes", "Grammar", "Voice", "Language", "Structure","Relevance" ].map((tabName, i) => {
        const id = String(i + 1);
        return {
          label: tabName,
          key: id,
          children: `Content of card tab 1`,
        };
      })}
    /></Col>
    </Row>;
  }
  