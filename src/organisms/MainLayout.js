import React from 'react';
import { Box } from '@mui/material';
import SideMenu from 'molecules/SideMenu';

const MainLayout = ({ children }) => {
  const width = { xs: 72, md: 162 };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu
        sx={{
          width, '& .MuiDrawer-paper':
            { bgcolor: 'secondary.dark', justifyContent: 'space-between', width },
        }}
        variant='permanent'
        main
      />
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
};

export default MainLayout;
