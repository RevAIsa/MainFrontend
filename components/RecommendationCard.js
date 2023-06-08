import React, { useState } from 'react';
import { Button } from 'antd';
import {  DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import '../styles/RecommendationCard.css';
import useStore from "../Store";

// color constants
const green = "#e0f7e0";
const purple = "#efd8ff";
const white = "#ffffff";

const RecommendationCard = ({ text, toggleAssistant, onReReviewClick, hideButtons, onCompletionStatusChange }) => {
  const [cardColor, setCardColor] = useState(white);
  const [hasDropShadow, setDropShadow] = useState(true);
  const [cardCompleted, setCardCompleted] = useState(false);

  const handleThumbsUpClick = () => {
    if (cardColor === white || cardColor === purple) {
    setCardColor(green); // Turn card green
    setDropShadow(false);
    if (onCompletionStatusChange) {
      onCompletionStatusChange("accepted"); // Set the completion status to true
    }
  } else {
    setCardColor(white); // Turn card white
    setDropShadow(true);
    if (onCompletionStatusChange) {
      onCompletionStatusChange("unaddressed"); // Set the completion status to true
    }
  }
  };

  const handleThumbsDownClick = () => {
    if (cardColor === white || cardColor === green) {
    setCardColor(purple); // Turn card green
    setDropShadow(false);
    if (onCompletionStatusChange) {
      onCompletionStatusChange("rejected"); // Set the completion status to true
    }
  } else {
    setCardColor(white); // Turn card white
    setDropShadow(true);
    if (onCompletionStatusChange) {
      onCompletionStatusChange("unaddressed"); // Set the completion status to true
    }
  }
  };

  const setSelectedSuggestion = useStore(state => state.setSelectedSuggestion);

  const handleReReviewClick = () => {
    onReReviewClick();
  };

  const handleDiscussClick = () => {
    setSelectedSuggestion(text)
    toggleAssistant();
  }

  return (
    <div className={`recommendation-card ${hasDropShadow ? 'drop-shadow' : ''}`} style={{ backgroundColor: cardColor }}>
      <div className="recommendation-card-content">
        {text}
      </div>
      <div className='recommendation-card-button-container'>
      <Button
            type="primary"
            shape="circle"
            icon={<LikeOutlined />}
            className="recommendation-card-thumbs-up"
            onClick={handleThumbsUpClick}
          />
        <Button
          type="primary"
          shape="circle"
          icon={<DislikeOutlined />}
          className="recommendation-card-thumbs-down"
          onClick={handleThumbsDownClick}
        />
      {!hideButtons && (
        <>
          <Button 
            type="primary"
            shape="rectangle"
            className="recommendation-card-assistant-button"
            onClick={handleDiscussClick}
          >
            Discuss
          </Button>
          <Button
            type="primary"
            shape="rectangle"
            className="recommendation-card-re-review-button"
            onClick={handleReReviewClick}
          >
            Re-Review
          </Button>
        </>
      )}    </div></div>
  );
};

export default RecommendationCard;

