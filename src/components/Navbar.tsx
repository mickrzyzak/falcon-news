import React, { useState, useRef } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Collapse,
  InputBase,
  Link,
  List,
  ListItemButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import Styles from '../styles/Navbar';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  setActive,
  setNewsDisplayed,
  setSearch,
  setSearchResults,
  setSection
} from '../features/appSlice';
import { newsOnPage } from './News';
import logoFalconWhite from '../images/wingsWhite.png';

interface HeaderProps {
  storeSection: string,
  dispatch: Function,
  sections: Array<string>,
  setMenuSection: Function,
  menuOpen: boolean,
  setMenuOpen: Function,
  searchOpen: boolean,
  setSearchOpen: Function
}

const Header = (props: HeaderProps) => {

  const storeActive = useAppSelector(state => state.app.active);
  const storeNews = useAppSelector(state => state.app.news);

  // Switch the section to "All" and set a random active news
  const setBreakingNews = () => {
    let randomNews = null;
    while(randomNews === storeActive || randomNews === null) {
      randomNews = Math.floor(Math.random() * storeNews[1].news.length);
    }
    props.dispatch(setSection('All'));
    props.dispatch(setActive(randomNews));
  }

  return (
    <Container maxWidth="xl" sx={Styles.HeaderContainer}>
      <Toolbar variant="dense" disableGutters>
        <Link
          onClick={() => props.setMenuSection('')}
          color="inherit"
          underline="none"
          sx={Styles.HeaderLink}
        >
          <Stack direction="row" sx={Styles.HeaderStack}>
            <Box sx={Styles.HeaderLogoWrapper}>
              <img
                src={logoFalconWhite}
                alt="Falcon Logo"
                style={Styles.HeaderLogo}
              />
            </Box>
            <Typography variant="h6">
              Falcon News
            </Typography>
            <Typography variant="subtitle1" sx={Styles.HeaderSubtitle}>
              The best in the world
            </Typography>
          </Stack>
        </Link>
        {useMediaQuery('(min-width:900px)') ? <SearchInput {...props} /> : null}
        <Button
          onClick={() => setBreakingNews()}
          variant="contained"
          color="error"
          size="small"
          sx={Styles.HeaderBreakingNews}
        >
          Breaking News
        </Button>
      </Toolbar>
    </Container>
  );
}

const SearchInput = (props: HeaderProps) => {

  const searchInput = useRef<HTMLDivElement>(null);

  // Change the section to "Search", set the search value
  // and clear the search field
  const searchSubmit = (event: React.KeyboardEvent) => {
    let target = event.target as HTMLInputElement;
    if(event.key === 'Enter' && target.value.length >= 1) {
      props.dispatch(setSearchResults([]));
      props.dispatch(setSection('Search'));
      props.dispatch(setSearch(target.value));
      props.setSearchOpen(false);
      target.value = '';
      target.blur();
    }
  }

  return (
    <Stack direction="row" sx={Styles.SearchStack}>
      <Box
        onClick={() => searchInput.current ? searchInput.current.focus() : false}
        sx={Styles.SearchBox}
      >
        <SearchIcon />
      </Box>
      <InputBase
        onKeyPress={searchSubmit}
        inputRef={searchInput}
        inputProps={{minLength: 1, maxLength: 50}}
        placeholder="Search"
        type="text"
        autoComplete="off"
        sx={Styles.SearchInputBase}
      />
    </Stack>
  );
}

const MainMenu = (props: HeaderProps) => {
  return (
    <Container maxWidth={false} disableGutters sx={Styles.MainMenuContainer}>
      <Container maxWidth="xl" sx={Styles.MainMenuContainer2}>
        <Toolbar variant="dense" disableGutters sx={Styles.MainMenuToolbar}>
          <Box sx={Styles.MainMenuBox}>
            <Typography variant="body1">
              Sections:
            </Typography>
            <Stack direction="row">
              {props.sections.map(link =>
                <Link
                  onClick={() => props.setMenuSection(link)}
                  key={link}
                  component="button"
                  variant="body1"
                  underline="hover"
                  sx={{
                    ...Styles.MainMenuLink,
                    textDecoration: link === props.storeSection ? 'underline' : ''
                  }}
                >
                  {link}
                </Link>
              )}
            </Stack>
          </Box>
          <Button
            onClick={() => {
              props.setMenuOpen(!props.menuOpen);
              props.setSearchOpen(false);
            }}
            variant="text"
            sx={Styles.MainMenuButton}
          >
            Section: {props.storeSection === 'Search' ? 'Search results' : props.storeSection}
            {props.menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          <Link
            onClick={() => {
              props.setSearchOpen(!props.searchOpen);
              props.setMenuOpen(false);
            }}
            sx={Styles.MainMenuSearchButton}
          >
            <SearchIcon />
          </Link>
        </Toolbar>
      </Container>
    </Container>
  );
}

const MobileMenu = (props: HeaderProps) => {
  return (
    <Collapse in={props.menuOpen} timeout="auto" unmountOnExit sx={Styles.MobileMenuCollapse}>
      <Container maxWidth="xl" sx={Styles.MobileMenuContainer}>
        <List>
          {props.sections.map(link => {
            return link !== props.storeSection
            ?
              <ListItemButton
                onClick={() => {
                  props.setMenuSection(link);
                  props.setMenuOpen(false);
                }}
                key={link}
                sx={Styles.MobileMenuListItem}
              >
                {link}
              </ListItemButton>
            : null;
          })}
        </List>
      </Container>
    </Collapse>
  );
}

const MobileSearch = (props: HeaderProps) => {
  return (
    <Collapse in={props.searchOpen} timeout="auto" unmountOnExit>
      <Container maxWidth="xl" sx={Styles.MobileSearchContainer}>
        <SearchInput {...props} />
      </Container>
    </Collapse>
  );
}

const Navbar = () => {

  const storeSection = useAppSelector(state => state.app.section);
  const dispatch = useAppDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);

  const sections = [
    'All',
    'Automobiles',
    'Business',
    'Education',
    'Fashion',
    'Food',
    'Health',
    'Science',
    'Sports',
    'Technology',
    'Travel'
  ];

  const setMenuSection = (name: string) => {
    dispatch(setSection(name));
    dispatch(setNewsDisplayed(newsOnPage));
  }

  const headerProps = {
    storeSection,
    dispatch,
    sections,
    setMenuSection,
    menuOpen: mobileMenuOpen,
    setMenuOpen: setMobileMenuOpen,
    searchOpen: mobileSearchOpen,
    setSearchOpen: setMobileSearchOpen
  }

  return (
    <AppBar position="sticky" id="navbar" sx={Styles.AppBar}>
      <Header {...headerProps} />
      <MainMenu {...headerProps} />
      <MobileMenu {...headerProps} />
      <MobileSearch {...headerProps} />
    </AppBar>
  );
}

export default Navbar;
