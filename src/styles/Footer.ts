import { grey } from '@mui/material/colors';

const Styles: any = {
  FooterContainer: {
    py: {
      xs: 3,
      sm: 2
    },
    mt: 'auto',
    bgcolor: 'grey.300',
    borderTop: 1,
    borderColor: grey[600]
  },
  FooterContainer2: {
    px: {
      xs: 1,
      sm: 2
    }
  },
  FooterStack: {
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'center',
      sm: 'flex-end'
    },
    justifyContent: 'space-between'
  },
  FooterBox: {
    textAlign: {
      xs: 'center',
      sm: 'right'
    },
    mt: {
      xs: 2,
      sm: 0
    }
  },
  FooterLink: {
    display: 'block',
    width: '200px',
    height: '40px',
    mx: {
      xs: 'auto',
      sm: 0
    }
  }
}

export default Styles;
