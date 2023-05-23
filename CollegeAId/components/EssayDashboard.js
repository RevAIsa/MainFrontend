import React, { useState, useEffect } from 'react';
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
const UPLOAD_ESSAY_URL = '/essay/upload';
const GET_ALL_ESSAYS_URL = '/essay/getAll/6466784bb64c104c502d677c'

const EssayDashboard = () => {
  // state hooks for the essay dashboard
  const [isAddingEssay, setIsAddingEssay] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [essays, setEssays] = useState([]);

  const navigate = useNavigate();

  const onLogOut = () => {
    navigate('/');
  };

  const handleEditClick = (essayId) => {
    // Logic for editing the essay
    console.log(essayId)
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

  const getAllEssays = async () => {
    try {
        // get the current user's essay array from the database
        const response = await axios.get(GET_ALL_ESSAYS_URL);
        const fetchedEssays = response.data.essays;

        // convert all of the dates into the proper string format
        fetchedEssays.forEach((essay) => {
            const utcString = essay.updatedAt;
            const date = new Date(utcString);
            const estDateString = date.toLocaleString('en-US', {
                timeZone: 'America/New_York',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              });
            essay.updatedAt = estDateString;
        });
        
        // set the essays state variable equal to the fetched essays 
        setEssays(fetchedEssays);
        console.log(fetchedEssays);


    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    getAllEssays();
  }, []); // Call getAllEssays only once when the component mounts

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
          const response = await axios.post(UPLOAD_ESSAY_URL, essayData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });    

          getAllEssays();
      
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

          {/* Render remaining essay cards by mapping each element in the essays array to one card*/}
          {/* Store the necessary variables so that the edit and delete functions can be implemented properly */}
          {essays.map((essay) => (
            <div key={essay._id}>
            <EssayCard
                id={essay._id}
                title={essay.customFileName}
                lastUpdated={essay.updatedAt}
                onEditClick={() => handleEditClick(essay._id)}
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

