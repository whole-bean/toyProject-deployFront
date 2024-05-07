import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link
        color='inherit'
        underline='none'
        href='https://github.com/whole-bean'
        target='_blank'
        rel='noopener'
      >
        최예준
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface FooterProps {
}

export default function Footer(props: FooterProps) {

  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', pt: 7, height: 120}}>
      <Container maxWidth='lg'>
        <Copyright />
      </Container>
    </Box>
  );
}
