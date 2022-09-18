import React, { useState } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, Button, Link } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const WebsiteFinish = ({ website }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 44, left: 44, zIndex: 1200 }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => setOpen(true)}
        >
          <ArrowBack />
        </Avatar>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Exit Editor
          </Typography>
          <Box sx={{ my: 1, mb: 2 }}>
            <Typography>
              Changes are saved, you can exit to board.
            </Typography>
            <Button
              sx={{ ml: -0.5 }}
              component={Link}
              href={website.domain === 'custom' ?
                'https://' + website.name : '/' + website.name}
              target='_blank'
              size='small'
              disabled={!website.public}
            >
              Link to website
            </Button>
            <FormControlLabel
              sx={{ m: 0 }}
              control={<Switch checked={website.public} size='small' />}
              onChange={(e, value) => dispatch(updateWebsite({
                values: { public: value },
                wid: website.name,
              }))}
              label='public'
            />
          </Box>
          <Button
            onClick={() => {
              navigate('/board');
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Exit Editor
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default WebsiteFinish;
