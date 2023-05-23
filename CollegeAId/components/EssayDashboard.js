import React, { useState } from 'react';
import EssayCard from './EssayCard';
import AddEssayForm from './AddEssayForm';
import NavBar from './NavBar';
import { Layout, Modal, Button } from 'antd';
import EssayIcon from '../assets/essay_icon_white.png';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// import style sheets
import '../styles/AddEssayForm.css';

// api paths
const UPLOAD_URL = '/essay/upload';

const EssayDashboard = () => {
  // state hooks for the essay dashboard
  const [isAddingEssay, setIsAddingEssay] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const navigate = useNavigate();

  const onLogOut = () => {
    navigate('/');
  };

  const handleEdit = () => {
    // Logic for editing the essay
  };

  const handleDelete = () => {
    // Logic for deleting the essay
  };

  const handleAddEssay = () => {
    // Logic for adding a new essay
    setIsAddingEssay(true);
    showModal();
  };

  const handleCloseForm = () => {
    // Logic for closing the form
    setIsAddingEssay(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSaveNewEssay = async () => {
    try {

      const essayData = {
        userId: "6466784bb64c104c502d677c",
        customFileName: document.getElementById('essay-title').value,
        prompt: document.getElementById('essay-prompt').value,
        essay: document.getElementById('essay-file').files[0],
      };

      console.log(essayData);
      setFormValues(formValues);
      console.log('No this is:', essayData);

      // make a call to the api ./essay/upload
      const response = await axios.post(UPLOAD_URL, essayData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)
      handleCancel();

    } catch (error) {
      console.log(`There was an error: ${error}`)
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ width: '100%' }}>
      <div className="essay-form" style={{ position: 'relative', padding: '0px' }}>
        <NavBar onLogOut={onLogOut} />

        <div
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '10px', // Adjust the gap between rows as needed
            margin: '0 20px',
          }}
        >
          {/* Add new essay button */}
          <div>
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '185px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#0d490d',
                color: '#fff',
                padding: '16px',
              }}
              onClick={handleAddEssay}
            >
              <img src={EssayIcon} alt="Add Essay Icon" style={{ width: '64px', height: '64px' }} />
              <div style={{ marginTop: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                Add New Essay
              </div>
            </button>
          </div>

          <Modal
            title="Upload New Essay"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="confirm"
                type="primary"
                style={{ backgroundColor: '#0d490d', borderColor: '#0d490d' }}
                onClick={handleSaveNewEssay}
              >
                Confirm
              </Button>,
            ]}
          >
            {isAddingEssay && <AddEssayForm onCloseForm={handleCloseForm} />}
          </Modal>

          {/* Render remaining essay cards */}
          {[...Array(9)].map((_, index) => (
            <div key={index}>
              <EssayCard
                id={index + 1}
                title={`Essay ${index + 1}`}
                lastUpdated="2023-05-22"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EssayDashboard;

