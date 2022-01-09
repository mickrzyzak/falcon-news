import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Styles from '../styles/App';
import Navbar from  './Navbar';
import News from  './News';
import NewsSingle from  './NewsSingle';
import Footer from  './Footer';
import { useAppSelector } from '../hooks';

const apiKey = 'vKnLNohXyExWqbxOdleYaqqR5UkSjGLv';
const apiTimesWireUrl = 'https://api.nytimes.com/svc/news/v3/content/nyt/{SECTION}.json?api-key='+apiKey+'&limit=90';
const apiArticleSearchUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='+apiKey+'&q={QUERY}';

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
export {apiTimesWireUrl, apiArticleSearchUrl};
