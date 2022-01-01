import React from 'react';
import {
  Box,
  Container,
  Link,
  LinkProps,
  Stack,
  Typography
} from '@mui/material';
import Styles from '../styles/Footer';
import logoPoweredByNYTimes from '../images/poweredByNYTimes.png';

const Footer = () => {

  const linkProps: LinkProps = {
    target: '_blank',
    rel: 'noreferrer',
    underline: 'hover'
  };

  return (
    <Container maxWidth={false} disableGutters sx={Styles.FooterContainer}>
      <Container maxWidth="xl" sx={Styles.FooterContainer2}>
        <Stack sx={Styles.FooterStack}>
          <Link href="https://developer.nytimes.com" {...linkProps} sx={Styles.FooterLink}>
            <img
              src={logoPoweredByNYTimes}
              alt="Data provided by The New York Times"
            />
          </Link>
          <Box sx={Styles.FooterBox}>
            <Typography variant="body1">
              Application created by{' '}
              <Link href="https://github.com/mickrzyzak/falcon-news" {...linkProps}>mickrzyzak</Link>{' '}
              on GitHub
            </Typography>
            <Typography variant="body2">
              Icons made by{' '}
              <Link href="https://www.freepik.com" {...linkProps}>Freepik</Link>{' '}
              from{' '}
              <Link href="https://www.flaticon.com" {...linkProps}>www.flaticon.com</Link>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Container>
  );
}

export default Footer;
