import { useState, useContext, useEffect } from 'react'
import { find } from 'lodash'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import {
  ArrowBackIos as BackIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DashboardLayout from 'common/layout/dashboardLayout'
import request from 'utils/request'
import { SnackbarContext } from 'common/components/Snackbar'
import FormPaper from 'common/components/FormPaper'
import { useForm, useRoutes, unique, mediaBaseURL } from 'utils'
import { UserContext } from 'utils/sessions'
import APIRequest from 'utils/API'
import { PhotosInput } from '../../components' 
import { queryGetProducts, queryGetProjectById, mutationEditProject, mutationDeleteProject } from '../../constant'

const INITIAL_STATE = {
  name: '',
  location: '',
  type: '',
  date: '',
  desc: '',
  cover: '',
  photos: [],
  products: []
}

function ProductAddScreen() {
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const { values, setText, setArray, setAll } = useForm(INITIAL_STATE)
  const [posting, setPosting] = useState(false)
  const [productOption, setProductOption] = useState([])
  const [deletedFiles, setDeletedFiles] = useState([])
  const [selected, setSelected] = useState('')
  const { openSnackbar } = useContext(SnackbarContext)
  const { history, params } = useRoutes()

  useEffect(() => {
    request(queryGetProducts)
      .then(res => {
        const { getProducts, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getProducts) {
          setProductOption(getProducts)
        }
      })
      .catch(err => openSnackbar(err.message, 'error'))
    
    if (params.id) {
      request(queryGetProjectById, { id: params.id })
        .then(res => {
          const { getAdminProjectById, errors } = res.data.data
          if (errors) openSnackbar(errors.message, 'error')
          if (getAdminProjectById) {
            setAll({
              ...getAdminProjectById,
              photos: (getAdminProjectById.photos || []).filter(unique)
            })
          }
        })
        .catch(err => openSnackbar(err.message, 'error'))
    }
  }, [])

  const handleSubmit = (isDraft) => {
    setPosting(true)

    if (!isDraft && (values.photos.length < 1 || !values.cover)) {
      openSnackbar('Upload media to publish', 'error')
      return
    }
    const photos = (values.photos || []).filter(unique)
    const products = (values.products || []).filter(unique)

    const projectInput = {
      ...values,
      photos,
      products,
      isDraft,
      deletedFiles,
      justCreated: false,
      updatedBy: login._id
    }

    request(
      mutationEditProject,
      { projectInput }
    )
      .then(res => {
        if (res.data.errors) throw new Error(res.data.errors[0].message)
        const { editProject } = res.data.data
        const msg = `Project - ${editProject._id} is updated`

        openSnackbar(msg, 'success')
        setAll(editProject)
        setPosting(false)
      })
      .catch(err => {
        openSnackbar(err.message, 'error')
        setPosting(false)
      })
  }

  const handleBackToProject = () => {
    if (values.justCreated) {
      request(mutationDeleteProject, { id: params.id })
        .then(() => {
          history.push({ pathname: '/projects' })
        })
        .catch(err => openSnackbar(err.message, 'error'))
    } else history.push({ pathname: '/projects' })
  }

  const handleUploadCover = (file) => {
    setPosting(true)

    if (file) {
      const fileFormatName = `${values._id}-${file.name.split('.')[0]}`.replace(/ /g, '-')
      const formData = new FormData()
      
      formData.append('file', file)
      formData.append('fileName', fileFormatName)
      formData.append('bucketFolder', 'projectCover')

      APIRequest('POST', '/api/file-upload', formData)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
            setText({
              target: {
                name: 'cover',
                value: res.data.name
              }
            })
          }
          setPosting(false)
        })
    }
  }

  const deleteCover = (key) => {
    const newDeleted = deletedFiles
    newDeleted.push(key)
    setDeletedFiles(newDeleted)
    setText({
      target: {
        name: 'cover',
        value: ''
      }
    })
  }

  const addProduct = () => {
    if (selected) {
      setPosting(true)
      const newProducts = values.products
      newProducts.push(selected)
      setArray(newProducts, 'products')
      setSelected('')
      setPosting(false)
    }
  }

  const removeProduct = (i) => {
    setPosting(true)
    const newProducts = values.products
    newProducts.splice(i, 1)
    setArray(newProducts, 'products')
    setPosting(false)
  }

  return (
    <>
      <DashboardLayout>
        <Box mb={2} display="flex" alignItems="center" style={{ wordBreak: 'break-all' }}>
          <IconButton onClick={handleBackToProject}>
            <BackIcon />
          </IconButton>
          <Typography variant="h5">
            Project {values._id}
          </Typography>
        </Box>
        <FormPaper>
          <ValidatorForm
            onSubmit={() => handleSubmit(false)}
            onKeyPress={e => (e.which === 13) && e.preventDefault()}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box my={2}>
                      <Typography variant="h6">Information</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      name="location"
                      label="Location"
                      variant="outlined"
                      value={values.location}
                      onChange={setText}
                      validators={['required']}
                      errorMessages={['This field cannot be empty']}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      name="type"
                      label="Type"
                      variant="outlined"
                      value={values.type}
                      onChange={setText}
                      validators={['required']}
                      errorMessages={['This field cannot be empty']}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      name="date"
                      label="Date"
                      variant="outlined"
                      value={values.date}
                      onChange={setText}
                      validators={['required']}
                      errorMessages={['This field cannot be empty']}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      name="desc"
                      label="Description"
                      multiline
                      rows={5}
                      value={values.desc}
                      variant="outlined"
                      onChange={setText}
                      validators={['required']}
                      errorMessages={['This field cannot be empty']}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={1}> 
                <Divider orientation="vertical" style={{ margin: 'auto' }} />
              </Grid>
              <Hidden mdUp>
                <Grid item xs={12}> 
                  <Divider orientation="horizontal" style={{ margin: 'auto' }} />
                </Grid>
              </Hidden>
              <Grid item xs={12} md={6}>
                <Box my={2}>
                  <Typography variant="h6">Products Used</Typography>
                </Box>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={11}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="product-options">Product</InputLabel>
                      <Select
                        labelId="product-options"
                        name="selected"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        label="Category"
                      >
                        {productOption.map(option => (
                          <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={addProduct}
                      aria-label={`Add Product`}
                    >
                      <AddIcon color="primary" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  {values.products.map((product, i) => (
                    <Grid key={product} item xs={6}>
                      <Grid container spacing={0} alignItems="center">
                        <Grid item xs={11}>
                          {find(productOption, ['_id', product])?.name}
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            onClick={() => removeProduct(i)}
                            aria-label={`Add Product`}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Box my={4}>
              <Divider />
            </Box>
            <Box>
              <Box my={2}>
                <Typography variant="h6">Cover Photo</Typography>
              </Box>
              <Box display="flex" width="100%" justifyContent="center">
                <input
                  accept="image/*"
                  id="icon-button-cover"
                  type="file"
                  disabled={posting}
                  onChange={e => handleUploadCover(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                {!values.cover && (
                  <label htmlFor="icon-button-cover">
                    <Box
                      border={`1px solid ${!posting ? '#565656' : '#EFEFEF'}`}
                      borderRadius="20px"
                      bgcolor="#FFFFFF"
                      height="120px"
                      width="180px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ cursor: !posting ? 'pointer' : 'no-drop' }}
                      color={!posting ? '#565656' : '#EFEFEF'}
                      mt={3}
                    >
                      <AddIcon />
                    </Box>
                  </label>
                )}
                {values.cover && (
                  <Box
                    width="100%"
                    position="relative"
                  >
                    <img width="100%" src={`${mediaBaseURL}${encodeURIComponent(values.cover)}`} />
                    <IconButton
                      onClick={() => deleteCover(values.cover)}
                      aria-label={`Delete`}
                      style={{
                        padding: 0,
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
            <Box my={4}>
              <Divider />
            </Box>
            <Box>
              <Box my={2}>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                  Project Photos
                  <Typography variant="caption"> (Maximum 10 photos)</Typography>
                </Typography>
              </Box>
              <Box width="100%">
                <PhotosInput
                  photos={values.photos}
                  id={values._id}
                  posting={posting}
                  setPosting={setPosting}
                  setArray={setArray}
                  deletedFiles={deletedFiles}
                  setDeletedFiles={setDeletedFiles}
                />
              </Box>
            </Box>
            <Box my={4}>
              <Divider />
            </Box>
            <Box width="100%" textAlign="right">
              <Box>
                <Typography variant="caption">All fields must be filled to publish.</Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleSubmit(true)}
                color="primary"
                disabled={posting}
                style={{ marginBottom: '10px' }}
              >
                {posting
                  ? <CircularProgress size={14} />
                  : 'Save Draft'}
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={posting || !values.cover || values.photos.length < 1 || values.products.length < 1}
                style={{ marginLeft: '10px', marginBottom: '10px' }}
              >
                {posting
                  ? <CircularProgress size={14} />
                  : 'Publish'}
              </Button>
            </Box>
          </ValidatorForm>
        </FormPaper>
      </DashboardLayout>
    </>
  )
}

export default ProductAddScreen
