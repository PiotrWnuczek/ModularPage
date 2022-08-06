import React from 'react';
import { Box, Avatar } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import SectionCreate from 'atoms/SectionCreate';
import SectionOptions from 'atoms/SectionOptions';
import SectionRemove from 'atoms/SectionRemove';

const BlockLayout = ({ children, admin, website, section }) => (
  <Box sx={{ py: admin ? 0 : 6, px: { xs: 6, md: 24 } }}>
    {admin && <Box sx={{
      pt: 1.6, pb: 0.6, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <SectionOptions section={section} />
      <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3,
          cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
        onClick={() => console.log('dnd')}
      >
        <DragIndicator />
      </Avatar>
    </Box>}
    {children}
    {admin && <Box sx={{
      pb: 1.6, pt: 0.6, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <SectionCreate wid={website.name} />
      <SectionRemove sid={section.id} wid={website.name} />
    </Box>}
  </Box>
);

export default BlockLayout;
