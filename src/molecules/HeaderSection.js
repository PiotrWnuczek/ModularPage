import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AppBar, Toolbar, Divider, Link } from '@mui/material';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';

const HeaderSection = ({ admin, header, wid }) => (
  <Box>
    <AppBar color='backgroundcolor' elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', mx: { xs: 5, md: 30 } }}>
        <TextEditor
          type='title'
          admin={admin}
          section={header}
          wid={wid}
        >
          <Typography
            sx={{
              color: 'fontcolor.main', letterSpacing: 1,
              fontSize: { xs: 14, md: 18 }, fontWeight: 600,
            }}
            variant='subtitle1'
          >
            {header.title || 'New Title'}
          </Typography>
        </TextEditor>
        {admin && <ButtonOptions section={header} wid={wid}>
          <Button
            variant='contained'
            color='accentcolor'
          >
            {header.button || 'New Button'}
          </Button>
        </ButtonOptions>}
        {!admin && <Button
          component={Link}
          href={header.link || '#'}
          target='_blank'
          variant='contained'
          color='accentcolor'
        >
          {header.button || 'New Button'}
        </Button>}
      </Toolbar>
      <Divider />
    </AppBar>
    <Toolbar />
  </Box>
);

export default HeaderSection;
