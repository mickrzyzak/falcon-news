import { blue } from '@mui/material/colors';

const Styles: any = {
  NewsContainer: {
    px: {
      xs: 1,
      sm: 2
    },
    my: {
      xs: 2,
      sm: 4
    }
  },
  NewsBreadcrumbs: {
    mb: 1,
    color: 'grey.600'
  },
  NewsPaper: {
    p: 2,
    pb: 3
  },
  NewsTitle: {
    mb: {
      xs: 1.5,
      sm: 1
    },
    fontSize: {
      xs: '1.75rem',
      sm: '2.125rem'
    },
    lineHeight: {
      xs: 1,
      sm: 1.235
    }
  },
  NewsStack: {
    mb: 2.5,
    flexDirection: {
      xs: 'column',
      sm: 'row'
    }
  },
  NewsStackItem: {
    color: 'grey.600',
    lineHeight: 1.2,
    mt: {
      xs: .5,
      sm: 0
    },
    mr: {
      xs: 0,
      sm: 2
    }
  },
  NewsAbstract: {
    mb: 3,
  },
  NewsAlert: {
    mb: 3,
    '& .MuiAlert-icon': {
      display: {
        xs: 'none',
        sm: 'flex'
      }
    },
    '& .MuiAlert-message': {
      width: '100%'
    }
  },
  NewsAlertButton: {
    mt: 1,
    width: {
      xs: '100%',
      sm: 'auto'
    }
  },
  NewsImage: {
    width: '100%'
  },
  NewsGoBack: {
    mt: {
      xs: 2,
      sm: 3
    },
    width: {
      xs: '100%',
      md: 'auto'
    }
  },
  SeeAlsoBox: {
    position: 'sticky',
    top: '84px'
  },
  SeeAlsoButton: {
    mb: 2,
    width: '100%',
    '&:last-of-type': {
      mb: 0
    }
  },
  SeeAlsoCard: {
    width: '100%'
  },
  SeeAlsoCardMedia: {
    height: {
      xs: '200px',
      sm: '360px',
      md: '220px'
    }
  },
  LoremHeader: {
    mt: 3,
    mb: 1,
  },
  LoremParagraph: {
    color: 'grey.600'
  },
  ColorPrimary: {
    color: blue[700]
  }
}

export default Styles;
