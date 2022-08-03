import React from 'react';
import { Box, Avatar } from '@mui/material';
import { Tune, DragIndicator } from '@mui/icons-material';
import CreateDialog from 'molecules/CreateDialog';
import RemoveDialog from 'molecules/RemoveDialog';

const ModuleLayout = ({ children, admin, website }) => (
  <Box sx={{ py: admin ? 0 : 6, px: { xs: 6, md: 24 } }}>
    {admin && <Box sx={{
      pt: 0.6, pb: 0.4, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Avatar
        sx={{
          mx: 0.3, cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
      >
        <Tune />
      </Avatar>
      <Avatar
        sx={{
          mx: 0.3, cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
      >
        <DragIndicator />
      </Avatar>
    </Box>}
    {children}
    {admin && <Box sx={{
      pb: 0.6, pt: 0.4, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <CreateDialog wid={website.name} />
      <RemoveDialog />
    </Box>}
  </Box>
);

export default ModuleLayout;
