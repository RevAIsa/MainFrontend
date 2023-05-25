import React, { useState } from 'react';
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import '../styles/RecommendationCard.css';

const RecommendationCard = ({ text, onCheckButtonClick, onReReviewClick, hideButtons }) => {
  const [cardColor, setCardColor] = useState("white");

  const handleCheckClick = () => {
    if (cardColor === "white") {
    setCardColor("#e0f7e0"); // Turn card green
  } else {
    setCardColor("white"); // Turn card white
  }
  onCheckButtonClick();
  };

  const handleReReviewClick = () => {
    onReReviewClick();
    setCardColor("#f8e6ff") // turn card a light lavender
  };

  return (
    <div className="recommendation-card" style={{ backgroundColor: cardColor }}>
      <div className="recommendation-card-content">
        {text}
      </div>
      <Button
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            className="recommendation-card-button"
            onClick={handleCheckClick}
          />
      {!hideButtons && (
        <>
          <Button
            type="primary"
            shape="rectangle"
            className="recommendation-card-re-review-button"
            onClick={handleReReviewClick}
          >
            Re-Review
          </Button>
        </>
      )}    </div>
  );
};

export default RecommendationCard;

