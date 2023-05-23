import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  BrowserRouter, Route,
  Routes, //replaces "Switch" used till v5 
} from "react-router-dom";
import LogIn from './components/login';
import Register from './components/register';
import Home from './components/home';
import Essays from './components/Essays';
import { store } from './components/reduxStore';
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <View style={styles.container}>
          <Routes>
            <Route path={"/"} element={<LogIn />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/essays"} element={<Essays />} />
          </Routes>
          <StatusBar style="auto" />
        </View>

      </BrowserRouter>
    </Provider>
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


export default App