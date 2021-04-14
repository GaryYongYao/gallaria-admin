import { useState, useContext } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import {
  ArrowBackIos as BackIcon
} from '@material-ui/icons'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DashboardLayout from 'common/layout/dashboardLayout'
import request from 'utils/request'
import { SnackbarContext } from 'common/components/Snackbar'
import FormPaper from 'common/components/FormPaper'
import { useForm, useRoutes } from 'utils'
import { UserContext } from 'utils/sessions'
import { userRoles, mutationCreateUser } from '../../constant'

function UserAddScreen() {
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const { values, setText } = useForm({
    username: '',
    role: 'user'
  })
  const [posting, setPosting] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const { history } = useRoutes()

  const handleSubmit = () => {
    setPosting(true)
    const { username, role } = values

    request(mutationCreateUser, {
      userInput: {
        username,
        role,
        createdBy: login._id
      }
    })
      .then(res => {
        const { createUser } = res.data.data
        openSnackbar(
          `User ${createUser.username} is created!`,
          'success'
        )
        setPosting(false)
        history.push({ pathname: '/users' })
      })
      .catch(err => {
        openSnackbar(err.message, 'error')
        setPosting(false)
      })
  }

  return (
    <>
      <DashboardLayout>
        <Box mb={2} display="flex" alignItems="center">
          <IconButton onClick={() => history.push({ pathname: '/users' })}>
            <BackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5">New User</Typography>
          </Box>
        </Box>
        <FormPaper>
          <ValidatorForm onSubmit={() => handleSubmit()}>
            <TextValidator
              name="username"
              label="Username"
              variant="outlined"
              value={values.username}
              onChange={setText}
              validators={['required']}
              errorMessages={['This field cannot be empty']}
              fullWidth
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="role-options">Role</InputLabel>
              <Select
                labelId="role-options"
                name="role"
                value={values.role}
                onChange={setText}
                label="Role"
              >
                {userRoles.map(role => (
                  <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box width="100%" textAlign="right">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={posting}
              >
                {posting
                  ? <CircularProgress size={14} />
                  : 'Save'}
              </Button>
            </Box>
          </ValidatorForm>
        </FormPaper>
      </DashboardLayout>
    </>
  )
}

export default UserAddScreen
