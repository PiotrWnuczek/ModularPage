import React from 'react';
import { signoutUser } from 'redux/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Avatar, List, ListItem } from '@mui/material';
import { ListItemText, ListItemAvatar } from '@mui/material';
import { Add, Dashboard, Logout, Person } from '@mui/icons-material';

const SideMenu = ({ main, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer {...props}>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase' }}
          selected={location.pathname === '/account'}
          onClick={() => navigate('/account')}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: 'none', md: 'block' } }}
            secondary='Account'
          />
        </ListItem>
        <ListItem
          sx={{ textTransform: 'uppercase' }}
          selected={location.pathname === '/board'}
          onClick={() => navigate('/board')}
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
      </List>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
          onClick={() => dispatch(signoutUser())}
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

export default SideMenu;
