import React, { useState } from 'react';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar, Divider } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Tune, GridView, Widgets } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';

const SectionOptions = ({ section }) => {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({
    fontsize: 'm',
    fontcolor: '#555555',
    accentcolor: '#1565c0',
    backgroundcolor: '#f5f5f5',
  });
  const [layout, setLayout] = useState({
    quantity: '2',
    variant: 'narrow',
  });

  return (
    <Box>
      <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3,
          cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
        onClick={() => setOpen(true)}
      >
        <Tune />
      </Avatar>
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
            {section && section.type} Section Settings
          </Typography>
          <StyleEditor style={style} setStyle={setStyle} />
          <Divider />
          <Box sx={{ py: 2 }}>
            {['narrow', 'wide'].map(item =>
              <Box
                sx={{ my: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setLayout({ ...layout, variant: item })}
                key={item}
              >
                <Avatar sx={{ bgcolor: layout.variant === item && 'primary.main' }}>
                  <GridView />
                </Avatar>
                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                  {item} Layout Variant
                </Typography>
              </Box>
            )}
            <ToggleButtonGroup
              sx={{ my: 1 }}
              value={layout.quantity}
              onChange={(e) => setLayout({ ...layout, quantity: e.target.value })}
              color='primary'
              size='small'
            >
              <ToggleButton value='1'>
                <Widgets /> One Button
              </ToggleButton>
              <ToggleButton value='2'>
                <Widgets /> Two Buttons
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Button
            onClick={() => {
              console.log(style, layout);
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Set
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default SectionOptions;
