import React from 'react';
import { Box } from '@mui/material';
import SideBar from 'molecules/SideBar';

const MainLayout = ({ children }) => {
  const width = { xs: 70, md: 160 };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar
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
