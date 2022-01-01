import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Styles from '../styles/App';
import Navbar from  './Navbar';
import News from  './News';
import NewsSingle from  './NewsSingle';
import Footer from  './Footer';
import { useAppSelector } from '../hooks';

function App() {

  const storeActive = useAppSelector(state => state.app.active);

  return (
    <Box sx={Styles.AppBox}>
      <CssBaseline />
      <Navbar />
      {storeActive === null ? <News /> : <NewsSingle />}
      <Footer />
    </Box>
  );
}

export default App;
