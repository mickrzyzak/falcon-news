import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Collapse,
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
import { useAppSelector, useAppDispatch } from '../hooks';
import { setSection, setActive } from '../features/appSlice';
import logoFalconWhite from '../images/wingsWhite.png';

interface MenuProps {
  storeSection: string,
  dispatch: Function,
  sections: Array<string>,
  open: boolean,
  setOpen: Function
}

const Header = (props: {dispatch: Function}) => {

  const storeActive = useAppSelector(state => state.app.active);
  const storeNews = useAppSelector(state => state.app.news);

  // Switch the section to "All" and set a random active news
  const setBreakingNews = () => {
    let randomNews = null;
    while(randomNews === storeActive || randomNews === null) {
      randomNews = Math.floor(Math.random() * storeNews[0].news.length);
    }
    props.dispatch(setSection('All'));
    props.dispatch(setActive(randomNews));
  }

  return (
    <Container maxWidth="xl" sx={Styles.HeaderContainer}>
      <Toolbar variant="dense" disableGutters sx={Styles.HeaderToolbar}>
        <Link
          onClick={() => props.dispatch(setSection(''))}
          color="inherit"
          underline="none"
          sx={Styles.HeaderLink}
        >
          <Stack direction="row" sx={Styles.HeaderStack}>
            <img
              src={logoFalconWhite}
              alt="Falcon Logo"
              style={Styles.HeaderLogo}
            />
            <Typography variant="h6" noWrap>
              Falcon News
            </Typography>
            <Typography variant="subtitle1" noWrap sx={Styles.HeaderSubtitle}>
              The best in the world
            </Typography>
          </Stack>
        </Link>
        <Button
          onClick={() => setBreakingNews()}
          variant="contained"
          color="error"
          size="small"
        >
          Breaking News
        </Button>
      </Toolbar>
    </Container>
  );
}

const MainMenu = (props: MenuProps) => {
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
                  onClick={() => props.dispatch(setSection(link))}
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
            onClick={() => props.setOpen(!props.open)}
            variant="text"
            sx={Styles.MainMenuButton}
          >
            Section: {props.storeSection}
            {props.open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
        </Toolbar>
      </Container>
    </Container>
  );
}

const MobileMenu = (props: MenuProps) => {
  return (
    <Collapse in={props.open} timeout="auto" unmountOnExit sx={Styles.MobileMenuCollapse}>
      <Container maxWidth="xl" sx={Styles.MobileMenuContainer}>
        <List>
          {props.sections.map(link => {
            return link !== props.storeSection ?
              <ListItemButton
                onClick={() => {
                  props.dispatch(setSection(link));
                  props.setOpen(false);
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

const Navbar = () => {

  const storeSection = useAppSelector(state => state.app.section);
  const dispatch = useAppDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  const menuProps = {
    storeSection,
    dispatch,
    sections,
    open: mobileMenuOpen,
    setOpen: setMobileMenuOpen
  }

  return (
    <AppBar position="sticky" id="navbar" sx={Styles.AppBar}>
      <Header dispatch={dispatch} />
      <MainMenu {...menuProps} />
      <MobileMenu {...menuProps} />
    </AppBar>
  );
}

export default Navbar;
