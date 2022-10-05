import React, { useState, useEffect } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Grid, Dialog } from '@mui/material';
import { Avatar, Divider, Alert, AlertTitle } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { Widgets, Tune, TextDecrease, TextIncrease } from '@mui/icons-material';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import { CheckBoxOutlined, CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import StyleEditor from 'atoms/StyleEditor';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

const about = `
* Set basic styles and layout options for this section
* Select colors or choose your own in [canva.com/colors](https://canva.com/colors/)
`;

const SectionOptions = ({ section, wid, hover }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const initial = {
    fontcolor: theme.palette.fontcolor.main,
    accentcolor: theme.palette.accentcolor.main,
    backgroundcolor: theme.palette.backgroundcolor.main,
  };
  const [style, setStyle] = useState(initial);
  const reset = () => setStyle(initial);
  useEffect(() => {
    setStyle({
      fontcolor: theme.palette.fontcolor.main,
      accentcolor: theme.palette.accentcolor.main,
      backgroundcolor: theme.palette.backgroundcolor.main,
    })
  }, [theme]);
  const sl = section.layout;
  const [layout, setLayout] = useState({
    fontsize: (sl && sl.fontsize) || 'm',
    textalign: (sl && sl.textalign) || 'center',
    variant: (sl && sl.variant) || 'narrow',
    quantity: (sl && sl.quantity) || (section.type === 'iconbox' ? '3' : '2'),
  });
  const buttons = section.type === 'graphic' || section.type === 'content';
  const cards = section.type === 'cardbox' || section.type === 'selling';
  const blocks = section.type === 'iconbox';
  const form = section.type === 'mailing';

  return (
    <Box>
      <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3, cursor: 'pointer',
          bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' },
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
            sx={{ mt: 1, py: 0, px: 1 }}
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
          <Grid sx={{ py: 2 }} container spacing={2}>
            {section.type !== 'graphic' && ['narrow', 'wide'].map(item =>
              <Grid item xs={12} md='auto' key={item}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setLayout({ ...layout, variant: item })}
                >
                  <Avatar sx={{ bgcolor: layout.variant === item && 'primary.main' }}>
                    {layout.variant === item && <CheckBoxOutlined />}
                    {layout.variant !== item && <CheckBoxOutlineBlankOutlined />}
                  </Avatar>
                  <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                    {item} Layout Variant
                  </Typography>
                </Box>
              </Grid>
            )}
            {section.type === 'graphic' && ['narrow', 'wide', 'full'].map(item =>
              <Grid item xs={12} md='auto' key={item}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setLayout({ ...layout, variant: item })}
                >
                  <Avatar sx={{ bgcolor: layout.variant === item && 'primary.main' }}>
                    {layout.variant === item && <CheckBoxOutlined />}
                    {layout.variant !== item && <CheckBoxOutlineBlankOutlined />}
                  </Avatar>
                  <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                    {item} image
                  </Typography>
                </Box>
              </Grid>
            )}
            {['fontsize', 'textalign'].map(item =>
              <Grid item xs={12} md='auto' key={item}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>
                    {item === 'fontsize' && 'Font Size'}
                    {item === 'textalign' && 'Text Align'}
                  </Typography>
                  <ToggleButtonGroup
                    value={layout[item]}
                    onChange={(e, v) => v !== null && setLayout({ ...layout, [item]: v })}
                    color='primary'
                    size='small'
                    exclusive
                  >
                    {item === 'fontsize' && <ToggleButton value='m'>
                      <TextDecrease />
                    </ToggleButton>}
                    {item === 'fontsize' && <ToggleButton value='l'>
                      <TextIncrease />
                    </ToggleButton>}
                    {item === 'textalign' && <ToggleButton value='left'>
                      <FormatAlignLeft />
                    </ToggleButton>}
                    {item === 'textalign' && <ToggleButton value='center'>
                      <FormatAlignCenter />
                    </ToggleButton>}
                    {item === 'textalign' && <ToggleButton value='right'>
                      <FormatAlignRight />
                    </ToggleButton>}
                  </ToggleButtonGroup>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={layout.quantity}
                onChange={(e, v) => v !== null && setLayout({ ...layout, quantity: v })}
                color='primary'
                size='small'
                exclusive
              >
                {buttons && <ToggleButton value='0'>
                  <Widgets sx={{ mr: 1 }} /> Zero Buttons
                </ToggleButton>}
                {buttons && <ToggleButton value='1'>
                  <Widgets sx={{ mr: 1 }} /> One Button
                </ToggleButton>}
                {buttons && <ToggleButton value='2'>
                  <Widgets sx={{ mr: 1 }} /> Two Buttons
                </ToggleButton>}
                {(blocks || cards) && <ToggleButton value='1'>
                  <Widgets sx={{ mr: 1 }} /> One {cards ? 'Card' : 'Block'}
                </ToggleButton>}
                {(blocks || cards) && <ToggleButton value='2'>
                  <Widgets sx={{ mr: 1 }} /> Two {cards ? 'Cards' : 'Blocks'}
                </ToggleButton>}
                {blocks && <ToggleButton value='3'>
                  <Widgets sx={{ mr: 1 }} /> Three {cards ? 'Cards' : 'Blocks'}
                </ToggleButton>}
                {form && <ToggleButton value='1'>
                  <Widgets sx={{ mr: 1 }} /> Without Disclaimer
                </ToggleButton>}
                {form && <ToggleButton value='2'>
                  <Widgets sx={{ mr: 1 }} /> With Disclaimer
                </ToggleButton>}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Button
            onClick={() => {
              const changeStyle = style.fontcolor !== theme.palette.fontcolor.main ||
                style.accentcolor !== theme.palette.accentcolor.main ||
                style.backgroundcolor !== theme.palette.backgroundcolor.main;
              (changeStyle || !_.isEqual(layout, section.layout)) &&
                dispatch(updateSection({
                  values: changeStyle ? { style, layout } : { layout },
                  sid: section.id, wid,
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
