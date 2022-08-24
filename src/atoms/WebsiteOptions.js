import React, { useState } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Button, Avatar } from '@mui/material';
import { Dialog, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';
import _ from 'lodash';

const WebsiteOptions = ({ website }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({
    accentcolor: (website.style && website.style.accentcolor) || '#1565c0',
    fontsize: (website.style && website.style.fontsize) || 'm',
    fontcolor: (website.style && website.style.fontcolor) || '#555555',
    backgroundcolor: (website.style && website.style.backgroundcolor) || '#f5f5f5',
  });

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 44, right: 44, zIndex: 1200 }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => setOpen(true)}
        >
          <Settings />
        </Avatar>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ textTransform: 'capitalize' }}
            variant='h5'
          >
            {website && website.name} Website Settings
          </Typography>
          <StyleEditor style={style} setStyle={setStyle} />
          <Button
            onClick={() => {
              !_.isEqual(style, website.style) &&
                dispatch(updateWebsite({
                  values: { style }, wid: website.name,
                }));
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Set
          </Button>
        </Box>
      </Dialog >
    </Box >
  )
};

export default WebsiteOptions;
