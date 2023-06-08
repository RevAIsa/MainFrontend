import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Progress } from 'antd';
import EssayReviewer from "./EssayReviewer";
import { NavBar } from './NavBar';
const { Content, Footer } = Layout;
import axios from '../api/axios';
import { useSignOut } from 'react-auth-kit';
import useStore from "../Store"
import '../styles/EssayReviewShell.css';
// import { purple, green, gray } from '@ant-design/colors';

// api paths
const UPDATE_ESSAY_URL = "/essay/"
const green = "#52a752";
const purple = "#e296ff";
const white = "#ffffff";

const EssayReviewShell = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();

    // set the state variables
    const location = useLocation();
    const { essayId } = location.state;
    const [essay, setEssay] = useState(' ');
    const [numberIssuesAddressed, setNumberIssuesAddressed] = useState(0);
    const [issuesAddressededDictionary, updateIssuesAddressedDictionary] = useState({
      grammar: ["unaddressed", "unaddressed", "unaddressed"],
      hook: ["unaddressed", "unaddressed", "unaddressed"],
      themes: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
      voice: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
      language: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
      structure: ["unaddressed", "unaddressed", "unaddressed", "unaddressed"],
      relevance: ["unaddressed", "unaddressed"],
    });
    const [progressBarColorArray, updateProgressBarColorArray] = useState([])

    // zustand states
    const userId = useStore(state => state.userId);

      // navigate back to the essay dashboard when the back button is clicked
      const onBack = () => {
        navigate('/essayDashboard')
      };

      // navigate to the login screen when the log out button is clicked
      const onLogOut = () => {

        signOut();
        navigate('/')
      };

      useEffect(() => {
    
        const issuesAddressedArray = [];
        let numberIssues = 0;
        Object.values(issuesAddressededDictionary).forEach((entry) => {
          entry.forEach((value) => {
            if (value === "accepted") {
              issuesAddressedArray.push(green);
              numberIssues += 1;
            } else if (value === "rejected") {
              issuesAddressedArray.push(purple);
              numberIssues += 1;
            }
          });
        });

        setNumberIssuesAddressed(numberIssues);
        updateProgressBarColorArray(issuesAddressedArray);

      }, [issuesAddressededDictionary]);
      
      const handleSavePress = async () => {
        try {

            const response = await axios.patch(UPDATE_ESSAY_URL, {
              essayId: essayId, 
              userId: userId,
              newEssayString: essay
            });

            console.log(response)

        } catch (error) {
          console.log(error)
        }
      };

      const updateEssayInParent = (updatedEssay) => {
        setEssay(updatedEssay); // Update the essay state in the parent component (EssayReviewShell)
      };

      // const handleUpdateIssuesAddressedCount = (value) => {
      //   setNumberIssuesAddressed(value);
      // };

      // render the shell of the essay review page with th essay reviewer component inside it 
      return <Layout  style={{width: '100%',}}>
        <NavBar onBack = {onBack} onLogOut = {onLogOut} onSave = {handleSavePress} showSaveButton = { true }/>
          <Content
            style={{
              padding: '0 50px',
            }}
          >
            <div className="site-layout-content">
              <div className="essay-reviewer">
               <EssayReviewer essayId={essayId} 
                              updateEssayInParent={updateEssayInParent} 
                              numberIssuesAddressed={numberIssuesAddressed} 
                              setNumberIssuesAddressed={setNumberIssuesAddressed}
                              issuesAddressededDictionary={issuesAddressededDictionary}
                              updateIssuesAddressedDictionary={updateIssuesAddressedDictionary}/>
              </div>
                <Progress percent={numberIssuesAddressed/24*100} steps={24} strokeColor={progressBarColorArray} />
            </div>
          </Content>
          <Footer style={{textAlign: 'center',}}>
            CollegeAId ©2023 Democratizing college admissions.
          </Footer>
        </Layout>
}

export default EssayReviewShell;