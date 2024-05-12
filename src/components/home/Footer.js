import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © ['}
      <Link
        color='inherit'
        underline='none'
        href='https://github.com/whole-bean'
        target='_blank'
        rel='noopener'
      >
        최예준
      </Link>{' | '}
      <Link
        color='inherit'
        underline='none'
        href='https://github.com/HyojeongRyu'
        target='_blank'
        rel='noopener'
      >
        류효정
      </Link>{'] '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {

  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', pt: 3, pb: 1}}>
      <Container maxWidth='lg'>
        <Copyright />
      </Container>
    </Box>
  );
}

Footer.propTypes = {
};

export default Footer;
