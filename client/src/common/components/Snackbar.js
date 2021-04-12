import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}))

export const CustomSnackbar = () => {
  const classes = useStyles()
  const { snackbarContext, closeSnackbar } = useContext(SnackbarContext)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackbarContext.open}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={snackbarContext.message}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={closeSnackbar}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    >
      <Alert onClose={closeSnackbar} severity={snackbarContext.severity}>
        {snackbarContext.message}
      </Alert>
    </Snackbar>
  )
}

export const SnackbarContextProvider = ({ children }) => {
  const [snackbarContext, setSnackbarContext] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  })

  const snackbarValue = {
    snackbarContext,
    openSnackbar: (message, severity) => setSnackbarContext({
      open: true,
      message,
      severity
    }),
    closeSnackbar: () => setSnackbarContext({
      open: false,
      message: '',
      severity: 'info'
    })
  }

  return (
    <SnackbarContext.Provider value={snackbarValue}>
      {children}
    </SnackbarContext.Provider>
  )
}

export const SnackbarContext = React.createContext()
