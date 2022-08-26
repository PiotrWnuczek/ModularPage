import React, { useState, useEffect } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Avatar } from '@mui/material';
import { Dialog, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';

const WebsiteOptions = ({ website }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({
    fontsize: theme.fontsize,
    fontcolor: theme.palette.fontcolor.main,
    accentcolor: theme.palette.accentcolor.main,
    backgroundcolor: theme.palette.backgroundcolor.main,
  });
  useEffect(() => {
    setStyle({
      fontsize: theme.fontsize,
      fontcolor: theme.palette.fontcolor.main,
      accentcolor: theme.palette.accentcolor.main,
      backgroundcolor: theme.palette.backgroundcolor.main,
    })
  }, [theme]);

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
          <StyleEditor
            style={style} setStyle={setStyle}
            wid={website.style && website.name}
          />
          <Button
            onClick={() => {
              (style.fontsize !== theme.fontsize ||
                style.fontcolor !== theme.palette.fontcolor.main ||
                style.accentcolor !== theme.palette.accentcolor.main ||
                style.backgroundcolor !== theme.palette.backgroundcolor.main) &&
                dispatch(updateWebsite({
                  values: { style }, wid: website.name,
                }));
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Confirm Settings
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
        </Box>
      </Dialog >
    </Box >
  )
};

export default WebsiteOptions;
