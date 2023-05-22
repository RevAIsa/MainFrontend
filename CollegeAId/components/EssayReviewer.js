import React from 'react';
import {  Text,  } from 'react-native';
import { Button, Input,  } from 'antd';
import {  Layout, Col, Row, Tabs} from 'antd';
const { TextArea } = Input;
const UPLOAD_URL = '/essay/upload';
const GET_FILE_URL = '/essay/:id';
const GET_PROMPT_URL = '/suggestion/';



import { NavBar } from './NavBar';

const items = ["hook","themes", "Grammar", "voice", "language", "structure","relevance" ].map((tabName, i) => {
  const id = String(i + 1);
  return {
    label: tabName,
    key: id,
    children: `Content of Tab Pane ${id}`,
    style:
      i === 0
        ? {
            height: 200,
          }
        : undefined,
  };
});

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

// how to get file? where does id go
const onPrompt = async (category) => {
  var GET_THEME_URL = GET_PROMPT_URL + category
  console.log(GET_THEME_URL);
 /* try {
    const response_get_prompt = await axios.get(GET_PROMPT_URL,
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
      }*/
  };





const callbackTabClicked = (key) => {
  onPrompt(items[key-1].label)
};

export function EssayReviewer(){
    return  <Row justify="space-evenly" gutter={[24, 16]}>
      <Col span={12}>
        <TextArea showCount style={{ height: 700, resize: 'none' }}/>
      </Col>
   
      <Col span={12}>  
      <Tabs defaultActiveKey="1" type="card" size={"small"}
      items={items}

      onTabClick={callbackTabClicked}
    /></Col>
    </Row>;
  }
  