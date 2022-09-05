import React, { useState } from 'react';
import { createSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Card, Dialog, Typography } from '@mui/material';
import { CardActionArea, CardMedia, Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import { content, graphic, iconbox } from 'stock/templates';
import { mailing, selling } from 'stock/templates';
import Graphic from 'stock/graphic.png';
import Content from 'stock/content.png';
import Iconbox from 'stock/iconbox.png';
import Mailing from 'stock/mailing.png';
import Selling from 'stock/selling.png';

const SectionCreate = ({ wid, index, start }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sections = [
    { name: 'Graphic Section', template: graphic, image: Graphic },
    { name: 'Content Section', template: content, image: Content },
    { name: 'Iconbox Section', template: iconbox, image: Iconbox },
    { name: 'Mailing Section', template: mailing, image: Mailing },
    { name: 'Selling Section', template: selling, image: Selling },
  ];

  return (
    <Box>
      <Avatar
        sx={{
          width: start ? 40 : 30, height: start ? 40 : 30,
          mx: 0.3, cursor: 'pointer', bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Avatar>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        scroll='body'
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Create New Section
          </Typography>
          {sections.map(section =>
            <Card
              sx={{ mt: 2, borderRadius: 2 }}
              key={section.name}
              variant='outlined'
            >
              <CardActionArea onClick={() => {
                dispatch(createSection({
                  values: section.template, index, wid,
                }));
                setOpen(false);
              }}>
                <CardMedia
                  component='img'
                  height='120'
                  image={section.image}
                />
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>
                    <Add />
                  </Avatar>
                  <Typography sx={{ ml: 1 }}>
                    Add New {section.name}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          )}
        </Box>
      </Dialog>
    </Box>
  )
};

export default SectionCreate;
