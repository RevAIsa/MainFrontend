import React from 'react';
import {  Text,  } from 'react-native';
import { Button, Input,  } from 'antd';
import {  Layout, Col, Row, Tabs} from 'antd';
const { TextArea } = Input;
const UPLOAD_URL = '/essay/upload';
const GET_FILE_URL = '/essay/:id';
import { NavBar } from './NavBar';


const onSave = async (values) => {
  try {
    const response_save = await axios.post(UPLOAD_URL,
      {
        userId:values.userId,
customFileName: values.fileName
        },
    );
    console.log(JSON.stringify(response_register));

} catch (err) {
  console.log(err);
    if (!err?.response) {
        setErrMsg('No Server Response');
    }  else {
        setErrMsg('Login Failed');
    }
      }
  };

// how to get file? where does id go
  const onLoad = async (values) => {
    try {
      const response_get_file = await axios.get(GET_FILE_URL,
        {
       
          },
      );
      console.log(JSON.stringify(response_get_file));
  
  

  } catch (err) {
    console.log(err);
      if (!err?.response) {
          setErrMsg('No Server Response');
      }  else {
          setErrMsg('Login Failed');
      }
        }
    };


export function EssayReviewer(){
    return  <Row justify="space-evenly" gutter={[24, 16]}>
      <Col span={12}>
        <TextArea style={{ height: 700, resize: 'none' }}/>
      </Col>
   
      <Col span={12}>  
      <Tabs defaultActiveKey="1" type="card" size={"small"}
      items={["Hooks","Themes", "Grammar", "Voice", "Language", "Structure","Relevance" ].map((tabName, i) => {
        const id = String(i + 1);
        return {
          label: tabName,
          key: id,
          children: <NavBar/> ,
        };
      })}
    /></Col>
    
    </Row>;
  
  }
  