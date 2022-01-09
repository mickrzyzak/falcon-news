import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  LinkProps,
  Skeleton,
  Typography
} from '@mui/material';
import Styles from '../styles/News';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import { apiTimesWireUrl, apiArticleSearchUrl } from './App';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  setActive,
  setNews,
  setNewsDisplayed,
  setSearch,
  setSearchResults,
  setSection
} from '../features/appSlice';

type LocalNews = Array<{
  multimedia?: Array<{url: string, caption: string}>;
  section: string;
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  url: string;
}>;

const dialogLinkProps: LinkProps = {
  target: '_blank',
  rel: 'noreferrer',
  underline: 'none'
};

const newsOnPage = window.innerWidth >= 1200 ? 9 : 8;

const NotRespondDialog = (props: {open: boolean}) => {
  return (
    <Dialog open={props.open}>
      <DialogTitle sx={Styles.DialogTitle}>
        The NYT API is not responding
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The news data comes from the{' '}
          <Link href="https://developer.nytimes.com" {...dialogLinkProps}>New York Times API</Link>
          , at the moment this service is not responding. Please check back later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.location.reload()} color="error">Reload Page</Button>
      </DialogActions>
    </Dialog>
  );
}

const TooManyRequestsDialog = (props: {open: boolean, setOpen: Function}) => {
  return (
    <Dialog onClose={() => props.setOpen(false)} open={props.open}>
      <DialogTitle sx={Styles.DialogTitle}>
        The NYT API has reached its limit
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The news data comes from the{' '}
          <Link href="https://developer.nytimes.com" {...dialogLinkProps}>New York Times API</Link>,
          at the moment this service is too busy to respond. Please wait a moment and try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>I'm sad, but I understand</Button>
      </DialogActions>
    </Dialog>
  );
}

const News = () => {

  const storeSearch = useAppSelector(state => state.app.search);
  const storeNews = useAppSelector(state => state.app.news);
  const storeNewsDisplayed = useAppSelector(state => state.app.newsDisplayed);
  const storeSection = useAppSelector(state => state.app.section);
  const dispatch = useAppDispatch();

  const [displayedNews, setDisplayedNews] = useState<LocalNews>([]);
  const [searchResultsNotFound, setSearchResultsNotFound] = useState<boolean>(false);
  const [dialogNotRespond, setDialogNotRespond] = useState<boolean>(false);
  const [dialogTooManyRequests, setDialogTooManyRequests] = useState<boolean>(false);

  // Get news from the active section limited by "storeNewsDisplayed"
  const getNewsToDisplay = useCallback(() => {
    let sectionNews = storeNews.find(section => section.section === storeSection);
    return sectionNews !== undefined ? sectionNews.news.slice(0, storeNewsDisplayed) : [];
  }, [storeSection, storeNews, storeNewsDisplayed]);

  // Get news from NYT's Times Wire API or throw an error code
  const getNewsFromTimesWireApi = useCallback(async () => {
    try {
      return await fetch(apiTimesWireUrl.replace('{SECTION}', storeSection.toLowerCase()))
      .then(res => res.status === 200 ? res.json() : res.status)
      .then(res => typeof res === 'object' ? res.results : res);
    } catch(error) {
      return 404;
    }
  }, [storeSection]);

  // Get news from NYT's Article Search API or throw an error code
  const getNewsFromArticleSearchApi = useCallback(async () => {
    try {
      return await fetch(apiArticleSearchUrl.replace('{QUERY}', storeSearch))
      .then(res => res.status === 200 ? res.json() : res.status)
      .then(res => typeof res === 'object' ? res.response.docs : res);
    } catch(error) {
      return 404;
    }
  }, [storeSearch]);

  // Convert date format to a more friendly form
  // Outputs: TODAY, YESTERDAY, X DAYS AGO, YYYY/MM/DD
  const daysAgoFromNow = (date: string) => {
    let dateNow = new Date();
    let dateAgo = new Date(date);
    let dateDiffrence = dateNow.getTime() - dateAgo.getTime();
    dateDiffrence = Math.floor(dateDiffrence / (1000 * 3600 * 24));
    if(dateDiffrence === 0) {
      return 'TODAY';
    } else if(dateDiffrence === 1) {
      return 'YESTERDAY';
    } else if(dateDiffrence < 100) {
      return dateDiffrence+' DAYS AGO';
    } else {
      let format = date.substring(0, 10).split('-');
      return format[2]+'/'+format[1]+'/'+format[0];
    }
  }

  const NewsElements = () => {
    return (
      <>
        {displayedNews.map((news, key) => {
          let daysAgo = daysAgoFromNow(news.published_date);
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <ButtonBase
                onClick={() => dispatch(setActive(key))}
                component="a"
                sx={Styles.NewsButtonBase}
              >
                <Card sx={Styles.NewsCard}>
                  {news.multimedia !== null
                    && news.multimedia !== undefined
                    && news.multimedia[2] !== undefined
                  ?
                    <CardMedia
                      component="img"
                      image={news.multimedia[2].url}
                      alt={news.multimedia[2].caption}
                      sx={Styles.NewsCardMedia}
                    />
                  : null}
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      sx={Styles.NewsTypographySubtitle2}
                    >
                      {news.section}
                    </Typography>
                    <Typography gutterBottom variant="h5">
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: (news.byline !== null && news.byline.length > 25)
                        || daysAgo.length >= 10 ? '88px' : '48px'
                      }}
                    >
                      {news.abstract}
                    </Typography>
                    <Box sx={Styles.NewsBox}>
                      {news.byline !== null && news.byline.length <= 50
                      ?
                        <Chip
                          label={news.byline.substring(3)}
                          icon={<AccountCircleOutlinedIcon />}
                          color="primary"
                          variant="outlined"
                          sx={Styles.NewsChipByLine}
                        />
                      : null}
                      <Chip
                        label={daysAgo}
                        icon={<UpdateOutlinedIcon />}
                        color="primary"
                        variant="outlined"
                        sx={Styles.NewsChipPublishedDate}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          );
        })}
      </>
    );
  }

  const NewsSkeletons = () => {
    return (
      <>
        {!searchResultsNotFound && [...Array(newsOnPage)].map((element, key) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <Card sx={Styles.NewsCard}>
                <Skeleton variant="rectangular" animation="wave" sx={Styles.NewsCardMedia} />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </>
    );
  }

  const NewsReadMore = () => {

    let activeSectionId = storeNews.findIndex(el => el.section === storeSection);

    if(activeSectionId !== -1 && storeNewsDisplayed < storeNews[activeSectionId].news.length) {
      return (
        <>
          <Button
            onClick={() => dispatch(setNewsDisplayed(storeNewsDisplayed + newsOnPage))}
            variant="outlined"
            size="large"
            sx={Styles.NewsReadMore}
          >
            Read More
          </Button>
        </>
      );
    } else return null;
  }

  const SearchLabel = () => {
    return (
      <Typography variant="h4" sx={{
        ...Styles.NewsSerachLabel,
        display: { xs: searchResultsNotFound ? 'block' : 'none', lg: 'block' }
      }}>
        {searchResultsNotFound ? 'No search results found' : 'Search results'}
      </Typography>
    );
  }

  useEffect(() => {
    // If the active section is empty, set "All" to active and return
    if(storeSection.length === 0) {
      dispatch(setSection('All'));
      return;
    }

    // Scroll to the top of the page
    // and reset the "searchResultsNotFound"
    window.scrollTo(0, 0);
    setSearchResultsNotFound(false);

    // If the section news have not yet been loaded, get them from the API
    if(storeNews.findIndex(el => el.section === storeSection) === -1) {
      setDisplayedNews([]);
      getNewsFromTimesWireApi().then(news => {
        if(Array.isArray(news)) {
          dispatch(setNews({section: storeSection, news}));
        } else {
          // Show error dialog on failure
          if(news === 429) {
            setDialogTooManyRequests(true);
          } else {
            setDialogNotRespond(true);
          }
        }
      });
    }
  }, [dispatch, storeSection, storeNews, getNewsFromTimesWireApi]);

  useEffect(() => {
    // Return if the search value is empty
    if(storeSearch.length === 0) return;

    // Get the searched news from the API
    getNewsFromArticleSearchApi().then(docs => {
      if(Array.isArray(docs) && docs.length) {
        let news: LocalNews = [];
        // Convert Search API response to Times Wire API format
        docs.forEach(doc => {
          if(doc.multimedia.length >= 3) {
            doc.multimedia[2].url = 'https://static01.nyt.com/'+doc.multimedia[2].url;
          }
          news.push({
            multimedia: doc.multimedia,
            section: 'Search results',
            title: doc.headline.main,
            abstract: doc.abstract,
            byline: doc.byline.original,
            published_date: doc.pub_date,
            url: doc.web_url
          });
        });
        setSearchResultsNotFound(false);
        dispatch(setSearch(''));
        dispatch(setSearchResults(news));
        dispatch(setNewsDisplayed(newsOnPage));
      } else if(Array.isArray(docs) && docs.length === 0) {
        // If the search result is empty, set "searchResultsNotFound"
        setSearchResultsNotFound(true);
      } else {
        // Show error dialog on failure
        if(docs === 429) {
          setDialogTooManyRequests(true);
        } else {
          setDialogNotRespond(true);
        }
      }
    });
  }, [dispatch, storeSearch, getNewsFromArticleSearchApi]);

  useEffect(() => {
    // Update displayed news when stored data changes
    setDisplayedNews(getNewsToDisplay());
  }, [getNewsToDisplay]);

  return (
    <Container maxWidth="xl" sx={Styles.NewsContainer}>
      <NotRespondDialog open={dialogNotRespond} />
      <TooManyRequestsDialog open={dialogTooManyRequests} setOpen={setDialogTooManyRequests} />
      {storeSection === 'Search' ? <SearchLabel /> : null}
      <Grid container spacing={{xs: 2, sm: 4}}>
        {displayedNews.length ? <NewsElements /> : <NewsSkeletons />}
      </Grid>
      <NewsReadMore />
    </Container>
  );
}

export default News;
export { newsOnPage };
