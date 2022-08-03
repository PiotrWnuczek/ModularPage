import React, { useState } from 'react';
import { createSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, DialogTitle } from '@mui/material';
import { Avatar, List, ListItem } from '@mui/material';
import { ListItemAvatar, ListItemText } from '@mui/material';
import { Add } from '@mui/icons-material';

const SectionCreate = ({ wid }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const random = Math.random().toString(16).slice(2);

  const sections = [
    { name: 'Content Section', type: 'content' },
    { name: 'Graphic Section', type: 'graphic' },
    { name: 'Iconbox Section', type: 'Iconbox' },
    { name: 'Mailing Section', type: 'mailing' },
    { name: 'Selling Section', type: 'selling' },
  ];

  return (
    <Box>
      <Avatar
        sx={{
          mx: 0.3, cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Avatar>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>
          Create Section
        </DialogTitle>
        <List dense>
          {sections.map(section => <ListItem
            onClick={() => {
              dispatch(createSection({
                values: { id: random, type: section.type },
                wid,
              }));
              setOpen(false);
            }}
            key={section.type}
            button
          >
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={section.name} />
          </ListItem>)}
        </List>
      </Dialog>
    </Box>
  )
};

export default SectionCreate;
