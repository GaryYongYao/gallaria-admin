import { useState, useContext } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
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

function SupplierAddScreen() {
  const { values, setText, emptyState } = useForm({
    name: '',
    contact: '',
    address: ''
  })
  const [posting, setPosting] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const { history } = useRoutes()

  const handleSubmit = () => {
    setPosting(true)
    request('POST', '/api/supplier', { supplier: values })
      .then(res => {
        if (res.errors) {
          openSnackbar('Error occurs', 'error')
          setPosting(false)
        } else {
          openSnackbar(`Supplier (${res.data.name}) Added`, 'success')
          emptyState({
            name: '',
            contact: '',
            address: ''
          })
          setPosting(false)
        }
      })
  }

  return (
    <>
      <DashboardLayout>
        <Box mb={2}>
          <IconButton onClick={() => history.push({ pathname: '/supplier' })}>
            <BackIcon />
          </IconButton>
        </Box>
        <FormPaper>
          <Box mb={2}>
            <Typography variant="h5">New Supplier</Typography>
          </Box>
          <ValidatorForm onSubmit={() => handleSubmit()}>
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
              name="contact"
              label="Contact"
              variant="outlined"
              value={values.contact}
              onChange={setText}
              validators={['required']}
              errorMessages={['This field cannot be empty']}
              fullWidth
            />
            <TextValidator
              name="address"
              label="Address"
              variant="outlined"
              multiline
              rows={5}
              value={values.address}
              onChange={setText}
              fullWidth
            />
            <Divider />
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

export default SupplierAddScreen
