import React from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, Button } from '@mui/material';
import { Typography, Avatar, Link } from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';
import { Edit, Web } from '@mui/icons-material';
import RemoveConfirm from 'atoms/RemoveConfirm';

const WebsiteCard = ({ website }) => {
  const dispatch = useDispatch();
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
              {website.domain === 'app' && 'modularpage.com/' + website.name}
            </Typography>
            <Button
              component={Link}
              href={website.domain === 'custom' ?
                'https://' + website.name : '/' + website.name}
              target='_blank'
              size='small'
              disabled={!website.public}
            >
              Link to website
            </Button>
            <FormControlLabel
              sx={{ m: 0 }}
              control={<Switch checked={website.public} size='small' />}
              onChange={(e, value) => dispatch(updateWebsite({
                values: { public: value }, wid: website.name,
              }))}
              label='public'
            />
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
            onClick={() => navigate('/' + website.name + '/admin')}
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
