import React from 'react';
import { connect } from 'react-redux';
import { updateWebsite } from 'store/websitesActions';
import { Box, Avatar, Typography } from '@mui/material';
import { Add, Tune } from '@mui/icons-material';

const ContentSection = ({ updateWebsite, admin, website }) => (
  <Box sx={{ py: admin ? 0 : 10 }}>
    {admin && <Box sx={{
      py: 2, display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <Avatar
        sx={{
          cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
      >
        <Tune />
      </Avatar>
    </Box>}
    <Typography>
      Content Section
    </Typography>
    {admin && <Box sx={{
      py: 2, display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <Avatar
        sx={{
          cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
        onClick={() => updateWebsite({
          sections: [...website.sections, { type: 'content' }]
        }, website.name)}
      >
        <Add />
      </Avatar>
    </Box>}
  </Box>
);

const mapDispatchToProps = (dispatch) => ({
  updateWebsite: (data, id) => dispatch(updateWebsite(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ContentSection);
