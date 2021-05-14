import { useEffect, useState, useContext } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  ArrowBackIos as BackIcon,
} from '@material-ui/icons'
import GoogleMapReact from 'google-map-react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DashboardLayout from 'common/layout/dashboardLayout'
import request from 'utils/request'
import { SnackbarContext } from 'common/components/Snackbar'
import FormPaper from 'common/components/FormPaper'
import { useForm, useRoutes } from 'utils'
import APIRequest from 'utils/API'
import { queryGetLocationById, mutationCreateLocation, mutationEditLocation } from '../constant'

const INITIAL_STATE = {
  name: '',
  address: '',
  phone: '',
  website: '',
  position: [-25.274398, 133.775136],
}

function UserAddScreen() {
  const { values, setText, setAll, emptyState } = useForm(INITIAL_STATE)
  const [posting, setPosting] = useState(false)
  const [zoom, setZoom] = useState(16)
  const { openSnackbar } = useContext(SnackbarContext)
  const { history, params } = useRoutes()

  useEffect(() => {
    if (params.id) {
      request(queryGetLocationById, { id: params.id })
        .then(res => {
          const { getLocationById, errors } = res.data.data
          if (errors) openSnackbar(errors.message, 'error')
          if (getLocationById) {
            setAll(getLocationById)
          }
        })
        .catch(err => openSnackbar(err.message, 'error'))
    }
  }, [])

  const handleSubmit = () => {
    setPosting(true)
    console.log(values)

    const locationInput = {
      ...values
    }

    request(
      params.id ? mutationEditLocation : mutationCreateLocation,
      params.id ? { locationUpdate: locationInput } : { locationInput }
    )
      .then(res => {
        if (res.data.errors) throw new Error(res.data.errors[0].message)
        const { createLocation, editLocation } = res.data.data
        const msg = (params.id) ? `Location - ${editLocation.name} is updated` : `Location - ${createLocation.name} is created!`

        openSnackbar(msg, 'success')
        if (!params.id) {
          emptyState(INITIAL_STATE)
          history.push({ pathname: '/showrooms' })
        }
        if (params.id) setAll(editLocation)
      })
      .catch(err => {
        openSnackbar(err.message, 'error')
        setPosting(false)
      })
  }

  const geocoding = () => {
    if (!values.address || values.address === '') {
      alert('You must enter address to geocode')
      return
    }
    setPosting(true)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(values.address)}&key=${process.env.REACT_APP_GOOGLE_API}`

    APIRequest('GET', url)
      .then(res => {
        const { results } = res.data
        const { lat, lng } = results[0].geometry.location
        setText({
          target: {
            name: 'position',
            value: [lat, lng]
          }
        })
        setZoom(16)
        setPosting(false)
      })
  }

  return (
    <>
      <DashboardLayout>
        <Box mb={2} display="flex" alignItems="center">
          <IconButton onClick={() => history.push({ pathname: '/showrooms' })}>
            <BackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5">{params.id ? values.name : 'New Category'}</Typography>
          </Box>
        </Box>
        <FormPaper>
          <ValidatorForm
            onSubmit={handleSubmit}
            onKeyPress={e => (e.which === 13) && e.preventDefault()}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} md={6}>
                <TextValidator
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  value={values.phone}
                  onChange={setText}
                  validators={['required']}
                  errorMessages={['This field cannot be empty']}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextValidator
                  name="website"
                  label="Website"
                  variant="outlined"
                  value={values.website}
                  onChange={setText}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box> 
              <Divider orientation="horizontal" style={{ margin: 'auto' }} />
            </Box>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={10}>
                <TextValidator
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={values.address}
                  onChange={setText}
                  validators={['required']}
                  errorMessages={['This field cannot be empty']}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={posting}
                  onClick={geocoding}
                >
                  {posting
                    ? <CircularProgress size={14} />
                    : 'Geo Code'}
                </Button>
              </Grid>
              <Grid item xs={12} style={{ height: '400px' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
                  options={{
                    mapTypeControl: false,
                    streetViewControl: false
                  }}
                  zoom={zoom}
                  center={values.position}
                >
                  <img
                    src="/marker.svg"
                    lat={values.position[0]}
                    lng={values.position[1]}
                    height="40px"
                    width="40px"
                    style={{
                      position: 'absolute',
                      transform: 'translate(-50%, -100%)'
                    }}
                  />
                </GoogleMapReact>
              </Grid>
            </Grid>
            <Box my={3}> 
              <Divider orientation="horizontal" />
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
