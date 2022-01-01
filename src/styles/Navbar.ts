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
  HeaderToolbar: {
    flexDirection: { xs: 'column', sm: 'row' },
    pt: { xs: 1, sm: 0 },
    pb: { xs: 1, sm: 0 }
  },
  HeaderLink: {
    mr: {
      sx: 0,
      sm: 'auto'
    },
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'transparent'
  },
  HeaderStack: {
    alignItems: 'center',
    mr: { xs: 0, sm: 2 },
    mb: { xs: .5, sm: 0 }
  },
  HeaderLogo: {
    height: '25px',
    marginRight: '8px',
    imageRendering: '-webkit-optimize-contrast'
  },
  HeaderSubtitle: {
    paddingTop: '3px',
    marginLeft: 1
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
    display: { xs: 'none', lg: 'flex' }
  },
  MainMenuLink: {
    color: 'white',
    ml: 3
  },
  MainMenuButton: {
    width: { xs: '100%', sm: 'auto' },
    display: { xs: 'flex', lg: 'none' },
    px: 2,
    py: .75,
    color: 'white',
    textTransform: 'none',
    lineHeight: '1.5',
    fontSize: '1rem',
    fontWeight: '400'
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
    justifyContent: { xs: 'center', sm: 'flex-start' },
    borderRadius: '4px',
    px: 2,
    py: .75
  }
}

export default Styles;
