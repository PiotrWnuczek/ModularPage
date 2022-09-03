import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Avatar } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Colorize, ColorLens, FormatSize } from '@mui/icons-material';
import { TwitterPicker } from 'react-color';

const StyleEditor = ({ style, setStyle, reset, sid, wid }) => {
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
            onChange={(e, v) => v !== null && setStyle({ ...style, fontsize: v })}
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
        <Grid item xs={12} md={4}>
          <TwitterPicker
            color={style[picker]}
            onChangeComplete={(color) => setStyle({ ...style, [picker]: color.hex })}
            colors={[
              '#777777', '#666666', '#555555', '#444444', '#1976d2', '#2e7d32',
              '#ed6c02', '#01579b', '#f5f5f5', '#e5e5e5', '#e3f2fd', '#fffde7',
            ]}
            triangle='hide'
            width='170px'
          />
          <Button
            sx={{ mx: 2.5, my: 1 }}
            onClick={() => {
              wid && sid && dispatch(updateSection({ values: { style: null }, sid, wid }));
              wid && !sid && dispatch(updateWebsite({ values: { style: null }, wid }));
              reset();
            }}
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
