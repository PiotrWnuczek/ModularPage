import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import SigninView from 'pages/SigninView';
import SignupView from 'pages/SignupView';
import WebsiteView from 'pages/WebsiteView';
import BoardView from 'pages/BoardView';
import CreateView from 'pages/CreateView';
import AboutView from 'about/AboutView';
import PrivacyView from 'about/PrivacyView';
import RulesView from 'about/RulesView';

const ScrollTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);
  return (children);
};

const App = () => {
  const auth = useSelector(state => state.firebase.auth);
  const access = isLoaded(auth) && !isEmpty(auth);
  const theme = createTheme({
    typography: { fontFamily: 'Lato' },
    palette: {
      secondary: { light: grey[50], main: grey[100], dark: blueGrey[50] },
      info: { light: grey[600], main: grey[700], dark: grey[800] },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollTop>
          <Routes>
            <Route path='/*' element={<AboutView />} />
            <Route path='/privacy' element={<PrivacyView />} />
            <Route path='/rules' element={<RulesView />} />
            <Route path='/signin' element={0 ? <SigninView /> : <Navigate to='/' />} />
            <Route path='/signup' element={0 ? <SignupView /> : <Navigate to='/' />} />
            <Route path='/admin' element={access ? <BoardView /> : <Navigate to='/signin' />} />
            <Route path='/create' element={access ? <CreateView /> : <Navigate to='/signin' />} />
            <Route path='/:id/*' element={access ? <WebsiteView /> : <Navigate to='/signin' />} />
            <Route path='/:id/admin' element={access ? <WebsiteView admin /> : <Navigate to='/signin' />} />
          </Routes>
        </ScrollTop>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
