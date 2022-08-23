import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Dialog, Button, Avatar } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { FormatSize, Settings } from '@mui/icons-material';
import { Colorize, ColorLens } from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';

const WebsiteOptions = ({ website }) => {
  const [titleSize, setTitleSize] = useState('large');
  const [textSize, setTextSize] = useState('large');
  const size = {
    title: [titleSize, setTitleSize],
    text: [textSize, setTextSize],
  };
  const [titleColor, setTitleColor] = useState('#444444');
  const [textColor, setTextColor] = useState('#555555');
  const [buttonColor, setButtonColor] = useState('#1565c0');
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');
  const color = {
    title: ['title', titleColor, setTitleColor],
    text: ['text', textColor, setTextColor],
    button: ['button', buttonColor, setButtonColor],
    background: ['background', backgroundColor, setBackgroundColor],
  };
  const [picker, setPicker] = useState(color.title);
  const [open, setOpen] = useState(false);

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
          <Box sx={{ py: 2 }}>
            <Grid container>
              <Grid item xs={12} md={7}>
                {['title', 'text', 'button', 'background'].map(item =>
                  <Box
                    sx={{ my: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setPicker(color[item])}
                    key={item}
                  >
                    <Avatar sx={{ bgcolor: color[item][1] }}>
                      {item === picker[0] ? <Colorize /> : <ColorLens />}
                    </Avatar>
                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                      {item} color picker
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={5}>
                <HexColorPicker color={picker[1]} onChange={picker[2]} />
              </Grid>
            </Grid>
            {['title', 'text'].map(item =>
              <Box sx={{ my: 1 }} key={item}>
                <ToggleButtonGroup
                  value={size[item][0]}
                  onChange={(e) => size[item][1](e.target.value)}
                  color='primary'
                  size='small'
                >
                  <ToggleButton value='large'>
                    <FormatSize /> Large {item}
                  </ToggleButton>
                  <ToggleButton value='small'>
                    <FormatSize /> Small {item}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}
          </Box>
          <Button
            sx={{ mt: 1 }}
            onClick={() => {
              console.log({
                titleSize, textSize,
                titleColor, textColor,
                buttonColor, backgroundColor,
              });
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
