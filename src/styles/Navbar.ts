const Styles: any = {
  AppBar: {
    maxHeight: '100vh'
  },
  HeaderContainer: {
    px: {
      xs: 1,
      sm: 2
    }
  },
  HeaderLink: {
    mr: 'auto',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent'
  },
  HeaderStack: {
    alignItems: 'center',
    mr: 2
  },
  HeaderLogoWrapper: {
    height: {
      xs: '22px',
      sm: '25px'
    },
    marginRight: '8px'
  },
  HeaderLogo: {
    height: '100%',
    imageRendering: '-webkit-optimize-contrast'
  },
  HeaderSubtitle: {
    display: {
      xs: 'none',
      sm: 'block'
    },
    paddingTop: '3px',
    marginLeft: 1
  },
  HeaderBreakingNews: {
    height: {
      xs: 'auto',
      sm: 32
    }
  },
  SearchStack: {
    my: {
      xs: 1.75,
      md: 0
    },
    mr: {
      xs: 0,
      md: 2
    },
    pr: 1,
    borderRadius: 1,
    transition: 'background-color .25s',
    backgroundColor: 'rgba(255, 255, 255, .15)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .25)'
    }
  },
  SearchBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 1,
    cursor: 'pointer'
  },
  SearchInputBase: {
    color: 'white',
    width: '100%',
    '& .MuiInputBase-input': {
      width: 60,
      transition: 'width .25s',
      '&:focus': {
        width: 120
      }
    }
  },
  MainMenuContainer: {
    bgcolor: 'primary.dark'
  },
  MainMenuContainer2: {
    px: {
      xs: 1,
      sm: 2
    }
  },
  MainMenuToolbar: {
    minHeight: {
      xs: '0',
      lg: '36px'
    }
  },
  MainMenuBox: {
    display: {
      xs: 'none',
      lg: 'flex'
    }
  },
  MainMenuLink: {
    color: 'white',
    ml: 3
  },
  MainMenuButton: {
    display: {
      xs: 'flex',
      lg: 'none'
    },
    px: 2,
    py: .75,
    color: 'white',
    textTransform: 'none',
    lineHeight: '1.5',
    fontSize: '1rem',
    fontWeight: '400'
  },
  MainMenuSearchButton: {
    display: {
      xs: 'flex',
      md: 'none'
    },
    ml: 'auto',
    px: 2,
    color: 'white',
    cursor: 'pointer'
  },
  MobileMenuCollapse: {
    overflowY: 'auto'
  },
  MobileMenuContainer: {
    px: {
      xs: 1,
      sm: 2
    }
  },
  MobileMenuListItem: {
    borderRadius: '4px',
    px: 2,
    py: .75
  },
  MobileSearchContainer: {
    px: {
      xs: 3,
      sm: 4
    }
  },
}

export default Styles;
