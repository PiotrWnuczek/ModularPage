import React, { useState } from 'react';
import { createSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography } from '@mui/material';
import { Avatar, List, ListItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import { content, graphic, iconbox, mailing, selling } from 'stock/sections';

const SectionCreate = ({ wid, index, start }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sections = [
    { name: 'Content Section', template: content },
    { name: 'Graphic Section', template: graphic },
    { name: 'Iconbox Section', template: iconbox },
    { name: 'Mailing Section', template: mailing },
    { name: 'Selling Section', template: selling },
  ];

  return (
    <Box>
      <Avatar
        sx={{
          width: start ? 40 : 30, height: start ? 40 : 30,
          mx: 0.3, cursor: 'pointer', bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' },
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
        <Typography
          sx={{ p: 2, pb: 1 }}
          variant='h5'
        >
          Create New Section
        </Typography>
        <List sx={{ mb: 1 }} dense>
          {sections.map(section => <ListItem
            onClick={() => {
              dispatch(createSection({
                values: section.template, index, wid,
              }));
              setOpen(false);
            }}
            key={section.name} button
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Add />
            </Avatar>
            <Typography sx={{ ml: 1 }}>
              Add {section.name}
            </Typography>
          </ListItem>)}
        </List>
      </Dialog>
    </Box>
  )
};

export default SectionCreate;
