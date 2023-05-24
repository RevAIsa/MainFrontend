import React, { useState, useEffect } from 'react';
import EssayCard from './EssayCard';
import AddEssayForm from './AddEssayForm';
import NavBar from './NavBar';
import { Layout, Modal, Button } from 'antd';
import EssayIcon from '../assets/essay_icon_white.png';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useSignOut } from 'react-auth-kit';
import useStore from "../Store"

// import style sheets
import '../styles/AddEssayForm.css';

// api paths
const UPLOAD_ESSAY_STRING_URL = '/essay/uploadEssayString';
const GET_ALL_ESSAYS_URL = '/essay/getAll/:userId'
const DELETE_ESSAY_URL = '/essay/'

const EssayDashboard = () => {
  // state hooks for the essay dashboard
  const [isAddingEssay, setIsAddingEssay] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [essays, setEssays] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteEssayId, setDeleteEssayId] = useState('');

  // zustand states
  const userId = useStore(state => state.userId);

  const navigate = useNavigate();
  const signOut = useSignOut();

  const onLogOut = () => {
    signOut();
    navigate('/');
  };

  // navigate to the essay reviewer
  // pass the essayId as a state variable to be used on that screen
  const handleEditClick = (essayId) => {
    console.log(essayId);
    navigate('/essayReview', { state: {essayId} });
  };

  // delete the essay and then reload the essay list
  const handleDeleteClick = async (essayId) => {
    console.log("Entered handle delete clicked")

    try {
        const response = await axios.delete(DELETE_ESSAY_URL, {
          data: {
            essayId: essayId,
            userId: "6466784bb64c104c502d677c",
          },
        });

        getAllEssays();

    } catch (error) {
        console.log(error)
    }
  }
 
  // functions for showing the delete modal confirmation message
  const showDeleteModal = (essayId) => {
    setDeleteEssayId(essayId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await handleDeleteClick(deleteEssayId);
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
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

      const USERS_GET_ALL_ESSAYS_URL = GET_ALL_ESSAYS_URL.replace(':userId', userId);
      console.log(USERS_GET_ALL_ESSAYS_URL)
      console.log(userId);

        // get the current user's essay array from the database
        const response = await axios.get(USERS_GET_ALL_ESSAYS_URL);
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
            userId: userId,
            customFileName: document.getElementById('essay-title').value,
            prompt: document.getElementById('essay-prompt').value,
            essayString: document.getElementById('essay-string').value,
          };
        
          console.log(essayData);
          setFormValues(essayData);
      
          // make a call to the api ./essay/upload
          const response = await axios.post(UPLOAD_ESSAY_STRING_URL, essayData);   

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
                onDeleteClick={() => showDeleteModal(essay._id)}
            />
            </div>
        ))}

            {/* Delete confirmation modal */}
            <Modal
                title="Confirm Delete"
                open={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
                style={{ top: '35%' }}
            >
                <p>Are you sure you want to delete this essay?</p>
            </Modal>
          
        </div>
      </div>
    </Layout>
  );
};

export default EssayDashboard;

