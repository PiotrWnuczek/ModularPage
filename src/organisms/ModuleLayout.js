import React, { useState } from 'react';
import { createSection } from 'store/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, DialogTitle } from '@mui/material';
import { Avatar, List, ListItem } from '@mui/material';
import { ListItemAvatar, ListItemText } from '@mui/material';
import { Add, Tune } from '@mui/icons-material';

const ModuleLayout = ({ children, admin, website }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const random = Math.random().toString(16).slice(2);
  const types = ['content', 'graphic', 'icon', 'mailing', 'selling'];

  return (
    <Box sx={{ py: admin ? 0 : 6, px: { xs: 6, md: 24 } }}>
      {admin && <Box sx={{
        pt: 0.6, pb: 0.4, display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'info.main',
            '&:hover': { bgcolor: 'info.dark' },
          }}
        >
          <Tune />
        </Avatar>
      </Box>}
      {children}
      {admin && <Box>
        <Box sx={{
          pb: 0.6, pt: 0.4, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Avatar
            sx={{
              cursor: 'pointer', bgcolor: 'info.main',
              '&:hover': { bgcolor: 'info.dark' },
            }}
            onClick={() => setOpen(true)}
          >
            <Add />
          </Avatar>
        </Box>
        <Dialog
          sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
        >
          <DialogTitle>Add Section</DialogTitle>
          <List dense>
            {types.map(type => <ListItem
              onClick={() => {
                dispatch(createSection({
                  values: { id: random, type },
                  wid: website.name,
                }));
                setOpen(false);
              }}
              key={type}
              button
            >
              <ListItemAvatar>
                <Avatar>
                  <Add />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={type} />
            </ListItem>)}
          </List>
        </Dialog>
      </Box>}
    </Box>
  )
};

export default ModuleLayout;
