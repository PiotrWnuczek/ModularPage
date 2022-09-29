import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import SigninView from 'organisms/SigninView';
import SignupView from 'organisms/SignupView';
import WebsiteView from 'organisms/WebsiteView';
import AccountView from 'organisms/AccountView';
import BoardView from 'organisms/BoardView';
import CreateView from 'organisms/CreateView';

const ScrollTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);
  return (children);
};

const App = () => {
  const host = 0 ? 'modularpage.com' : 'localhost:3000';
  const auth = useSelector(state => state.firebase.auth);
  const access = isLoaded(auth) && !isEmpty(auth);
  const theme = createTheme({
    typography: { fontFamily: 'Lato' },
    palette: { secondary: { light: grey[50], main: grey[100], dark: blueGrey[50] } },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollTop>
          {window.location.host === host ? <Routes>
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
            <Route path='/account' element={
              access ? <AccountView /> : <Navigate to='/signin' />
            } />
            <Route path='/board' element={
              access ? <BoardView /> : <Navigate to='/signin' />
            } />
            <Route path='/create' element={
              access ? <CreateView /> : <Navigate to='/signin' />
            } />
            <Route path='/admin/:id/:lang' element={
              access ? <WebsiteView admin /> : <Navigate to='/signin' />
            } />
            <Route path='/admin/:id/*' element={
              access ? <WebsiteView admin /> : <Navigate to='/signin' />
            } />
            <Route path='/:id/:lang' element={<WebsiteView />} />
            <Route path='/:id/*' element={<WebsiteView />} />
            <Route path='/app' element={<Navigate to='/board' />} />
            <Route path='/pl' element={<Navigate to='/try' />} />
            <Route path='/*' element={<Navigate to='/try' />} />
          </Routes> : <Routes>
            <Route path='/:lang' element={<WebsiteView host={window.location.host} />} />
            <Route path='/*' element={<WebsiteView host={window.location.host} />} />
          </Routes>}
        </ScrollTop>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
