import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import LogIn from './components/login';
import Register from './components/Register';
import EssayReviewShell from './components/EssayReviewShell';
import Essays from './components/Essays';
import EssayDashboard from './components/EssayDashboard';
import { AuthProvider, RequireAuth } from 'react-auth-kit';

export default function App() {
  return (
    <AuthProvider
      authType={'cookie'}
      authName={'auth_token'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}

    >
      <BrowserRouter>
      <View style={styles.container}>

        {/* Each route is given seperation to allow for visual consistency and protected routes
            To set a new route: impot the component, set path and name. See essayDashboard for protected route example. */}
        <Routes>

          {/* Unprotected routes. */}
          <Route path ={"/"} element={<LogIn/>}/>
          <Route path ={"/register"} element={<Register/>}/>
      
          <Route path ={"/essays"} element={<Essays/>}/>

          {/* The dashboard that holds all of the users essays. Protected. */}
          <Route path ={"/essayDashboard"} element={<RequireAuth loginPath='/'>
              <EssayDashboard/>
          </RequireAuth>}/>

          {/* The AI interface that a user can use to improve their essays. Protected. */}
          <Route path ={"/essayReview"} element={<RequireAuth loginPath='/'>
              <EssayReviewShell/>
          </RequireAuth>}/>

        </Routes>
        
      

        <StatusBar style="auto" />

      </View>
      </BrowserRouter>
    </AuthProvider>
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
