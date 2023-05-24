import React, { useState, useEffect } from 'react';
import { Text, Button } from 'react-native';
import { Input, } from 'antd';
import {  Col, Row, Tabs } from 'antd';
const { TextArea } = Input;
import axios from '../api/axios';

// api paths
const UPLOAD_ESSAY_URL = '/essay/upload';
const GET_ESSAY_BY_ID_URL = '/essay/getOneString/:essayId';
const GET_PROMPT_URL = '/suggestion/';

const EssayReviewer = ({ essayId, updateEssayInParent }) => {

  // state variables for a local version of the essay, the prompt array
  const [essay, updateEssay] = useState("");
  const [essayPrompt, updateEssayPrompt] = useState("");
  const [promptArray, updatePrompt] = useState(["Nothing to see yet!"].concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]).concat(["Loading..."]));

  // use effect that is called each time the value of essayId changes
  useEffect(() => {

    fetchEssay()

  }, [essayId]);

  // initialize tabs
  const items = ["Hook", "Themes", "Grammar", "Voice", "Language", "Structure", "Relevance"].map((tabName, i) => {
    const id = String(i + 1);
    return {
      label: tabName,
      key: id,
      children: <Text>{promptArray[id - 1]}</Text>, // converts the tabname, a string, into a variable - pretty nifty stuff.

    };
  });

  const XMLToString = (xmlData) => {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlData);
  };

  // fetches the essay from the api based on the essayId
  const fetchEssay = async() => {
    try {

      const getSpecificEssayURL = GET_ESSAY_BY_ID_URL.replace(':essayId', essayId);
      const response = await axios.get(getSpecificEssayURL);

      console.log(response.data);
      updateEssay(response.data.essayString);
      updateEssayInParent(response.data.essayString);
      updateEssayPrompt(response.data.essayPrompt);

    } catch (error) {
      console.log(error)
    }
  };  

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
  // also updates the local version of the essay in the parent component
  const onChange = (e) => {
    updateEssay(e.target.value);
    updateEssayInParent(e.target.value);
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

  // action performed when the save button is pressed
  // should update the essay in the database with the contents of essay
  const handleButtonPress = () => {
    // Perform an action with the contents of the TextArea
    console.log(essay);
    // Add your custom logic here
  };

  // returns the UI elements of the essay reviewer component along with their props
  // initially loads the essay into the text field based on the EssayReviewer's essayId prop
  return <Row justify="space-evenly" gutter={[24, 16]}>
    <Col span={12}>
      <TextArea 
        showCount 
        onChange={onChange} 
        style={{ height: 700, resize: 'none' }}
        value={essay} />
    </Col>

    <Col span={12}>
      <Tabs defaultActiveKey="1" type="card" size={"small"}
        items={items}
        onTabClick={callbackTabClicked}
      />
      </Col>
  </Row>;
}

export default EssayReviewer;