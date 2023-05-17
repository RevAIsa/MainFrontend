import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import LogIn from './components/login';
import Register from './components/register';
import Home from './components/home';


export default function App() {
  return (
    <BrowserRouter>
    <View style={styles.container}>
      <Routes>
      <Route path ={"/"} element={<LogIn/>}/>
      <Route path ={"/register"} element={<Register/>}/>
      <Route path ={"/home"} element={<Home/>}/>

      </Routes>
      
     

      <StatusBar style="auto" />

    </View>
    </BrowserRouter>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
