import React from 'react';
import { Text, } from 'react-native';
import { Button, Input, } from 'antd';
import { Layout, Col, Row, Tabs } from 'antd';
const { TextArea } = Input;
import { useState } from "react";
const UPLOAD_URL = '/essay/upload';
const GET_FILE_URL = '/essay/:id';
const GET_PROMPT_URL = '/suggestion/';
import { NavBar } from './NavBar';
import axios from '../api/axios';

export function EssayReviewer() {

  // stores local version of essay
  const [essay, updateEssay] = useState(null);

  const [promptArray, updatePrompt] = useState(["Nothing to see yet!"].concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]));
  console.log(promptArray)

  // initialize tabs
  const items = ["hook", "themes", "Grammar", "voice", "language", "structure", "relevance"].map((tabName, i) => {
    const id = String(i + 1);
    return {
      label: tabName,
      key: id,
      children: <Text>{promptArray[id - 1]}</Text>, // converts the tabname, a string, into a variable - pretty nifty stuff.

    };
  });

  // updates db when save button is clicked
  const onSave = async (values) => {
    try {
      const response_save = await axios.post(UPLOAD_URL,
        {
          userId: values.userId,
          customFileName: values.fileName
        },
      );
      console.log(JSON.stringify(response_register));

    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
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
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  // updates local version of essay
  const onChange = (e) => {
    updateEssay(e.target.value);
  };

  //universal api call for all prompts
  const onPrompt = async (category, key) => {

    var GET_THEME_URL = GET_PROMPT_URL + category
    console.log(GET_THEME_URL);
    console.log(key)
    if (essay.split(" ").length > 200 && essay.split(" ").length < 5000) {
      try {
        const response_get_prompt = await axios.post(GET_THEME_URL,
          {
            essay: essay
          },
        );
        const text = response_get_prompt.data.response
        console.log(text);
        //  const lines = text.split('\n');
        // console.log(line)
        // const elements = lines.map((line, index) => (
        //   <Text key={index}>{line}</Text>
        // ));

        var newpromptArray = promptArray.map((c, i) => {
          if (i === key) {
            // Increment the clicked counter
            return text;
          } else {
            // The rest haven't changed
            return c;
          }
        });



        updatePrompt(newpromptArray);

      } catch (err) {
        console.log(err);
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg('Login Failed');
        }
      }
    }
  };

  // helper function that calls onPrompt when a tab is clicked
  // will be helpful when we add more logic limiting number of prompt api calls
  const callbackTabClicked = (key) => {
    onPrompt(items[key - 1].label, key - 1)
  };

  return <Row justify="space-evenly" gutter={[24, 16]}>
    <Col span={12}>
      <TextArea showCount onChange={onChange} style={{ height: 700, resize: 'none' }} />
    </Col>

    <Col span={12}>
      <Tabs defaultActiveKey="1" type="card" size={"small"}
        items={items}
        onTabClick={callbackTabClicked}
      /></Col>
  </Row>;
}
