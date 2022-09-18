import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Colorize, ColorLens } from '@mui/icons-material';
import { TwitterPicker } from 'react-color';

const StyleEditor = ({ style, setStyle, reset, sid, wid }) => {
  const [picker, setPicker] = useState('fontcolor');
  const dispatch = useDispatch();

  return (
    <Grid sx={{ py: 2 }} container justifyContent='space-between'>
      <Grid item xs={12} md='auto'>
        {['font', 'accent', 'background'].map(item =>
          <Box
            sx={{ mb: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setPicker(item + 'color')}
            key={item}
          >
            <Avatar sx={{ bgcolor: style[item + 'color'] }}>
              {item + 'color' === picker ? <Colorize /> : <ColorLens />}
            </Avatar>
            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
              {item} color picker
            </Typography>
          </Box>
        )}
        <Button
          onClick={() => {
            wid && sid && dispatch(updateSection({ values: { style: null }, sid, wid }));
            wid && !sid && dispatch(updateWebsite({ values: { style: null }, wid }));
            reset();
          }}
          variant='outlined'
          size='small'
        >
          Reset To Default Colors
        </Button>
      </Grid>
      <Grid item xs={12} md='auto'>
        <Box sx={{ my: 0.5, mr: 0.5 }}>
          <TwitterPicker
            color={style[picker]}
            onChangeComplete={(color) => setStyle({ ...style, [picker]: color.hex })}
            colors={[
              '#777777', '#666666', '#555555', '#444444',
              '#1976d2', '#2e7d32', '#ed6c02', '#01579b',
              '#f5f5f5', '#e5e5e5', '#e3f2fd', '#fffde7',
            ]}
            triangle='hide'
            width='170px'
          />
        </Box>
      </Grid>
    </Grid>
  )
};

export default StyleEditor;
