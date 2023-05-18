import React from 'react';
import {  Text,  } from 'react-native';
import { Button, Input,  } from 'antd';
import {  Layout, Col, Row, Tabs} from 'antd';
const { TextArea } = Input;

export function EssayReviewer(){
    return <div>  

    
      <Row justify="space-evenly" gutter={[24, 16]}>
    <Col span={12}>
    <Button htmlType="logout">
        <Text >Save Essay</Text>
        </Button>
    <TextArea style={{ height: 300, resize: 'none' }}
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
    </div>   
  }
  