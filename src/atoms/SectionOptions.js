import React, { useState, useEffect } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar, Divider } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Tune, GridView, Widgets } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';
import _ from 'lodash';

const SectionOptions = ({ section, wid }) => {
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
  const sl = section.layout;
  const [layout, setLayout] = useState({
    quantity: (sl && sl.quantity) || '2',
    variant: (sl && sl.variant) || 'narrow',
  });
  const itemize = section.type === 'iconbox' || section.type === 'selling';

  return (
    <Box>
      <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3,
          cursor: 'pointer', bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' },
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
          <StyleEditor
            style={style} setStyle={setStyle}
            sid={section.style && section.id}
            wid={section.style && wid}
          />
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
              exclusive
            >
              <ToggleButton value={itemize ? '1' : '0'}>
                <Widgets sx={{ mr: 1 }} />
                {itemize ? 'One Block Element' : 'Zero Buttons'}
              </ToggleButton>
              <ToggleButton value={itemize ? '2' : '1'}>
                <Widgets sx={{ mr: 1 }} />
                {itemize ? 'Two Block Elements' : 'One Button'}
              </ToggleButton>
              <ToggleButton value={itemize ? '3' : '2'}>
                <Widgets sx={{ mr: 1 }} />
                {itemize ? 'Three Block Elements' : 'Two Buttons'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Button
            onClick={() => {
              (style.fontsize !== theme.fontsize ||
                style.fontcolor !== theme.palette.fontcolor.main ||
                style.accentcolor !== theme.palette.accentcolor.main ||
                style.backgroundcolor !== theme.palette.backgroundcolor.main) &&
                dispatch(updateSection({
                  values: { style }, sid: section.id, wid,
                }));
              !_.isEqual(layout, section.layout) &&
                dispatch(updateSection({
                  values: { layout }, sid: section.id, wid,
                }));
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
