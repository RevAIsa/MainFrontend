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
const REREVIEW_ESSAY_URL = 'suggestion/rereview'
const { TabPane } = Tabs;

const EssayReviewer = ({ essayId, updateEssayInParent }) => {

  // state variables for a local version of the essay, the prompt array
  const [essay, updateEssay] = useState("");
  const [essayPrompt, updateEssayPrompt] = useState("");
  const [promptArray, updatePrompt] = useState(["Nothing to see yet!"].concat([""]).concat([""]).concat([""]).concat([""]).concat([""]).concat([""]));
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("hook");
  const [promptDictionary, updatePromptDictionary] = useState({
    hook: [],
    themes: [],
    grammar: [],
    voice: [],
    language: [],
    structure: [],
    relevance: [],
  });
  

  // use effect that is called each time the value of essayId changes
  useEffect(() => {

    fetchEssay()

  }, [essayId]);

  // function to handle the button click
  const handleCheckCardButtonClick = () => {

  }

  // Helper function to handle tab click
const handleTabClick = (key) => {
  setActiveTabKey(key);
  callbackTabClicked(key);
};

  // function to handle the rereviewbuttonclick
  // TODO
  const getReview = (category, paragraphIndex) => {
    // Make API call to get the updated response for the specific paragraph
    // Update the paragraph at the specified index in the prompt dictionary
    // Use the returned data or modify the paragraph as needed
    // Update the state using the updated prompt dictionary
    const updatedParagraph = "Updated paragraph";
  
    updatePromptDictionary((prevState) => {
      const updatedCategory = [...prevState[category]];
      updatedCategory[paragraphIndex] = updatedParagraph;
  
      return {
        ...prevState,
        [category]: updatedCategory,
      };
    });
  };


      // initialize tabs
const items = [
  { label: "Hook", key: "hook" },
  { label: "Themes", key: "themes" },
  { label: "Grammar", key: "grammar" },
  { label: "Voice", key: "voice" },
  { label: "Language", key: "language" },
  { label: "Structure", key: "structure" },
  { label: "Relevance", key: "relevance" },
].map((tab, index) => {
  const { label, key } = tab;

  const paragraphs = promptDictionary[key];

  return (
    <TabPane tab={label} key={key}>
      {paragraphs.map((paragraph, j) => (
        <RecommendationCard
          key={j}
          text={paragraph}
          onCheckButtonClick={handleCheckCardButtonClick}
          onReReviewClick={() => handleReReviewButtonClick(key, j)}
        />
      ))}
    </TabPane>
  );
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
    if (essay.split(" ").length > 10 && essay.split(" ").length < 5000) {
      try {
        setIsLoading(true);
  
        const GET_THEME_URL = GET_PROMPT_URL + category;
  
        const response_get_prompt = await axios.post(GET_THEME_URL, {
          essay: essay,
        });
  
        const paragraphs = response_get_prompt.data.response.split("\n\n");
  
        updatePromptDictionary((prevState) => ({
          ...prevState,
          [category]: paragraphs,
        }));
      } catch (err) {
        console.log(err);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReReviewButtonClick = async (category, paragraphIndex) => {
    try {
      // Retrieve the original paragraph from the promptDictionary
    const aiSuggestion = promptDictionary[category][paragraphIndex];

    // show the loading spinner
    setIsLoading(true);

    // get the response from the api
    const response = await axios.post(REREVIEW_ESSAY_URL, {
        aiSuggestion: aiSuggestion, 
        newEssay: essay
    });

    const aiNewSuggestion = response.data.response;
  
    // Make an API call to get the re-review for the specific paragraph using the original paragraph
    // Update the paragraph at the specified index in the prompt dictionary with the re-reviewed paragraph
    // Use the returned data or modify the paragraph as needed
    const updatedParagraph = "Updated paragraph";
  
    // Update the state using the updated prompt dictionary
    updatePromptDictionary((prevState) => {
      const updatedCategory = [...prevState[category]];
      updatedCategory[paragraphIndex] = aiNewSuggestion;
  
      return {
        ...prevState,
        [category]: updatedCategory,
      };
    });
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  // helper function that calls onPrompt when a tab is clicked
  // will be helpful when we add more logic limiting number of prompt api calls
  const callbackTabClicked = (key) => {
    console.log(key);
  
    const selectedItem = items.find((item) => item.key === key); // Find the item with matching key
    if (selectedItem) {
      const category = selectedItem.key;
      const index = items.indexOf(selectedItem); // Get the index of the selected item
      onPrompt(category, index);
    }
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
    <Tabs
        defaultActiveKey={activeTabKey}
        type="card"
        size="small"
        onTabClick={handleTabClick}
>   
    {items}
  </Tabs>
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