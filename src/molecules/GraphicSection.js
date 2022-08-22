import React, { useState } from 'react';
import { createFile } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from '@mui/material';
import { CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Picture from 'stock/picture.png';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';

const GraphicSection = ({ admin, section, wid }) => {
  const loading = useSelector(state => state.websites.loading);
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);

  return (
    <Grid container>
      <Grid
        sx={{
          px: 2, display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}
        item xs={12} sm={6}
      >
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <TextEditor
            type='title'
            admin={admin}
            section={section}
            wid={wid}
          >
            <Typography
              sx={{
                mb: 1, fontSize: { xs: 26, md: 36 },
                fontWeight: 600, letterSpacing: 2,
              }}
              variant='h1'
            >
              {section.title || 'New Title'}
            </Typography>
          </TextEditor>
          <TextEditor
            type='text'
            admin={admin}
            section={section}
            wid={wid}
          >
            <Box sx={{
              mt: 1, fontSize: { xs: 14, md: 18 },
              fontWeight: 400, letterSpacing: 1,
            }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section.text || 'New Text'}
              </ReactMarkdown>
            </Box>
          </TextEditor>
          {[1, 2].map(idx => <Box
            sx={{ display: 'inline-block', mx: 0.5 }}
            key={idx}
          >
            {admin && <ButtonOptions
              section={section}
              wid={wid} idx={idx}
            >
              <Button variant='outlined'>
                {section['button' + idx] || 'New Button'}
              </Button>
            </ButtonOptions>}
            {!admin && <Button
              component={Link}
              href={section.link || '#'}
              target='_blank'
              variant='outlined'
            >
              {section['button' + idx] || 'New Button'}
            </Button>}
          </Box>)}
        </Box>
      </Grid>
      <Grid
        sx={{
          px: 2, display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}
        item xs={12} sm={6}
      >
        <Box
          sx={{
            cursor: admin && 'pointer', position: 'relative', textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          component='label'
        >
          <Box
            sx={{
              opacity: admin && (info || loading) && 0.5,
              width: '100%', height: 'auto', maxWidth: 400
            }}
            src={section.url || Picture}
            component='img'
          />
          {admin && !info && <Box
            onChange={(e) => {
              if (e.target.files[0] && e.target.files[0].size < 500 * 1024) {
                dispatch(createFile({
                  file: e.target.files[0], sid: section.id, wid,
                }));
              } else { setInfo(true) }
            }}
            component='input'
            type='file'
            hidden
          />}
          {admin && info && <Box
            onClick={() => setInfo(false)}
            component='input'
            type='button'
            hidden
          />}
          {admin && <Box sx={{ position: 'absolute' }}>
            {info && <Typography variant='h6'>
              Maximum file size is 500 KB <br />
              Click to return to the previous file
            </Typography>}
            {loading && <CircularProgress size={100} />}
          </Box>}
        </Box>
      </Grid>
    </Grid>
  )
};

export default GraphicSection;
