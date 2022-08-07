import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Grid, Typography, Button } from '@mui/material';
import { Avatar, Link, FormControlLabel, Switch } from '@mui/material';
import { Edit, Web } from '@mui/icons-material';
import WebsiteRemove from 'atoms/WebsiteRemove';

const WebsiteCard = ({ website }) => {
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
            </Typography>
            <Typography variant='subtitle1'>
              {website.description}
            </Typography>
            <Link
              href={'/' + website.name}
              target='_blank'
              underline='hover'
            >
              {website.name}
            </Link>
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
            control={<Switch checked={true} size='small' />}
            onChange={(e, value) => console.log(value)}
            label='public'
          />
          <WebsiteRemove wid={website.name} />
        </Grid>
      </Grid>
    </Card>
  )
};

export default WebsiteCard;
