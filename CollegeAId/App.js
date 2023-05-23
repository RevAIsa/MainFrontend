import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import LogIn from './components/login';
import Register from './components/register';
import EssayReviewShell from './components/EssayReviewShell';
import Essays from './components/Essays';
import EssayDashboard from './components/EssayDashboard';

export default function App() {
  return (
    <BrowserRouter>
    <View style={styles.container}>
      <Routes>
      <Route path ={"/"} element={<LogIn/>}/>
      <Route path ={"/register"} element={<Register/>}/>
      <Route path ={"/essayReview"} element={<EssayReviewShell/>}/>
      <Route path ={"/essays"} element={<Essays/>}/>
      <Route path ={"/essayDashboard"} element={<EssayDashboard/>}/>

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
