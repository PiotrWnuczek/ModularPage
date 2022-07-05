import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createModule, updateModule } from 'store/pagesActions';
import { Box, Typography } from '@mui/material';
import { IconButton, Avatar } from '@mui/material';
import { Add, Tune, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const TextModule = ({ createModule, updateModule, admin, page, module }) => {
  const random = Math.random().toString(16).slice(2);
  const [title, setTitle] = useState(false);

  return (
    <Box sx={{ py: admin ? 0 : 10 }}>
      {admin && <Box sx={{
        pt: 3, pb: 1, display: 'flex',
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
      {!title && <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() => setTitle(true)}
        variant='h5'
      >
        {module.title || 'New Title'}
      </Typography>}
      {title && <Formik
        initialValues={{ title: module.title || 'New Title' }}
        onSubmit={(values) => {
          updateModule(values, module.id, page.name);
          setTitle(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ my: 0 }}
              onChange={handleChange}
              value={values.title}
              label='Title'
              name='title'
              type='text'
              size='small'
              autoFocus
              InputProps={{
                endAdornment: <IconButton
                  sx={{ mx: -1 }}
                  type='submit'
                  size='small'
                >
                  <Check />
                </IconButton>
              }}
            />
          </form>
        )}
      </Formik>}
      {admin && <Box sx={{
        pb: 3, pt: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'info.main',
            '&:hover': { bgcolor: 'info.dark' },
          }}
          onClick={() => createModule({
            id: random, type: 'content',
          }, page.name)}
        >
          <Add />
        </Avatar>
      </Box>}
    </Box>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createModule: (data, page) => dispatch(createModule(data, page)),
  updateModule: (data, id, page) => dispatch(updateModule(data, id, page)),
});

export default connect(null, mapDispatchToProps)
  (TextModule);
