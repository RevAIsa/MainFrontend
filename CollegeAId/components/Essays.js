import { Divider, List, Typography } from 'antd';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import {BrowserRouter,
//   Routes, //replaces "Switch" used till v5
//   Route,
// } from "react-router-dom";
import { Button, Checkbox, Form, Input, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Col, Row, Tabs } from 'antd';
import useToken from '../contexts/useToken';
import { LogoutOutlined } from '@ant-design/icons';
import { EssayReviewer } from './essayReviewer';
import { NavBar } from './NavBar';
import '../styles/Essays.css';
import { Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EssayCard from './EssayCard';

// creates a functional component called essays that will store a grid view of all the user's uploaded essays
// currently shows a static list of essays, need to restyle and then dynamically load and add essays
function Essays() {

  // this is where all the code from the google doc goes
  const onLogOut = () => {
    navigate('/')
  };


  // the navigate hook is imported from react-router and is used to navigate between pages in the application
  const navigate = useNavigate();


  // useState hooks: define a state variable (eg. isEditing) and an associated setter function (eg. setIsEditting)
  // useState hooks should be initialized to a default value
  // useState hooks return an array with two elements: the current value of the state variable and the setter function
  const [isEditing, setIsEditing] = useState(false);
  const [editingEssay, setEditingEssay] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      title: "New New Essay",

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


  // defines static columns for the grid view we use to display the essays
  const columns = [
    {
      key: "1",
      title: "Essay Title",
      dataIndex: "title",
    },
    {
      key: "5",
      title: "Actions",


      // defines the rendering logic for the columns content
      // its a function that takes record as a param where record is the data object associated with the current row in the table
      render: (record) => {
        return (
          <>
            {/* EditOutlined is an antd component that represents an edit icon */}
            {/* onClick() specifies and event handler that will be executed when the edit icon is clicked */}
            <EditOutlined
              onClick={() => {
                onEditEssay(record);
              }}
            />
            {/* DeleteOutlined is an antd component that represents a delete icon */}
            {/* onClick() specifies and event handler that will be executed when the delete icon is clicked */}
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


  // function to be called when the "Add a new Essay" button, as defined in the Layout return, onClick function is triggered
  //
  const onAddEssay = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newEssay = {
      id: randomNumber,
      title: "title " + randomNumber,
    };
    // updates the data source state variable using the setDataSource setter function
    // returns the new data source, which is the old data source with the new essay appended to the end of the list
    setDataSource((pre) => {
      return [...pre, newEssay];
    });
  };


  // function to be called when the DeleteOutline component's onClick function is triggered
  const onDeleteEssay = (record) => {
    // uses the Modal.confirm method from the antd library to confirm that the user wants to delete their essay from the platform
    Modal.confirm({
      title: "Are you sure, you want to delete this Essay record?",
      okText: "Yes",
      okType: "danger",
      // callback function that gets called when the user confirms by hitting the yes button
      onOk: () => {
        // updates the data source to be equal to the current datasource without the essay that was clicked
        setDataSource((pre) => {
          return pre.filter((Essay) => Essay.id !== record.id);
        });
      },
    });
  };


  // function to be called when the Deleteoutline
  // navigates to the hometab, passing the title of the essay as a state variable
  const onEditEssay = (record) => {
    //  setIsEditing(true);
    console.log(record.title)
    navigate('/home', { state: { title: record.title } });
  };


  // function to reset the editing useState of the page
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEssay(null);
  };


  // returns all of the UI components for the essay page
  return (
    <Layout style={{ width: '100%', }}>
      <div className="App">
        {/* Defines the prop for the logout button (which is defined in the nav bar component) */}
        <NavBar onLogOut={onLogOut} />
        <header className="App-header">

          {/* Defines a table whose columns are defined by the columns array and whose fotte is an AddEssay button */}
          {/* The data source for the table is set to dataSource, a useState defined at the top of the essays component */}
          <Table columns={columns} dataSource={dataSource} footer={() => <Button onClick={onAddEssay}>Add a new Essay</Button>}></Table>

          {/* <div>
      <EssayCard
        id={"4"}
        title={"Essay Title"}
        lastUpdated={"Today"}
        onDelete={"onDeleteEssay"}
      />
    </div> */}

        </header>
      </div>
    </Layout>
  );

  // return the dashboard with a different EssayCard for each essay
  // Sample data for the essay
  // const essay = {
  //   id: 1,
  //   title: 'Sample Essay',
  //   lastUpdated: '2023-05-22',
  // };

  // const handleEdit = () => {
  //   // Logic for editing the essay
  // };

  // const handleDelete = () => {
  //   // Logic for deleting the essay
  // };

  // return (
  <div>
    <EssayCard
      id={essay.id}
      title={essay.title}
      lastUpdated={essay.lastUpdated}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  </div>
  // );
}
export default Essays;