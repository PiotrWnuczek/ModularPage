import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar } from '@mui/material';
import { CardActionArea, CardHeader } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

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
            <FolderOpen />
          </Avatar>}
        />
      </CardActionArea>
    </Card>
  )
};

export default WebsiteCard;
