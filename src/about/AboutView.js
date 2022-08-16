import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Link } from '@mui/material';
import BasicLayout from 'about/BasicLayout';
import HeroSection from 'about/HeroSection';
import FormSection from 'about/FormSection';

const AboutView = ({ lang }) => {
  const navigate = useNavigate();

  return (
    <BasicLayout lang={lang}>
      <HeroSection lang={lang} />
      <FormSection lang={lang} />
      <Box sx={{ p: 5, bgcolor: 'secondary.light' }}>
        <Box sx={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Button
            sx={{ mx: 1 }}
            onClick={() => navigate('/' + lang + '/privacy')}
            size='small'
          >
            {lang === 'en' && 'Privacy Policy'}
            {lang === 'pl' && 'Polityka Prywatności'}
          </Button>
          <Button
            sx={{ mx: 1 }}
            onClick={() => navigate('/' + lang + '/rules')}
            size='small'
          >
            {lang === 'en' && 'Newsletter Rules'}
            {lang === 'pl' && 'Regulamin Newslettera'}
          </Button>
        </Box>
        <Box sx={{
          my: 1, display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography>
            Copyright © modularpage.com created by
          </Typography>
          <Link
            sx={{ ml: 0.5 }}
            href='https://piotrwnuczek.pl'
            target='_blank'
            underline='hover'
          >
            Piotr Wnuczek
          </Link>
        </Box>
        <Box sx={{
          my: 1, display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography sx={{ fontSize: '70%' }}>
            Picture designed by
          </Typography>
          <Link
            sx={{ ml: 0.5, fontSize: '70%' }}
            href='https://www.freepik.com/'
            target='_blank'
            underline='hover'
          >
            vectorjuice / Freepik
          </Link>
        </Box>
      </Box>
    </BasicLayout>
  )
};

export default AboutView;
