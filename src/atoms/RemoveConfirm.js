import React, { useState } from 'react';
import { removeWebsite } from 'redux/websitesSlice';
import { removeSection, removeFile } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography, Avatar } from '@mui/material';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Remove } from '@mui/icons-material';
import { Formik } from 'formik';

const RemoveConfirm = ({ type, sid, wid, hover, file }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const dispatch = useDispatch();

  return (
    <Box>
      {type === 'website' && <IconButton
        onClick={() => setOpen(true)}
        size='small'
      >
        <Delete />
      </IconButton>}
      {type === 'section' && <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3,
          cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
        onClick={() => setOpen(true)}
      >
        {hover ? <Tooltip title='remove section above' arrow>
          <Remove />
        </Tooltip> : <Remove />}
      </Avatar>}
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ textTransform: 'capitalize' }}
            variant='h5'
          >
            Remove {type}
          </Typography>
          <Box sx={{ my: 1 }}>
            <Typography>
              {type === 'website' && 'Confirm website removing, enter website name.'}
              {type === 'section' && 'Confirm section removing.'}
            </Typography>
            {type === 'website' && <Formik
              initialValues={{ name: '' }}
              onSubmit={(values) => {
                if (values.name === wid || values.name === 'modularpage.com/' + wid) {
                  dispatch(removeWebsite({ wid }));
                  setOpen(false);
                } else { setInfo(true) }
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.name}
                    placeholder='Name'
                    label='Name'
                    name='name'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoFocus
                  />
                </form>
              )}
            </Formik>}
            {type === 'website' && info && <Typography>
              Invalid website name, try again.
            </Typography>}
          </Box>
          {type === 'website' && <Button
            type='submit'
            form='confirm'
            variant='contained'
            size='small'
          >
            Confirm Remove
          </Button>}
          {type === 'section' && <Button
            onClick={() => {
              dispatch(removeSection({ sid, wid }));
              file && dispatch(removeFile({ sid, wid }));
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Confirm Remove
          </Button>}
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

export default RemoveConfirm;
