import React, { useState, useEffect } from 'react';
import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Paper,
  Typography
} from '@mui/material';
import Styles from '../styles/NewsSingle';
import { LoremIpsum } from 'lorem-ipsum';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setActive } from '../features/appSlice';

type ActiveNews = {
  multimedia?: Array<{url: string, caption: string}>;
  section: string;
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  url: string;
}

const NewsSingle = () => {

  const storeActive = useAppSelector(state => state.app.active);
  const storeNews = useAppSelector(state => state.app.news);
  const storeSection = useAppSelector(state => state.app.section);
  const dispatch = useAppDispatch();

  const [loremIpsum, setLoremIpsum] = useState<Array<JSX.Element> | null>(null);
  const [activeNews, setActiveNews] = useState<ActiveNews>({
    section: '',
    title: '',
    abstract: '',
    multimedia: [],
    byline: '',
    published_date: '',
    url: ''
  });

  // Convert date to DD/MM/YYYY format
  const dateFormat = (date: string) => {
    let format = date.substring(0, 10).split('-');
    return format[2]+'/'+format[1]+'/'+format[0];
  }

  const NewsContent = () => {
    return (
      <>
        <Paper sx={Styles.NewsPaper}>
          <Breadcrumbs sx={Styles.NewsBreadcrumbs}>
            <Typography>News</Typography>
            <Typography>{activeNews.section}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" component="h1" sx={Styles.NewsTitle}>
            {activeNews.title}
          </Typography>
          <Stack sx={Styles.NewsStack}>
            {activeNews.byline !== null && activeNews.byline.length <= 50
            ?
              <Typography variant="subtitle2" sx={Styles.NewsStackItem}>
                Author: <span style={Styles.ColorPrimary}>{activeNews.byline.substring(3)}</span>
              </Typography>
            : null}
            <Typography variant="subtitle2" sx={Styles.NewsStackItem}>
              Date: <span style={Styles.ColorPrimary}>{dateFormat(activeNews.published_date)}</span>
            </Typography>
          </Stack>
          <Typography variant="body1" sx={Styles.NewsAbstract}>{activeNews.abstract}</Typography>
          <Alert severity="info" variant="outlined" sx={Styles.NewsAlert}>
            <AlertTitle>This article is from the New York Times API</AlertTitle>
            <Typography variant="body2">
              The full content of the article is available at the link below.
            </Typography>
            <Button
              href={activeNews.url}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              size="small"
              color="info"
              sx={Styles.NewsAlertButton}
            >
              Watch the original article
            </Button>
          </Alert>
          {activeNews.multimedia !== null
            && activeNews.multimedia !== undefined
            && activeNews.multimedia.length
          ?
            <img
              src={activeNews.multimedia[2].url}
              alt={activeNews.multimedia[2].caption}
              style={Styles.NewsImage}
            />
          : null}
          {loremIpsum}
        </Paper>
        <Button
          onClick={() => dispatch(setActive(null))}
          variant="outlined"
          size="large"
          sx={Styles.NewsGoBack}
        >
          Go Back
        </Button>
      </>
    );
  }

  const SeeAlso = () => {

    let news: Array<any> = [];
    let randomIds: Array<number> = [];
    let activeSectionId = storeNews.findIndex(el => el.section === storeSection);

    // Push the random article ids from the active section to "randomIds"
    let mobileView = useMediaQuery('(max-width:899px)');
    while(randomIds.length < (activeNews.multimedia !== null || mobileView ? 3 : 2)) {
      let randomId = Math.floor(Math.random() * storeNews[activeSectionId].news.length);
      if(!randomIds.includes(randomId) && randomId !== storeActive) {
        randomIds.push(randomId);
      }
    }

    // Push article components to "news"
    for(let i = 0; i < randomIds.length; i++) {
      let randomNews = storeNews[activeSectionId].news[randomIds[i]];
      news.push(
        <ButtonBase
          onClick={() => dispatch(setActive(randomIds[i]))}
          component="a"
          key={i}
          sx={Styles.SeeAlsoButton}
        >
          <Card sx={Styles.SeeAlsoCard}>
            {randomNews.multimedia !== null
              && randomNews.multimedia !== undefined
              && randomNews.multimedia[2] !== undefined
            ?
            <CardMedia
              component="img"
              sx={Styles.SeeAlsoCardMedia}
              image={randomNews.multimedia[2].url}
              alt={randomNews.subsection}
            />
            : null}
            <CardContent>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{mb: randomNews.abstract.length > 0 ? 1 : 0}}
              >
                {randomNews.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {randomNews.abstract}
              </Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      );
    }

    return (
      <Box sx={Styles.SeeAlsoBox}>
        <Typography variant="h5" gutterBottom>See also</Typography>
        {news}
      </Box>
    );
  }

  useEffect(() => {
    // Return if the active news is empty
    if(storeActive === null) {
      return;
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Set active news
    let sectionKey = storeNews.findIndex(el => el.section === storeSection);
    let activeNews = storeNews[sectionKey].news[storeActive];
    setActiveNews(activeNews);

    // Initialize LoremIpsum generator
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 12,
        min: 4
      },
      wordsPerSentence: {
        max: 12,
        min: 4
      }
    });

    // Generate lorem ipsum paragraphs
    let paragraphs = [];
    for(let i = 0; i < 4; i++) {
      paragraphs.push(
        <Box key={i}>
          <Typography variant="h6" sx={Styles.LoremHeader}>
            {lorem.generateSentences(1)}
          </Typography>
          <Typography variant="body1" sx={Styles.LoremParagraph}>
            {lorem.generateParagraphs(1)}
          </Typography>
        </Box>
      );
    }
    setLoremIpsum(paragraphs);
  }, [storeSection, storeActive, storeNews]);

  return (
    <Container maxWidth="lg" sx={Styles.NewsContainer}>
      <Grid container spacing={{xs: 2, sm: 4}}>
        <Grid item xs={12} md={8}>
          <NewsContent />
        </Grid>
        <Grid item xs={12} md={4}>
          <SeeAlso />
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewsSingle;
