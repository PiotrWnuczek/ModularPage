import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updatePage } from 'store/pagesActions';
import { Box, Typography } from '@mui/material';
import { IconButton, Avatar } from '@mui/material';
import { Add, Tune, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const TextModule = ({ updatePage, admin, page, module }) => {
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
        module.title
      </Typography>}
      {title && <Formik
        initialValues={{ title: module.title }}
        onSubmit={(values) => {
          console.log(values);
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
          onClick={() => updatePage({
            modules: [...page.modules, { type: 'content' }]
          }, page.name)}
        >
          <Add />
        </Avatar>
      </Box>}
    </Box>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updatePage: (data, id) => dispatch(updatePage(data, id)),
});

export default connect(null, mapDispatchToProps)
  (TextModule);
