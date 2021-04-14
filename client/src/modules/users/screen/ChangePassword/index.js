import { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button, Box } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DashboardLayout from 'common/layout/dashboardLayout'
import request from 'utils/request'
import { UserContext } from 'utils/sessions'
import { useRoutes } from 'utils'
import { SnackbarContext } from 'common/components/Snackbar'
import { mutationChangePassword } from '../../constant'

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
  }
}))

function ChangePasswordScreen() {
  const { button } = useStyles()
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { history } = useRoutes()
  const { openSnackbar } = useContext(SnackbarContext)

  const handleSubmit = () => {
    request(mutationChangePassword, {
      id: login._id,
      password,
      confirm: confirmPassword
    })
      .then(res => {
        const { changePassword } = res.data.data
        openSnackbar(
          changePassword,
          'success'
        )
        history.goBack()
      })
      .catch(err => {
        openSnackbar(
          err.message,
          'error'
        )
      })
  }

  ValidatorForm.addValidationRule('isPasswordMatch', (match) => {
    if (match !== password) {
      return false
    }
    return true
  })

  return (
    <>
      <DashboardLayout>
        <Box mb={2}>
          <Typography variant="h5">Change Password</Typography>
        </Box>
        <ValidatorForm onSubmit={() => handleSubmit()}>
          <TextValidator
            label="Username"
            variant="outlined"
            value={login.username}
            disabled
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
          <TextValidator
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['This field cannot be empty', 'Password mismatch']}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={button}
          >
            Change Password
          </Button>
        </ValidatorForm>
      </DashboardLayout>
    </>
  )
}

export default ChangePasswordScreen
