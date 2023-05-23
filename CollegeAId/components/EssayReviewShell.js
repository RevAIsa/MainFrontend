import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import useToken from '../contexts/useToken';
import EssayReviewer from "./EssayReviewer";
import { NavBar } from './NavBar';
const { Content, Footer } = Layout;



const EssayReviewShell = () => {
    const {token, setToken} = useToken();
    console.log(token)
    const navigate = useNavigate();

    // set the state variables
    const location = useLocation();
    const { essayId } = location.state;
    console.log("Here is the essayId being passed to the EssayReviewShell");
    console.log(essayId);

      // navigate back to the essay dashboard when the back button is clicked
      const onBack = () => {
        navigate('/essayDashboard')
      };

      // navigate to the login screen when the log out button is clicked
      const onLogOut = () => {
        navigate('/')
      };

      // render the shell of the essay review page with th essay reviewer component inside it 
      return <Layout  style={{width: '100%',}}>
          <NavBar onBack = {onBack} onLogOut = {onLogOut}/>

            <Content

              style={{
                padding: '0 50px',
              }}
            >

              <div
                className="site-layout-content"
                style={{
              
                }}
              >
              
              <EssayReviewer essayId={essayId} />

              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              CollegeAId ©2023 Democratizing college admissions.
            </Footer>
          </Layout>
}

export default EssayReviewShell;