import { Divider, List, Typography } from 'antd';
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
import { EssayReviewer } from './essayReviewer';
import { NavBar } from './NavBar';
import '../App.css';
import { Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


function Essays() {
  const onLogOut = () => {
    navigate('/')
  };

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingEssay, setEditingEssay] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      title: "Dartmouth Essay",
     
    },
    {
      id: 2,
      title: "Penn Essay",
     
    },
    {
      id: 3,
      title: "NYU Essay",
     
    },
    {
      id: 4,
      title: "Columbia Essay",

    },
  ]);
  const columns = [
    {
      key: "1",
      title: "Essay Title",
      dataIndex: "title",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditEssay(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteEssay(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const onAddEssay = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newEssay = {
      id: randomNumber,
      title: "title " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newEssay];
    });
  };
  const onDeleteEssay = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Essay record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((Essay) => Essay.id !== record.id);
        });
      },
    });
  };
  const onEditEssay = (record) => {
  //  setIsEditing(true);
    console.log(record.title)
    navigate('/home', { state: { title: record.title }} );
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEssay(null);
  };
  return (
    <Layout  style={{width: '100%',}}>
    <div className="App">
      <NavBar  onLogOut = {onLogOut}/>
      <header className="App-header">
      
        <Table columns={columns} dataSource={dataSource}  footer={() =>   <Button onClick={onAddEssay}>Add a new Essay</Button>}></Table>
        
        <Modal
          title="Edit Essay"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((Essay) => {
                if (Essay.id === editingEssay.id) {
                  return editingEssay;
                } else {
                  return Essay;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingEssay?.title}
            onChange={(e) => {
              setEditingEssay((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
         
        </Modal>
      </header>
    </div>
    </Layout>
  );
}
export default Essays;