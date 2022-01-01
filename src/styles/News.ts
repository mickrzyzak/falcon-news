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
  NewsButtonBase: {
    height: '100%',
    width: '100%'
  },
  NewsCard: {
    height: '100%',
    width: '100%'
  },
  NewsCardMedia: {
    objectPosition: {
      xs: 'center',
      md: 'top center'
    },
    height: {
      xs: '220px',
      sm: '360px',
      md: '260px'
    }
  },
  NewsTypographySubtitle2: {
    textTransform: 'uppercase'
  },
  NewsBox: {
    position: 'absolute',
    bottom: '24px'
  },
  NewsChipByLine: {
    mt: 1,
    mr: 1,
    cursor: 'pointer',
    '& .MuiChip-label': {
      whiteSpace: 'normal',
      lineHeight: 1
    }
  },
  NewsChipPublishedDate: {
    mt: 1,
    cursor: 'pointer'
  },
  NewsReadMore: {
    width: '100%',
    mt: {
      xs: 2,
      sm: 4
    }
  },
  DialogTitle: {
    lineHeight: 1.25
  }
}

export default Styles;
