import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { Grid, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';
import * as icons from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';

const IconBox = ({ admin, section, wid, idx }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const icon = idx ? 'icon' + idx : 'icon';
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';
  const sl = section.layout;

  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'center' }}
      item xs={12} md={sl ? 12 / sl.quantity : 4}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {!edit && <Box
            sx={{
              cursor: admin && 'pointer',
              mr: 1, fontSize: 32, color: 'accentcolor.main',
            }}
            onClick={() => admin && setEdit(true)}
            component={icons[section[icon]] || icons.Add}
          />}
          {edit && admin && <Formik
            initialValues={{ [icon]: section[icon] || 'Add' }}
            onSubmit={(values) => {
              values[icon] !== section[icon] &&
                dispatch(updateSection({ values, sid: section.id, wid }));
              setEdit(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
                <TextField
                  sx={{ my: 0 }}
                  onChange={handleChange}
                  value={values[icon]}
                  name={icon}
                  placeholder='Icon'
                  label='Icon'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
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
          <TextEditor
            admin={admin} section={section}
            wid={wid} idx={idx} type='title'
          >
            <Typography variant='title'>
              <Box sx={{ fontSize: '70%' }}>
                {section[title] || 'New Title'}
              </Box>
            </Typography>
          </TextEditor>
        </Box>
        <TextEditor
          admin={admin} section={section}
          wid={wid} idx={idx} type='text'
        >
          <Typography variant='text'>
            <Box sx={{ fontSize: '90%' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section[text] || 'New Text'}
              </ReactMarkdown>
            </Box>
          </Typography>
        </TextEditor>
      </Box>
    </Grid>
  )
};

const IconboxSection = ({ admin, section, wid }) => {
  const sl = section.layout;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: sl ? Number(sl.quantity) : 3 }, (_, i) => ++i).map(idx =>
        <IconBox
          key={idx} idx={idx} admin={admin}
          section={section} wid={wid}
        />
      )}
    </Grid>
  )
};

export default IconboxSection;
