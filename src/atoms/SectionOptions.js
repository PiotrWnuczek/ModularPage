import React, { useState, useEffect } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Grid, Dialog } from '@mui/material';
import { Avatar, Divider, Alert, AlertTitle } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { GridView, Widgets, FormatAlignCenter } from '@mui/icons-material';
import { Tune, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

const about = `
* Set basic styles and layout options for this section
* Select colors or choose your own in [canva.com/colors](https://canva.com/colors/)
`;

const SectionOptions = ({ section, wid, hover }) => {
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
    position: (sl && sl.position) || 'right',
  });
  const itemize = section.type === 'iconbox' || section.type === 'selling';
  const form = section.type === 'mailing';

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
        {hover ? <Tooltip title='open section options' arrow>
          <Tune />
        </Tooltip> : <Tune />}
      </Avatar>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        scroll='body'
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ textTransform: 'capitalize' }}
            variant='h5'
          >
            {section && section.type} Section Settings
          </Typography>
          <Alert
            sx={{ my: 1, py: 0, px: 1 }}
            severity='info'
          >
            <AlertTitle>
              Set section options
            </AlertTitle>
            <ReactMarkdown
              children={about}
              linkTarget='_blank'
              className='about'
            />
          </Alert>
          <StyleEditor
            style={style} setStyle={setStyle} reset={reset}
            sid={section.style && section.id}
            wid={section.style && wid}
          />
          <Divider />
          <Box sx={{ py: 2 }}>
            <Grid container>
              <Grid item xs={12} md={section.type === 'graphic' ? 7 : 8}>
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
                      {section.type !== 'graphic' ? item :
                        (item === 'wide' ? 'full size image' : 'standard image')
                      } Layout Variant
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid
                sx={{ display: 'flex', alignItems: 'center' }}
                item xs={12} md={section.type === 'graphic' ? 5 : 4}
              >
                {section.type === 'graphic' && <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    Image Position
                  </Typography>
                  <ToggleButtonGroup
                    sx={{ my: 1 }}
                    value={layout.position}
                    onChange={(e, v) => setLayout({ ...layout, position: v })}
                    color='primary'
                    size='small'
                    exclusive
                  >
                    <ToggleButton value='left'>
                      <KeyboardArrowLeft />
                    </ToggleButton>
                    <ToggleButton value='right'>
                      <KeyboardArrowRight />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>}
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
                  onChange={(e, v) => v !== null && setLayout({ ...layout, quantity: v })}
                  color='primary'
                  size='small'
                  exclusive
                >
                  {!form && <ToggleButton value={itemize ? '1' : '0'}>
                    <Widgets sx={{ mr: 1 }} />
                    {itemize ? 'One Block' : 'Zero Buttons'}
                  </ToggleButton>}
                  <ToggleButton value={itemize ? '2' : '1'}>
                    <Widgets sx={{ mr: 1 }} />
                    {form ? 'Without Disclaimer' : itemize ? 'Two Blocks' : 'One Button'}
                  </ToggleButton>
                  <ToggleButton value={itemize ? '3' : '2'}>
                    <Widgets sx={{ mr: 1 }} />
                    {form ? 'With Disclaimer' : itemize ? 'Three Blocks' : 'Two Buttons'}
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
                style.backgroundcolor !== theme.palette.backgroundcolor.main ||
                !_.isEqual(layout, section.layout)) &&
                dispatch(updateSection({
                  values: { style, layout }, sid: section.id, wid,
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
