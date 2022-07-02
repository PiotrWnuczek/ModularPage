import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

const WebsiteCard = ({ website }) => (
  <Card
    sx={{ borderRadius: 2 }}
    variant='outlined'
  >
    <CardHeader
      title={website.title}
      avatar={<Avatar>
        <FolderOpen />
      </Avatar>}
    />
    <CardContent>
      <Typography>{website.description}</Typography>
    </CardContent>
  </Card>
);

export default WebsiteCard;
