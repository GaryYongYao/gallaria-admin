import { useState, useContext, useEffect } from 'react'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Switch,
  Tooltip,
  Typography
} from '@material-ui/core'
import {
  ArrowBackIos as BackIcon,
  Help as InfoIcon
} from '@material-ui/icons'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DashboardLayout from 'common/layout/dashboardLayout'
import request from 'utils/request'
import APIRequest from 'utils/API'
import { SnackbarContext } from 'common/components/Snackbar'
import FileUpload from 'common/components/FileUpload'
import FormPaper from 'common/components/FormPaper'
import { mediaBaseURL, useForm, useRoutes } from 'utils'
import { UserContext } from 'utils/sessions'
import { CategoriesPicker, DetailsInput, FeaturesInput, PhotosInput } from '../../components'
import { queryCheckProductCode, queryGetProductById, mutationCreateProduct, mutationEditProduct } from '../../constant'

const INITIAL_STATE = {
  code: '',
  name: '',
  price: 0,
  desc: '',
  variants: [],
  category: '',
  sub: '',
  details: [],
  tags: [],
  isFeature: false,
  forSale: false,
  file: '',
  fileFile: {},
  images: [],
  primaryImage: '',
  features: []
}

function ProductAddScreen() {
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const { values, setText, setSwitch, setArray, setAll, emptyState } = useForm(INITIAL_STATE)
  const [posting, setPosting] = useState(false)
  const [invalidCode, setInvalidCode] = useState(null)
  const { openSnackbar } = useContext(SnackbarContext)
  const { history, params } = useRoutes()

  useEffect(() => {
    if (params.id) {
      request(queryGetProductById, { id: params.id })
        .then(res => {
          const { getProductById, errors } = res.data.data
          if (errors) openSnackbar(errors.message, 'error')
          if (getProductById) setAll(getProductById)
        })
        .catch(err => openSnackbar(err.message, 'error'))
    }
  }, [])
  
  const handleUploadFile = (file) => {
    setPosting(true)

    if (file) {
      const fileFormatName = `${values.code}-${file.name.split('.')[0]}`.replace(/ /g, '-')
      const document = new FormData()
      
      document.append('file', file)
      document.append('fileName', fileFormatName)
      document.append('bucketFolder', 'productDoc')

      APIRequest('POST', '/api/file-upload', formData)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
            setText({
              target: {
                name: 'file',
                value: res.data.Key
              }
            })
          }
          setPosting(false)
        })
    }
  }

  const handleDeleteFile = () => {
    deleteFile()
  }

  const deleteFile = () => {
    const formData = new FormData()
    formData.append('key', values.file)
    setPosting(true)

    APIRequest('POST', '/api/file-delete', formData)
      .then(res => {
        if (res.errors) {
          openSnackbar('Deletion failed!', 'error')
        } else {
          openSnackbar('Deletion Success', 'success')
          setText({
            target: {
              name: 'file',
              value: ''
            }
          })
          document.getElementById('icon-button-file').value = ''
        }
        setPosting(false)
      })
  }

  const checkCodeAvailability = () => {
    request(queryCheckProductCode, { id: params.id, code: values.code })
      .then(res => {
        const { checkProductCode } = res.data.data
        setInvalidCode(checkProductCode)
      })
      .catch(err => {
        openSnackbar(err.message, 'error')
      })
  }

  const handleSubmit = (isDraft) => {
    setPosting(true)
    const productInput = {
      ...values,
      price: parseFloat(values.price),
      details: values.details.filter( detail => (detail.title && detail.info)),
      isDraft,
      createdBy: login._id,
      updatedBy: login._id
    }

    if (params.id) delete productInput.createdBy

    request(
      params.id ? mutationEditProduct : mutationCreateProduct,
      params.id ? { productUpdate: productInput } : { productInput }
    )
      .then(res => {
        const { createProduct, editProduct } = res.data.data
        const msg = (params.id) ? `Product - ${editProduct.name} is updated` : `Product - ${createProduct.name} is created`

        openSnackbar(msg, 'success')
        if (!params.id) {
          emptyState(INITIAL_STATE)
          history.push({ pathname: '/products' })
        }
        if (params.id) setAll(editProduct)
        setPosting(false)
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
          <IconButton onClick={() => history.push({ pathname: '/products' })}>
            <BackIcon />
          </IconButton>
          <Typography variant="h5">
            {(params.id) ? 'Edit Product' : 'New Product'}
          </Typography>
        </Box>
        <FormPaper>
          <ValidatorForm
            onSubmit={() => handleSubmit(false)}
            onKeyPress={e => (e.which === 13) && e.preventDefault()}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box my={2}>
                  <Typography variant="h6">Information</Typography>
                </Box>
                <Grid container justify="center" spacing={4}>
                  <Grid item xs={6}>
                    <TextValidator
                      error={invalidCode}
                      helperText={(invalidCode) ? 'Code Existed' : invalidCode !== null ? 'Code Available' : ''}
                      onBlur={checkCodeAvailability}
                      name="code"
                      label="Code"
                      variant="outlined"
                      value={values.code}
                      onChange={setText}
                      validators={['required']}
                      errorMessages={['This field cannot be empty']}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      name="price"
                      label="Price"
                      variant="outlined"
                      value={values.price}
                      type="number"
                      onChange={setText}
                      validators={['required']}
                      errorMessages={['This field cannot be empty']}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <CategoriesPicker
                  category={values.category}
                  sub={values.sub}
                  setText={setText}
                />
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
                  name="desc"
                  label="Description"
                  multiline
                  rows={5}
                  value={values.desc}
                  variant="outlined"
                  onChange={setText}
                  validators={['required']}
                  fullWidth
                />
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Variants</InputLabel>
                      <OutlinedInput
                        name="variants"
                        labelWidth={60}
                        onKeyPress={e => {
                          if (e.which !== 13 || e.target.value === '') return
                          const newVariant = values.variants
                          newVariant.push(e.target.value)
                          setArray(newVariant, e.target.name)
                          e.target.value = ''
                        }}
                        onBlur={e => {
                          if (e.target.value === '') return
                          const newVariant = values.variants
                          newVariant.push(e.target.value)
                          setArray(newVariant, e.target.name)
                          e.target.value = ''
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <Tooltip title="Press Enter to add variant" aria-label="add">
                              <InfoIcon color="primary" />
                            </Tooltip>
                          </InputAdornment>
                        }
                        fullWidth
                      />
                    </FormControl>
                    <FileUpload
                      title="Document"
                      accept="application/pdf"
                      disabled={!values.code || invalidCode}
                      posting={posting}
                      handleDeleteFile={handleDeleteFile}
                      handleUpload={handleUploadFile}
                      selectedFile={values.file}
                      preview={(typeof image !== 'object') ? `url(${mediaBaseURL}${encodeURIComponent(values.file)})` : `url(${URL.createObjectURL(values.file)})`}
                      helperText="Enter the product code before uploading the files"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      {values.variants.map((variant, index) => (
                        <Chip
                          key={variant}
                          label={variant}
                          onDelete={() => {
                            const oldVariant = values.variants
                            const newVariant = oldVariant.filter((old, oldIndex) => oldIndex !== index)
                            setArray(newVariant, 'variants')
                          }}
                          style={{ margin: '2.5px 5px' }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}> 
                <Divider orientation="vertical" style={{ margin: 'auto' }} />
              </Grid>
              <Grid item xs={5}>
                <Box my={2} display="flex" justifyContent="space-between" >
                  <Typography variant="h6">Details</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={posting}
                    onClick={() => {
                      const newDetails = values.details
                      if (newDetails.length > 0) {
                        if (!(newDetails[newDetails.length - 1].title && newDetails[newDetails.length - 1].info)) return
                      }
                      newDetails.push({ title: '', info: '' })
                      setArray(newDetails, 'details')
                    }}
                  >
                    {posting
                      ? <CircularProgress size={14} />
                      : 'Add Details'}
                  </Button>
                </Box>
                <DetailsInput posting={posting} details={values.details} setArray={setArray} />
              </Grid>
            </Grid>
            <Box my={4}>
              <Divider />
            </Box>
            <PhotosInput
              images={values.images}
              primaryImage={values.primaryImage}
              code={values.code}
              posting={posting}
              invalidCode={invalidCode}
              setPosting={setPosting}
              setText={setText}
              setArray={setArray}
            />
            <Box my={4}>
              <Divider />
            </Box>
            <FeaturesInput
              features={values.features}
              code={values.code}
              posting={posting}
              invalidCode={invalidCode}
              setPosting={setPosting}
              setText={setText}
              setArray={setArray}
            />
            <Box my={4}>
              <Divider />
            </Box>
            <Box my={2}>
              <Typography variant="h6">Management</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Tags</InputLabel>
                  <OutlinedInput
                    name="tags"
                    labelWidth={60}
                    onKeyPress={e => {
                      if (e.which !== 13 || e.target.value === '') return
                      const newTag = values.tags
                      newTag.push(e.target.value)
                      setArray(newTag, e.target.name)
                      e.target.value = ''
                    }}
                    onBlur={e => {
                      if (e.target.value === '') return
                      const newTag = values.tags
                      newTag.push(e.target.value)
                      setArray(newTag, e.target.name)
                      e.target.value = ''
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip title="Press Enter to add tag (Tags are for tagging similar products, and multiple tags are allowed)" aria-label="add">
                          <InfoIcon color="primary" />
                        </Tooltip>
                      </InputAdornment>
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormGroup
                  row
                  style={{
                    padding: '0 10px',
                    margin: '8px 0px',
                    justifyContent: 'flex-end'
                  }}
                >
                  <FormControlLabel
                    control={<Switch checked={values.isFeature} onChange={setSwitch} name="isFeature" color="primary" />}
                    label="Feature Product"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={<Switch checked={values.forSale} onChange={setSwitch} name="forSale" color="primary" />}
                    label="Allow Purchase"
                    labelPlacement="start"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Box>
              {values.tags.map((tag, index) => (
                <Chip
                  label={tag}
                  onDelete={() => {
                    const oldTag = values.tags
                    const newTag = oldTag.filter((old, oldIndex) => oldIndex !== index)
                    setArray(newTag, 'tags')
                  }}
                  style={{ margin: '2.5px 5px' }}
                />
              ))}
            </Box>
            <Box my={4}>
              <Divider />
            </Box>
            <Box width="100%" textAlign="right">
              <Button
                variant="contained"
                onClick={() => handleSubmit(true)}
                color="primary"
                disabled={posting || !values.code}
                style={{ marginRight: '10px' }}
              >
                {posting
                  ? <CircularProgress size={14} />
                  : 'Save Draft'}
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={posting || !values.code}
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
