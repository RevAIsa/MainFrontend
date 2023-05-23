import React, { useState } from 'react';
import { Card, Button, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// defines an EssayCard component which is used to display a users different essays on their dashboard
// essay cards have a title lable, a lastUpdated label, an edit button, and a delete button
const EssayCard = ({ id, title, lastUpdated, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
  
    const handleDeleteClick = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const handleConfirmDelete = () => {
    //   onDelete();
        navigate(`/`);
      setIsModalVisible(false);
    };
  
    const handleEditClick = () => {
      navigate(`/`);
    };
  
    return (
      <Card>
        <h2>{title}</h2>
        <p>Last Updated: {lastUpdated}</p>
        <Space>
          <Button icon={<EditOutlined />} onClick={handleEditClick}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={handleDeleteClick} danger>
            Delete
          </Button>
        </Space>
  
        <Modal
          title={`Delete Essay`}
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleConfirmDelete}
          okText="Delete"
          cancelText="Cancel"
          centered
        >
          <p>Are you sure you want to delete your essay from your CollegeAId profile?</p>
        </Modal>
      </Card>
    );
  };
  
  export default EssayCard;
