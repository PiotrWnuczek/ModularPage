import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { Card, Button, Avatar } from '@mui/material';
import { Edit, Web } from '@mui/icons-material';
import RemoveConfirm from 'atoms/RemoveConfirm';
import PublicControl from 'atoms/PublicControl';

const WebsiteCard = ({ website }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
      variant='outlined'
    >
      <Grid sx={{ p: 2 }} container>
        <Grid
          sx={{ display: 'flex', alignItems: 'center' }}
          item xs={12} md={6}
        >
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Web />
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant='h6'>
              {website.domain === 'custom' && website.name}
              {website.domain === 'app' && process.env.REACT_APP_DOMAIN + '/' + website.name}
            </Typography>
            <PublicControl website={website} />
          </Box>
        </Grid>
        <Grid
          sx={{
            mt: { xs: 3, md: 0 },
            display: 'flex', alignItems: 'center',
            justifyContent: { xs: 'left', md: 'right' },
          }}
          item xs={12} md={6}
        >
          <Button
            sx={{ mr: 2 }}
            onClick={() => navigate('/admin/' + website.name)}
            startIcon={<Edit />}
            variant='contained'
            size='small'
          >
            Open Editor
          </Button>
          <RemoveConfirm wid={website.name} type='website' />
        </Grid>
      </Grid>
    </Card>
  )
};

export default WebsiteCard;
