import React from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Grid, Typography } from '@mui/material';
import { Button, IconButton, Avatar } from '@mui/material';
import { Link, FormControlLabel, Switch } from '@mui/material';
import { Edit, InsertLink, Web } from '@mui/icons-material';
import RemoveConfirm from 'atoms/RemoveConfirm';

const WebsiteCard = ({ website }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
      variant='outlined'
    >
      <Grid
        sx={{ p: 2 }}
        container
      >
        <Grid
          sx={{ display: 'flex', alignItems: 'center' }}
          item xs={12} md={6}
        >
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            <Web />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 24 }}>
              {website.name}
              <IconButton
                sx={{ mx: 1 }}
                component={Link}
                href={'/' + website.name}
                target='_blank'
                color='primary'
                size='small'
              >
                <InsertLink />
              </IconButton>
            </Typography>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {website.domain} Domain
            </Typography>
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
          <FormControlLabel
            sx={{ mr: 3 }}
            control={<Switch checked={website.public} size='small' />}
            onChange={(e, value) => dispatch(updateWebsite({
              values: { public: value },
              wid: website.name,
            }))}
            label='public'
          />
          <RemoveConfirm wid={website.name} type='website' />
        </Grid>
      </Grid>
    </Card>
  )
};

export default WebsiteCard;
