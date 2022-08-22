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

const IconBox = ({ admin, section, wid, item }) => {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(false);

  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'center' }}
      item xs={12} md={4}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {!icon && <Box
            sx={{ cursor: admin && 'pointer', mr: 1 }}
            onClick={() => admin && setIcon(true)}
            component={icons[item.icon] ? icons[item.icon] : icons.Add}
          />}
          {icon && admin && <Formik
            initialValues={{ icon: item.icon || 'Add' }}
            onSubmit={(values) => {
              values.icon !== item.icon &&
                dispatch(updateSection({
                  values: {
                    items: section.items && section.items.map(
                      it => it.id === item.id ? { ...it, ...values } : it
                    ),
                  }, sid: section.id, wid,
                }));
              setIcon(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
                <TextField
                  sx={{ my: 0 }}
                  onChange={handleChange}
                  value={values.icon}
                  placeholder='Icon'
                  label='Icon'
                  name='icon'
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
            type='title'
            admin={admin}
            section={section}
            wid={wid}
            item={item}
          >
            <Typography
              sx={{
                fontSize: { xs: 18, md: 26 },
                fontWeight: 600, letterSpacing: 2,
              }}
              variant='h1'
            >
              {item.title || 'New Title'}
            </Typography>
          </TextEditor>
        </Box>
        <TextEditor
          type='text'
          admin={admin}
          section={section}
          wid={wid}
          item={item}
        >
          <Box sx={{
            fontSize: { xs: 14, md: 18 },
            fontWeight: 400, letterSpacing: 1,
          }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {item.text || 'New Text'}
            </ReactMarkdown>
          </Box>
        </TextEditor>
      </Box>
    </Grid>
  )
};

const IconboxSection = ({ admin, section, wid }) => {
  const items = [{ id: 'i1' }, { id: 'i2' }, { id: 'i3' }];

  return (
    <Grid container spacing={2}>
      {section.items && section.items.map(item =>
        <IconBox
          section={section}
          admin={admin} wid={wid}
          item={item} key={item.id}
        />
      )}
      {!section.items && items.map(item =>
        <IconBox
          section={{ ...section, items }}
          admin={admin} wid={wid}
          item={item} key={item.id}
        />
      )}
    </Grid>
  )
};

export default IconboxSection;
