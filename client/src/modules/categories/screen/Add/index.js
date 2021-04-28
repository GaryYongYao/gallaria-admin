import { useState, useContext } from 'react'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
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
import { mutationCreateCategory } from '../../constant'

function UserAddScreen() {
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const { values, setText, setArray } = useForm({
    name: '',
    sub: []
  })
  const [posting, setPosting] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const { history } = useRoutes()

  const handleSubmit = () => {
    setPosting(true)
    const { name, sub } = values

    request(mutationCreateCategory, {
      categoryInput: {
        name,
        sub,
        createdBy: login._id,
        updatedBy: login._id
      }
    })
      .then(res => {
        if (res.data.errors) throw new Error(res.data.errors[0].message)
        const { createCategory } = res.data.data
        openSnackbar(
          `Category - ${createCategory.name} is created!`,
          'success'
        )
        setPosting(false)
        history.push({ pathname: '/categories' })
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
          <IconButton onClick={() => history.push({ pathname: '/categories' })}>
            <BackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5">New Category</Typography>
          </Box>
        </Box>
        <FormPaper>
          <ValidatorForm
            onSubmit={handleSubmit}
            onKeyPress={e => (e.which === 13) && e.preventDefault()}
          >
            <TextValidator
              name="name"
              label="Name"
              variant="outlined"
              value={values.name}
              onChange={setText}
              validators={['required']}
              errorMessages={['This field cannot be empty']}
              fullWidth
            />
            <TextValidator
              name="sub"
              label="Sub-Categories"
              helperText="Enter to add sub-category"
              onKeyPress={e => {
                if (e.which !== 13 || e.target.value === '') return
                const newSubs = values.sub
                newSubs.push(e.target.value)
                setArray(newSubs, e.target.name)
                e.target.value = ''
              }}
              onBlur={e => {
                if (e.target.value === '') return
                const newSubs = values.sub
                newSubs.push(e.target.value)
                setArray(newSubs, e.target.name)
                e.target.value = ''
              }}
              variant="outlined"
              fullWidth
            />
            <Box>
              {values.sub.map((item, index) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => {
                    const oldSubs = values.sub
                    const newSubs = oldSubs.filter((old, oldIndex) => oldIndex !== index)
                    setArray(newSubs, 'sub')
                  }}
                  style={{ margin: '2.5px 5px' }}
                />
              ))}
            </Box>
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
