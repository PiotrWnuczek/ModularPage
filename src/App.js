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
import AboutView from 'about/AboutView';
import PrivacyView from 'about/PrivacyView';
import RulesView from 'about/RulesView';

const ScrollTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);
  return (children);
};

const App = () => {
  const active = true;
  const host = /*'localhost:3000'*/'modularpage.com';
  const auth = useSelector(state => state.firebase.auth);
  const access = isLoaded(auth) && !isEmpty(auth);
  const pl = window.navigator.language.includes('pl');
  const theme = createTheme({
    typography: { fontFamily: 'Lato' },
    palette: { secondary: { light: grey[50], main: grey[100], dark: blueGrey[50] } },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {active && <ScrollTop>
          {window.location.host === host ? <Routes>
            <Route path='/en' element={<AboutView lang='en' />} />
            <Route path='/pl' element={<AboutView lang='pl' />} />
            <Route path='/en/privacy' element={<PrivacyView lang='en' />} />
            <Route path='/pl/privacy' element={<PrivacyView lang='pl' />} />
            <Route path='/en/rules' element={<RulesView lang='en' />} />
            <Route path='/pl/rules' element={<RulesView lang='pl' />} />
            <Route path='/signin' element={<SigninView />} />
            <Route path='/signup' element={<SignupView />} />
            <Route path='/account' element={access ? <AccountView /> : <Navigate to='/signin' />} />
            <Route path='/board' element={access ? <BoardView /> : <Navigate to='/signin' />} />
            <Route path='/create' element={access ? <CreateView /> : <Navigate to='/signin' />} />
            <Route path='/:id/admin' element={access ? <WebsiteView admin /> : <Navigate to='/signin' />} />
            <Route path='/:id/*' element={<WebsiteView />} />
            <Route path='/app' element={<Navigate to='/board' />} />
            <Route path='/*' element={pl ? <Navigate to='/pl' /> : <Navigate to='/en' />} />
          </Routes> : <Routes>
            <Route path='/*' element={<WebsiteView host={window.location.host} />} />
          </Routes>}
        </ScrollTop>}
        {!active && <ScrollTop>
          <Routes>
            <Route path='/en' element={<AboutView lang='en' />} />
            <Route path='/pl' element={<AboutView lang='pl' />} />
            <Route path='/en/privacy' element={<PrivacyView lang='en' />} />
            <Route path='/pl/privacy' element={<PrivacyView lang='pl' />} />
            <Route path='/en/rules' element={<RulesView lang='en' />} />
            <Route path='/pl/rules' element={<RulesView lang='pl' />} />
            <Route path='/*' element={pl ? <Navigate to='/pl' /> : <Navigate to='/en' />} />
          </Routes>
        </ScrollTop>}
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
