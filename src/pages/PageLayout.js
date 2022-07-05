import React, { useState } from 'react';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Menu, Settings } from '@mui/icons-material';
import SideBar from 'organisms/SideBar';

const PageLayout = ({ admin, page, children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [dialog, setDialog] = useState(false);
  const width = { xs: 70, md: 160 };

  return (
    <Box sx={{ display: 'flex' }}>
      {admin && <SideBar
        sx={{
          width, '& .MuiDrawer-paper':
            { bgcolor: 'secondary.dark', justifyContent: 'space-between', width },
        }}
        variant='temporary'
        open={sidebar}
        onClose={() => setSidebar(!sidebar)}
        page
      />}
      {admin && <Box sx={{ position: 'fixed', top: 20, left: 20 }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => setSidebar(true)}
        >
          <Menu />
        </Avatar>
      </Box>}
      {admin && <Box>
        <Box sx={{ position: 'fixed', top: 20, right: 20 }}>
          <Avatar
            sx={{
              cursor: 'pointer', bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            onClick={() => setDialog(true)}
          >
            <Settings />
          </Avatar>
        </Box>
        <Dialog
          sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
          open={dialog}
          onClose={() => setDialog(false)}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Typography variant='h5'>
              Settings
            </Typography>
            <Typography variant='subtitle1'>
              {page && page.name} | {page && page.description}
            </Typography>
            <Button
              onClick={() => setDialog(false)}
              variant='outlined'
              size='small'
            >
              Set
            </Button>
          </Box>
        </Dialog>
      </Box>}
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
};

export default PageLayout;
