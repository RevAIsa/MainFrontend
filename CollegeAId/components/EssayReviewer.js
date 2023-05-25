import React, { useState, useEffect } from 'react';
import { Input, Spin } from 'antd';
import {  Col, Row, Tabs, Button } from 'antd';
const { TextArea } = Input;
import axios from '../api/axios';
import "../styles/EssayReviewer.css"
import RecommendationCard from './RecommendationCard';

// api paths
const UPLOAD_ESSAY_URL = '/essay/upload';
const GET_ESSAY_BY_ID_URL = '/essay/getOneString/:essayId';
const GET_PROMPT_URL = '/suggestion/';

const EssayReviewer = ({ essayId, updateEssayInParent }) => {

  // state variables for a local version of the essay, the prompt array
  const [essay, updateEssay] = useState("");
  const [essayPrompt, updateEssayPrompt] = useState("");
  const [promptArray, updatePrompt] = useState(["Nothing to see yet!"].concat([""]).concat([""]).concat([""]).concat([""]).concat([""]).concat([""]));
  const [isLoading, setIsLoading] = useState(false);

  // use effect that is called each time the value of essayId changes
  useEffect(() => {

    fetchEssay()

  }, [essayId]);

  // function to handle the button click
  const handleCheckCardButtonClick = () => {

  }

  // function to handle the rereviewbuttonclick
  // TODO
  const handleReReviewButtonClick = () => {
    console.log("Rereviewing the cards.")
  }


      // initialize tabs
    const items = ["Hook", "Themes", "Grammar", "Voice", "Language", "Structure", "Relevance"].map((tabName, i) => {
    const id = String(i + 1);

    // right now we are accessing the promptArray for the given inddex [id-1] and splitting it on its paragraphs into an array
    // we are then maping each paragraph to a different child RecommendationCard
    // I need to refactor items and id with better names and also use them to track keys instead of indexes
    // instead what I can do is store a dictionary
    // the dictionary key can by the "hook", "themes", "voice", etc (remove grammar - will need to handle hat some other way)
    // each key will store an array of paragraph responses from that api
    // add code saying that if you click My Essays or Log Out, you will lose the current response. 
    // when updating the dictionary state variable (what is currently the prompt array), the paragraphs should re render
    // if rereviewing, load the response only as a replacement to the text on the card that currently exists
    // add ability to uncheck the card to make it white if it is currently green
    // hook it up to the new api to get a new 
    const paragraphs = promptArray[id - 1].split("\n\n");
    return {
      label: tabName,
      key: id,
      children: paragraphs.map((paragraph, j) => (
        <RecommendationCard
          key={j}
          text={paragraph}
          onCheckButtonClick={handleCheckCardButtonClick}
          onReReviewClick={handleReReviewButtonClick}
          />
        )),
       };
      });

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
    if (essay.split(" ").length > 10 && essay.split(" ").length < 5000) {
      try {
        setIsLoading(true);
        console.log("hello")
        const response_get_prompt = await axios.post(GET_THEME_URL,
          {
            essay: essay
          },
        );
        const text = response_get_prompt.data.response
        console.log(response_get_prompt)
        console.log(text);
        console.log(GET_THEME_URL)
        console.log(response_get_prompt)

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
      } finally {
        setIsLoading(false);
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
        style={{ height: 700, resize: 'none', padding: "16px" }}
        value={essay} />
    </Col>

    <Col span={12}>
      <Tabs defaultActiveKey="1" type="card" size={"small"}
        items={items}
        onTabClick={callbackTabClicked}
      />
    </Col>

      {isLoading && (
        <div className='spinner-container'>
          <Spin size="large" />
          <div>Loading...</div>
        </div>
      )}

  </Row>;
}

export default EssayReviewer;