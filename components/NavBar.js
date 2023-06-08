import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'antd';
import { Layout } from 'antd';
import { LogoutOutlined, RollbackOutlined, SaveFilled } from '@ant-design/icons';

// import assets
import Logo from "../assets/collegeaid_logo.png"

const { Header } = Layout;

export function NavBar(props) {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: 'white', // Set the background color to white
        boxShadow: '0 2px 8px #f0f1f2', // Optional: Add a box shadow
      }}
    >
      <img src={Logo} alt="Logo" style={styles.logo} />
      <div>
        {props.onBack && (
          <Button onClick={props.onBack} htmlType="back">
            <Text>My Essays </Text>
            <RollbackOutlined />
          </Button>
        )}
        <Button onClick={props.onLogOut} htmlType="logout">
          <Text>Log Out </Text>
          <LogoutOutlined />
        </Button>
        {props.showSaveButton && (
          <Button onClick={props.onSave} htmlType="save" style={{ backgroundColor: '#0d490d', borderColor: '#0d490d', color: 'white' }}>
            <SaveFilled />
            <Text style={{ color: 'white' }}> Save Essay </Text>
          </Button>
        )}
      </div>
    </Header>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    color: 'black',
  },
  logo: {
    width: '140px', // Adjust the width of the logo as needed
    height: 'auto', // Maintain the aspect ratio of the logo
  },
});

export default NavBar;
