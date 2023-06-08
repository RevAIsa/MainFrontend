import React, { useState, useEffect, useRef } from 'react';
import { Input, Spin } from 'antd';
import { Col, Row, Tabs, Typography, Modal } from 'antd';
import axios from '../api/axios';
import "../styles/EssayReviewer.css"
import RecommendationCard from './RecommendationCard';
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import Chat from './Chat';
import useStore from "../Store"
import { KeyOutlined } from '@ant-design/icons';

// api paths
const UPDATE_ESSAY_URL = "/essay/"
const GET_ESSAY_BY_ID_URL = '/essay/getOneString/:essayId';
const GET_PROMPT_URL = '/suggestion/';
const REREVIEW_ESSAY_URL = 'suggestion/rereview'

// globals
const { TabPane } = Tabs;

const EssayReviewer = ({ essayId, updateEssayInParent, setNumberIssuesAddressed, updateIssuesAddressedDictionary }) => {

  // definitions
  const editorRef = useRef(null);
  const { Title } = Typography;

  // zustand states for local storage management
  const userId = useStore(state => state.userId);

  // state variables and setters
  const [essay, updateEssay] = useState("");
  const [lastSavedEssay, setLastSavedEssay] = useState("");
  const [essayPrompt, updateEssayPrompt] = useState("");
  const [showReReviewAlert, setShowReReviewAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Using AI to review your essay...");
  const [activeTabKey, setActiveTabKey] = useState("grammar");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [childNumberIssuesAddressed, setChildNumberIssuesAdressed] = useState(0);
  const [promptDictionary, updatePromptDictionary] = useState({
    grammar: [
      `Welcome to CollegeAId! A platform using artificial intelligence to democratize the college admissions process. We are excited to review your essay.`,
      `As you move through the different tickets, make them as accepted or rejected using the thumb buttons. You need to make the changes yourself!.`,
        `It's time to get started! First and foremost, lets check your spelling and grammar. Click anywhere in the text box containing your essay to initialize
        a powerful, ai-powered grammar and spelling tool. Clicking "Save" will update your essay in our system.`
    ],
    hook: [],
    themes: [],
    voice: [],
    language: [],
    structure: [],
    relevance: [],
  });
  const [tabAPICallHistory, updateTabAPICallHistory] = useState({
    grammar: false, 
    hook: false, 
    themes: false, 
    voice: false, 
    language: false, 
    structure: false, 
    relevance: false
  });
  const [cardCompletionDictionary, updateCardCompletionDictionary] = useState({
    grammar: ["unaddressed", "unaddressed", "unaddressed"],
    hook: ["unaddressed", "unaddressed", "unaddressed"],
    themes: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
    voice: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
    language: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
    structure: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
    relevance: ["unaddressed", "unaddressed"],
  });

  // use effect that is called each time the value of essayId changes
  useEffect(() => {

    fetchEssay()

  }, [essayId, essayPrompt]);


//

  useEffect(() => {
    // Track the child state variable and invoke the callback function whenever it changes
    setNumberIssuesAddressed(childNumberIssuesAddressed);
  }, [childNumberIssuesAddressed, setNumberIssuesAddressed]);

  // use effect that is called each time the value of essayId changes
  useEffect(() => {

    updateIssuesAddressedDictionary(cardCompletionDictionary)

  }, [cardCompletionDictionary]);

  // Update the child state variable that tracks the number of completed issues
  const updateChildNumberIssuesAddressed = () => {

    let newNumberIssuesAddressed = 0;
    for (const key in cardCompletionDictionary) {
      const completionArray = cardCompletionDictionary[key];
      for (const value of completionArray) {
        if (value === "completed") {
          newNumberIssuesAddressed ++;
        }
      }
    }
    setChildNumberIssuesAdressed(newNumberIssuesAddressed);
  };
 
  // helper functions
  // Helper function to handle tab click
  const handleTabClick = (key) => {

    setActiveTabKey(key);
  
    updateTabAPICallHistory((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  
    saveEssay();

    callbackTabClicked(key);
  };

  // handle the condition and show or hide the rereviewer alert
  const handleShowAlert = () => {
    setShowReReviewAlert(true);
  };
  
  // Helper function to check if the "Grammar" tab is active
  const isGrammarTabActive = () => activeTabKey === 'grammar';

  const toggleAssistant = () => {
   setAssistantOpen(!assistantOpen);
 }

  // Helper function to render the RecommendationCard component
  const renderRecommendationCard = (paragraph, index, key) => (
    <RecommendationCard
      key={index}
      text={paragraph}
      toggleAssistant={toggleAssistant}
      hasDropShadow={true}
      onReReviewClick={() => handleReReviewButtonClick(key, index)}
      isCompleted={cardCompletionDictionary[key] && cardCompletionDictionary[key][index]}
      onCompletionStatusChange={isCompleted =>
        handleCardCompletionStatusChange(activeTabKey, index, isCompleted)}
      hideButtons={isGrammarTabActive()} // Conditionally hide the buttons when the "Grammar" tab is active
    />
  );

  const handleCardCompletionStatusChange = (key, index, isCompleted) => {
    console.log(`This is the key ${key}`)
    console.log(`This is the index ${index}`)
    console.log(`this is icCompleted ${isCompleted}`)
    console.log(isCompleted)
    updateCardCompletionDictionary(prevStatus => {
      const updatedDictionary = { ...prevStatus };
      if (!updatedDictionary[key]) {
        updatedDictionary[key] = [];
      }
      if (isCompleted == "accepted") {
        updatedDictionary[key][index] = "accepted";
      }
      else if (isCompleted == "rejected") {
        updatedDictionary[key][index] = "rejected";
      } else {
        updatedDictionary[key][index] = "unaddressed";
      }
      console.log(`This is the updated dictionary ${JSON.stringify(updatedDictionary)}`)
      return updatedDictionary;
    });
    updateChildNumberIssuesAddressed();
  };

  // helper function that updates the value of the essay if there is a change made in the textarea
  const handleEditorChange = (event) => {
    const newValue = event.target.value;
    updateEssay(newValue);
    updateEssayInParent(newValue);
  };

  // helper function to initialize tabs
  const items = [
    { label: "Grammar", key: "grammar" },
    { label: "Hook", key: "hook" },
    { label: "Themes", key: "themes" },
    { label: "Voice", key: "voice" },
    { label: "Language", key: "language" },
    { label: "Structure", key: "structure" },
    { label: "Relevance", key: "relevance" },
  ].map((tab, index) => {
    const { label, key } = tab;

    const paragraphs = promptDictionary[key];

    return (
      <TabPane tab={label} key={key}>
        {paragraphs.map(renderRecommendationCard)}
      </TabPane>
    );
  });

  // helper function that calls onPrompt when a tab is clicked
  // will be helpful when we add more logic limiting number of prompt api calls
  const callbackTabClicked = (key) => {
    console.log(cardCompletionDictionary);
  
    const selectedItem = items.find((item) => item.key === key); // Find the item with matching key
    if (selectedItem) {
      const category = selectedItem.key;
      const index = items.indexOf(selectedItem); // Get the index of the selected item

      if (tabAPICallHistory[key] == false) {
        onPrompt(category, index);
      }
    }
  };

  // api calls 
  // save a the new essay in our system under the current userId and essayId
  const saveEssay = async () => {
    try {

      const response = await axios.patch(UPDATE_ESSAY_URL, {
        essayId: essayId, 
        userId: userId,
        newEssayString: essay
      });

      console.log("Saved the essay and this was the response:")
      console.log(response)

      setLastSavedEssay(essay);

    } catch (error) {
      console.log(error)
    }
  }   

  // fetches the essay from the api based on the essayId
  const fetchEssay = async () => {
    try {

      const getSpecificEssayURL = GET_ESSAY_BY_ID_URL.replace(':essayId', essayId);
      const response = await axios.get(getSpecificEssayURL);

      console.log(response.data);
      updateEssay(response.data.essayString);
      updateEssayInParent(response.data.essayString);
      updateEssayPrompt(response.data.prompt);

    } catch (error) {
      console.log(error)
    }
  };

  //universal api call for all prompts
  const onPrompt = async (category, key) => {
    if (essay.split(" ").length > 10 && essay.split(" ").length < 5000) {
      try {
        setIsLoading(true);

        const GET_THEME_URL = GET_PROMPT_URL + category;

        const response_get_prompt = await axios.post(GET_THEME_URL, {
          essay: essay,
          prompt: essayPrompt
        });

        const paragraphs = response_get_prompt.data.response.split("\n\n");
        const fullParagraphs = paragraphs.filter(paragraph => paragraph.split(" ").length >= 10);

        updatePromptDictionary((prevState) => ({
          ...prevState,
          [category]: fullParagraphs,
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
    // check if the essay has been edited since the suggestion was rendered (tab was clicked)
    // basically just need to check if the current essay is different from the last saved essay
    // if not different, show an alert that says that there have been no changes since the suggestion was given
    if (essay === lastSavedEssay) {
      console.log("The essay hasn't been changed")
      handleShowAlert();
    }
    else {

      try {
        // Retrieve the original paragraph from the promptDictionary
        console.log('category:', category);
        console.log('paragraphIndex:', paragraphIndex);
        console.log(promptDictionary)
        const aiSuggestion = promptDictionary[activeTabKey][paragraphIndex];
        console.log(aiSuggestion);

        // show the loading spinner and spinner text to "Rereviewing ai.."
        setIsLoading(true);
        setLoadingText("Our AI is re-reviewing your new edits...")

        // get the response from the api
        const response = await axios.post(REREVIEW_ESSAY_URL, {
          aiSuggestion: aiSuggestion,
          newEssay: essay
        });

        const aiNewSuggestion = response.data.response;
        console.log(aiNewSuggestion);

        // Make an API call to get the re-review for the specific paragraph using the original paragraph
        // Update the paragraph at the specified index in the prompt dictionary with the re-reviewed paragraph
        // Use the returned data or modify the paragraph as needed
        const updatedParagraph = "Updated paragraph";

        // Update the state using the updated prompt dictionary
        updatePromptDictionary((prevState) => {
          const updatedCategory = [...prevState[activeTabKey]];
          updatedCategory[paragraphIndex] = aiNewSuggestion;

          return {
            ...prevState,
            [activeTabKey]: updatedCategory,
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingText("Using AI to review your essay...");
        setIsLoading(false);
      }
    }
  };

  // action performed when the save button is pressed
  // should update the essay in the database with the contents of essay
  const handleButtonPress = () => {
    // Perform an action with the contents of the TextArea
    console.log(essay);
    // Add your custom logic here
  };


  // returns the UI elements of the essay reviewer component along with their props client_F1N7MawpRKSKRomuVRwXMi
  return (
    <div className="essay-reviewer-container">
      {assistantOpen && <Chat toggleAssistant={toggleAssistant} essay={essay} />}
      <Row justify="space-evenly" gutter={[24, 16]}>
        <Col span={12}>
          <Title level={5}>Prompt: {essayPrompt}</Title>
          <Grammarly clientId={"client_F1N7MawpRKSKRomuVRwXMi"}
            config={{
              documentDialect: "british"
            }}>
            <GrammarlyEditorPlugin
              className='grammarly-editor-plugin'
              clientId={"client_F1N7MawpRKSKRomuVRwXMi"}
              config={{
                documentDialect: "british"
              }}
            >
              <textarea
                value={essay}
                onChange={handleEditorChange}
                ref={editorRef}
                style={{ height: '100%' }}
                className="essay-textarea"
              />
            </GrammarlyEditorPlugin>
          </Grammarly>
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
            <div>{loadingText}</div>
          </div>
        )}

      </Row>
      {showReReviewAlert && (

  <Modal
    title="Oops!"
    open={showReReviewAlert}
    onCancel={() => setShowReReviewAlert(false)}
    onOk={() => setShowReReviewAlert(false)}
    centered
    footer={null}
  >
    <p>The "Re-Review" button tells our AI to review how well your new changes address it's suggestion, but you haven't made any changes yet! Address the suggestion first, then hit ReReview.</p>
  </Modal>
)}
  </div>);

}

export default EssayReviewer;