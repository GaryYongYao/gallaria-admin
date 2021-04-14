import { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { UserContext } from 'utils/sessions'

import { appColor } from 'common/colors'
import logo from 'common/img/logo.png'

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
    <Grid container direction="column" alignItems="center" className={container} style={{ backgroundColor: appColor }}>
      <Box mt={20} mb={6}>
        <img src={logo} width="300px" />
      </Box>
      <Box className={loginBox}>
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
          <Box display="flex" justifyContent="space-between" mt={3}>
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
