import React from 'react';
import { connect } from 'react-redux';
import { signoutUser } from 'store/usersActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Avatar, List, ListItem } from '@mui/material';
import { ListItemText, ListItemAvatar } from '@mui/material';
import { Add, Dashboard, Logout, Preview } from '@mui/icons-material';

const SideBar = ({ signoutUser, auth, main, site, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer {...props}>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase' }}
          selected={location.pathname === '/admin/' + auth.uid}
          onClick={() => navigate('/admin/' + auth.uid)}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Dashboard />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: 'none', md: 'block' } }}
            secondary='Board'
          />
        </ListItem>
        {main && <ListItem
          sx={{ textTransform: 'uppercase' }}
          selected={location.pathname === '/create'}
          onClick={() => navigate('/create')}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Add />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: 'none', md: 'block' } }}
            secondary='Create'
          />
        </ListItem>}
        {site && <ListItem
          sx={{ textTransform: 'uppercase' }}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Preview />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: 'none', md: 'block' } }}
            secondary='Preview'
          />
        </ListItem>}
      </List>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
          onClick={signoutUser}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Logout />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: 'none', md: 'block' } }}
            secondary='Sign Out'
          />
        </ListItem>
      </List>
    </Drawer>
  )
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

const mapDispatchToPorps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(mapStateToProps, mapDispatchToPorps)
  (SideBar);
