import { createMuiTheme } from '@material-ui/core/styles'
import { primaryColor, lightGrey, lightGreyO } from './colors'

const theme = createMuiTheme({
  overrides: {
    MuiAutocomplete: {
      paper: {
        backgroundColor: '#FFFFFF !important'
      }
    },
    MuiFormControl: {
      root: {
        margin: '8px 0px',
      },
    },
    MuiPickersBasePicker: {
      container: {
        backgroundColor: '#FFFFFF'
      }
    },
    MuiFormLabel: {
      root: {
        color: '#707070',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1,
        '&.Mui-focused': {
          color: '#707070',
        },
      },
    },
    MuiInputBase: {
      input: {
        color: '#1a1a1a',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1
      },
      root: {
        '&.Mui-disabled': {
          backgroundColor: '#EFEFEF',
        }
      }
    },
    MuiFormControlLabel: {
      root: {
        color: '#707070'
      }
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(0, 1.5px) scale(0.9)'
      }
    },
    MuiListItemText: {
      primary: {
        color: '#1a1a1a',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1
      },
    },
    MuiFormHelperText: {
      root: {
        lineHeight: '1.3em',
        color: '#707070'
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid #e4e4e4',
        },
        '&:after': {
          borderBottom: `1px solid ${primaryColor}`,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid ${primaryColor}`,
        }
      },
    },
    MuiButton: {
      root: {
        fontSize: '0.875rem',
        fontWeight: 700,
        lineHeight: 1.75,
        textTransform: 'inherit',
        minWidth: 85,
        'text-transform': 'uppercase'
      },
      sizeSmall: {
        'text-transform': 'none'
      },
      contained: {
        boxShadow: 'none',
        '&.Mui-disabled': {
          backgroundColor: lightGreyO,
          color: lightGrey
        }
      },
      outlinedSizeSmall: {
        padding: '2.7px 9px'
      },
    },
    MuiCard: {
      root: {
        boxShadow: '0px 3px 6px #0000000A',
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
        color: '#707070',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
        color: '#707070',
      },
      h2: {
        fontSize: '3.75rem',
        fontWeight: 100,
        lineHeight: 1,
        color: '#707070',
      },
      h3: {
        fontSize: '3rem',
        fontWeight: 400,
        lineHeight: 1.17,
        color: '#707070',
      },
      h4: {
        fontSize: '2.125rem',
        fontWeight: 600,
        lineHeight: 1.17,
        color: '#707070',
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.33,
        letterSpacing: '0em',
        color: '#707070',
      },
      h6: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
        color: '#303030',
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        color: '#707070',
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em'
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        color: '#707070'
      },
    },

    MuiTable: {
      root: {
        borderCollapse: 'collapse',
      }
    },

    MuiTableContainer: {
      root: {
        padding: '10px'
      }
    },

    MuiTableRow: {
      root: {
        '&:last-child': {
          '& .MuiTableCell-body': {
            border: 'none'
          }
        },
        '& .MuiTableCell-body': {
          borderBottom: '1px solid rgb(239, 238, 238)'
        },
        '&:first-child': {
          height: '0 !important',
          '& .MuiTableCell-body': {
            borderBottom: 'none',
            display: 'none'
          }
        }
      }
    },

    MuiTableHead: {
      root: {
        '& .MuiTableRow-head': {
          borderRadius: '5px',
          boxShadow: '0px 0px 1px -2px rgba(0,0,0,0.2), 0px 0px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        },

        '&:after': {
          lineHeight: '1em',
          content: "'&nbsp;'",
          textIndent: '-99999px',
          display: 'block',
        }
      }
    },

    MuiTableBody: {
      root: {
        borderRadius: '5px',
        boxShadow: '0px 5px 5px -2px rgba(0,0,0,0.2), 0px 1px 2px 0px rgba(0,0,0,0.14), 0px 2px 5px 0px rgba(0,0,0,0.12)',
        backgroundColor: '#FFFFFF',
      }
    },

    MuiDrawer: {
      paper: {
        backgroundColor: '#FAFAFA'
      }
    },

    MuiTableCell: {
      head: {
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 'bold',
        border: 'none'
      },
      root: {
        borderBottom: 0
      }
    },

    MuiSwitch: {
      root: {
        transform: 'scale(0.7)',
        width: 37,
        height: 21,
        padding: 0,
        margin: 10,
      },

      thumb: {
        backgroundColor: 'white',
        width: 19,
        height: 19,
      },

      track: {
        border: 'none',
        borderRadius: 26 / 2,
      },

      switchBase: {
        padding: 1,
        color: 'white',
        '&$checked': {
          transform: 'translateX(16px)',
          '& + $track': {
            opacity: 1,
          },
        },
      },
    },

    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent'
        } 
      }
    },

    MuiPopover: {
      paper: {
        boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.05), 0px 4px 7px 1px rgba(0, 0, 0, 0.01), 0px 3px 5px 1px rgba(0,0,0,0.12)',
      }
    },

    MuiCheckbox: {
      root: {
        color: '#acacac',
      }
    },

    MuiDivider: {
      root: {
        margin: '20px 0'
      }
    },

    MuiRadio: {
      root: {
        color: '#acacac',
        borderWidth: 0.5,
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: 8
      },
      elevation2: {
        boxShadow: 'initial',
        '& [class^="Component-horizontalScrollContainer-"]': {
          overflowX: 'visible !important',
          '& > div > div': {
            overflowY: 'visible !important',
          }
        }
      },
      root: {
        backgroundColor: 'transparent'
      }
    }
  },
  palette: {
    primary: { main: primaryColor, text: '#707070' },
    secondary: { main: '#12a340' },
    error: { main: '#ff5a5f', text: '#707070' }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Helvetica',
    htmlFontSize: 14,
  },
  custom: {
    authLayoutContainer: {
      minHeight: '100vh',
    },
  },
})

export default theme
