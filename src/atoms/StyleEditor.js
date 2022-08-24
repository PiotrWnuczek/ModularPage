import React, { useState } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Colorize, ColorLens, FormatSize } from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';

const StyleEditor = ({ style, setStyle }) => {
  const [picker, setPicker] = useState('fontcolor');

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
        </Grid>
        <Grid item xs={12} md={4} className='picker'>
          <HexColorPicker
            color={style[picker]}
            onChange={(color) => setStyle({ ...style, [picker]: color })}
          />
        </Grid>
      </Grid>
      <ToggleButtonGroup
        sx={{ my: 1 }}
        value={style.fontsize}
        onChange={(e) => setStyle({ ...style, fontsize: e.target.value })}
        color='primary'
        size='small'
      >
        <ToggleButton value='m'>
          <FormatSize /> Medium Font Size
        </ToggleButton>
        <ToggleButton value='l'>
          <FormatSize /> Large Font Size
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
};

export default StyleEditor;
