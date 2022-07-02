import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import AppProvider from 'assets/useApp';
import SigninView from 'pages/SigninView';
import SignupView from 'pages/SignupView';
import WebsiteView from 'pages/WebsiteView';
import PanelView from 'pages/PanelView';
import CreateView from 'pages/CreateView';
import AboutView from 'about/AboutView';

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
    <AppProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route exact path='/' element={<Navigate to='/about' />} />
            <Route path='/about' element={<AboutView />} />
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
            <Route path='/:id/*' element={<WebsiteView />} />
            <Route
              path='/:id/admin'
              element={access ? <WebsiteView admin /> : <Navigate to='/signin' />}
            />
            <Route
              path='/admin/:id'
              element={access ? <PanelView /> : <Navigate to='/signin' />}
            />
            <Route
              path='/create'
              element={access ? <CreateView /> : <Navigate to='/signin' />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  )
};

export default App;
