import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea } from '@mui/material';
import { CardHeader, Avatar } from '@mui/material';
import { Web } from '@mui/icons-material';

const WebsiteCard = ({ website }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
      variant='outlined'
    >
      <CardActionArea onClick={() => navigate('/' + website.name + '/admin')}>
        <CardHeader
          title={website.name}
          subheader={website.description}
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>
            <Web />
          </Avatar>}
        />
      </CardActionArea>
    </Card>
  )
};

export default WebsiteCard;
