import React from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Grid, Typography } from '@mui/material';
import { Button, IconButton, Avatar } from '@mui/material';
import { Link, FormControlLabel, Switch } from '@mui/material';
import { Edit, InsertLink, Web } from '@mui/icons-material';
import WebsiteRemove from 'atoms/WebsiteRemove';

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
            <Typography variant='h6'>
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
            <Typography variant='body2'>
              {website.description}
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
            variant='outlined'
            size='small'
          >
            Edit
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
          <WebsiteRemove wid={website.name} />
        </Grid>
      </Grid>
    </Card>
  )
};

export default WebsiteCard;
