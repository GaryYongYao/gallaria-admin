import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Typography, Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { UserContext } from 'utils/sessions'

import { primaryColor } from 'common/colors'

const useStyles = makeStyles(theme => ({
  container: {
    ...theme.custom.authLayoutContainer,
  },
  loginBox: {
    width: '350px',
    maxWidth: '350px',
    padding: theme.spacing(3),
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: '10px'
  },
  button: {
    width: '100%',
    marginLeft: '5px',
    marginRight: '5px'
  }
}))

function LoginScreen() {
  const { container, loginBox, button } = useStyles()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const { login, checkLogin } = useContext(UserContext)

  useEffect(checkLogin, [])

  const handleSubmit = () => {
    login(user, password)
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={container} style={{ backgroundColor: primaryColor }}>
      <Box className={loginBox}>
        <Box mt={2} mb={2}>
          <Typography variant="h5">Login</Typography>
        </Box>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            label="Username"
            variant="outlined"
            value={user}
            onChange={e => setUser(e.target.value)}
            validators={['required']}
            errorMessages={['This field cannot be empty']}
            fullWidth
          />
          <TextValidator
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            validators={['required']}
            errorMessages={['This field cannot be empty']}
            fullWidth
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={button}
            >
              Login
            </Button>
          </Box>
        </ValidatorForm>
      </Box>
    </Grid>
  )
}

export default LoginScreen
