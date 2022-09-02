import React, { useState, useEffect } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Dialog, Button, Grid } from '@mui/material';
import { Typography, Avatar, Divider } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { GridView, Widgets, FormatAlignCenter } from '@mui/icons-material';
import { Tune, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';
import _ from 'lodash';

const SectionOptions = ({ section, wid }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const initial = {
    fontsize: theme.fontsize,
    fontcolor: theme.palette.fontcolor.main,
    accentcolor: theme.palette.accentcolor.main,
    backgroundcolor: theme.palette.backgroundcolor.main,
  };
  const [style, setStyle] = useState(initial);
  const reset = () => setStyle(initial);
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
    quantity: (sl && sl.quantity) || (section.type === 'iconbox' ? '3' : '2'),
    variant: (sl && sl.variant) || 'narrow',
    align: (sl && sl.align) || 'center',
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
            style={style} setStyle={setStyle} reset={reset}
            sid={section.style && section.id}
            wid={section.style && wid}
          />
          <Divider />
          <Box sx={{ py: 2 }}>
            <Grid container>
              <Grid item xs={12} md={8}>
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
              </Grid>
              <Grid
                sx={{ display: 'flex', alignItems: 'center' }}
                item xs={12} md={4}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    Text Align
                  </Typography>
                  <ToggleButtonGroup
                    sx={{ my: 1 }}
                    value={layout.align}
                    onChange={(e, v) => setLayout({ ...layout, align: v })}
                    color='primary'
                    size='small'
                    exclusive
                  >
                    <ToggleButton value='left'>
                      <FormatAlignLeft />
                    </ToggleButton>
                    <ToggleButton value='center'>
                      <FormatAlignCenter />
                    </ToggleButton>
                    <ToggleButton value='right'>
                      <FormatAlignRight />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <ToggleButtonGroup
                  sx={{ my: 1 }}
                  value={layout.quantity}
                  onChange={(e, v) => setLayout({ ...layout, quantity: v })}
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
              </Grid>
            </Grid>
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
      </Dialog>
    </Box>
  )
};

export default SectionOptions;
