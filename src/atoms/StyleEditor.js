import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Avatar } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Colorize, ColorLens, FormatSize } from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';

const StyleEditor = ({ style, setStyle, sid, wid }) => {
  const [picker, setPicker] = useState('fontcolor');
  const dispatch = useDispatch();

  return (
    <Box sx={{ py: 2 }}>
      <Grid container>
        <Grid item xs={12} md={8}>
          {['font', 'accent', 'background'].map(item =>
            <Box
              sx={{ my: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
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
          <ToggleButtonGroup
            sx={{ my: 1 }}
            value={style.fontsize}
            onChange={(e) => setStyle({ ...style, fontsize: e.target.value })}
            color='primary'
            size='small'
            exclusive
          >
            <ToggleButton value='m'>
              <FormatSize sx={{ mr: 1 }} />
              Medium Font Size
            </ToggleButton>
            <ToggleButton value='l'>
              <FormatSize sx={{ mr: 1 }} />
              Large Font Size
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} md={4} className='picker'>
          <HexColorPicker
            color={style[picker]}
            onChange={(color) => setStyle({ ...style, [picker]: color })}
          />
          <Button
            sx={{ mx: 0.5, mt: 2 }}
            onClick={() => {
              wid && sid && dispatch(updateSection({ values: { style: null }, sid, wid }));
              wid && !sid && dispatch(updateWebsite({ values: { style: null }, wid }));
            }}
            variant='outlined'
            size='small'
          >
            Reset To Default
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
};

export default StyleEditor;
