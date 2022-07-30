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
  Hidden,
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
import { SnackbarContext } from 'common/components/Snackbar'
import FormPaper from 'common/components/FormPaper'
import { useForm, useRoutes, useBreakpointUpCheck, unique } from 'utils'
import { UserContext } from 'utils/sessions'
import { CategoriesPicker, DetailsInput, FeaturesInput, PhotosInput, FilesInput } from '../../components'
import { queryCheckProductCode, queryGetProductById, mutationCreateProduct, mutationEditProduct } from '../../constant'

const INITIAL_STATE = {
  code: '',
  name: '',
  price: 0,
  desc: '',
  variants: [],
  altCode: [],
  category: '',
  sub: '',
  series: '',
  details: [],
  tags: [],
  isFeature: false,
  forSale: false,
  file: [],
  images: [],
  primaryImage: '',
  featureImage: '',
  features: [],
  link3d: '',
  priceDesc: '',
  isArchive: false,
  size: {
    w: 0,
    h: 0,
    d: 0
  }
}

function ProductAddScreen() {
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const { values, setText, setSwitch, setArray, setAll, emptyState } = useForm(INITIAL_STATE)
  const [posting, setPosting] = useState(false)
  const [deletedFiles, setDeletedFiles] = useState([])
  const [invalidCode, setInvalidCode] = useState(null)
  const { openSnackbar } = useContext(SnackbarContext)
  const { history, params } = useRoutes()

  useEffect(() => {
    if (params.id) {
      request(queryGetProductById, { id: params.id })
        .then(res => {
          const { getProductById, errors } = res.data.data
          if (errors) openSnackbar(errors.message, 'error')
          if (getProductById) {
            setAll({
              ...getProductById,
              images: (getProductById.images || []).filter(unique),
              altCode: getProductById.altCode || []
            })
          }
        })
        .catch(err => openSnackbar(err.message, 'error'))
    }
  }, [])

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
    console.log(values)
    
    const images = (values.images || []).filter(unique)

    const productInput = {
      ...values,
      images,
      category: values.category || null,
      price: parseFloat(values.price),
      details: values.details.filter( detail => (detail.title && detail.info)),
      isDraft,
      deletedFiles,
      createdBy: login._id,
      updatedBy: login._id
    }

    if (params.id) delete productInput.createdBy
    else delete productInput.deletedFiles

    request(
      params.id ? mutationEditProduct : mutationCreateProduct,
      params.id ? { productUpdate: productInput } : { productInput }
    )
      .then(res => {
        if (res.data.errors) throw new Error(res.data.errors[0].message)
        const { createProduct, editProduct } = res.data.data
        const msg = (params.id) ? `Product - ${editProduct.name} is updated` : `Product - ${createProduct.name} is created`

        openSnackbar(msg, 'success')
        if (!params.id) {
          emptyState(INITIAL_STATE)
          history.push({ pathname: '/products' })
        }
        if (params.id) setAll(editProduct)
        setPosting(false)
        setDeletedFiles([])
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
            onKeyPress={e => (e.which === 13 && e.target?.nodeName !== 'TEXTAREA') && e.preventDefault()}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box my={2}>
                  <Typography variant="h6">Information</Typography>
                </Box>
                <Grid container justify="center" spacing={useBreakpointUpCheck('md') ? 4 : 0}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                <TextValidator
                  name="priceDesc"
                  label="Primary Price Description"
                  value={values.priceDesc}
                  variant="outlined"
                  onChange={setText}
                  fullWidth
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
                <CategoriesPicker
                  category={values.category}
                  sub={values.sub}
                  series={values.series}
                  setText={setText}
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
                <TextValidator
                  name="link3d"
                  label="3D Link"
                  value={values.link3d}
                  variant="outlined"
                  onChange={setText}
                  fullWidth
                />
                <Grid container spacing={useBreakpointUpCheck('md') ? 4 : 0}>
                  <Grid item xs={12} md={5}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel style={{backgroundColor: 'white'}}>Alternate Codes</InputLabel>
                      <OutlinedInput
                        name="altCode"
                        labelWidth={60}
                        onKeyPress={e => {
                          if (e.which !== 13 || e.target.value === '') return
                          const newAltCodes = values.altCode
                          newAltCodes.push(e.target.value)
                          setArray(newAltCodes, e.target.name)
                          e.target.value = ''
                        }}
                        onBlur={e => {
                          if (e.target.value === '') return
                          const newAltCodes = values.altCode
                          newAltCodes.push(e.target.value)
                          setArray(newAltCodes, e.target.name)
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
                    <Box>
                      {values.altCode.map((alt, index) => (
                        <Chip
                          key={alt}
                          label={alt}
                          onDelete={() => {
                            const oldAltCode = values.altCode
                            const newAltCodes = oldAltCode.filter((old, oldIndex) => oldIndex !== index)
                            setArray(newAltCodes, 'altCode')
                          }}
                          style={{ margin: '2.5px 5px' }}
                        />
                      ))}
                    </Box>
                    <Divider />
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
                  <Grid item xs={12} md={1}>
                    <Divider orientation="vertical" style={{ margin: 'auto' }} />
                  </Grid>
                  <FilesInput
                    code={values.code}
                    files={values.file}
                    disabled={!values.code || invalidCode}
                    posting={posting}
                    setArray={setArray}
                    setPosting={setPosting}
                    deletedFiles={deletedFiles}
                    setDeletedFiles={setDeletedFiles}
                  />
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
              <Grid item xs={12} md={5}>
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
              featureImage={values.featureImage}
              isFeature={values.isFeature}
              code={values.code}
              posting={posting}
              invalidCode={invalidCode}
              setPosting={setPosting}
              setText={setText}
              setArray={setArray}
              deletedFiles={deletedFiles}
              setDeletedFiles={setDeletedFiles}
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
              deletedFiles={deletedFiles}
              setDeletedFiles={setDeletedFiles}
            />
            <Box my={4}>
              <Divider />
            </Box>
            <Box my={2}>
              <Typography variant="h6">Size (For Delivery Purposes)</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextValidator
                  name="h"
                  type="number"
                  label="Height"
                  value={values.size.h}
                  variant="outlined"
                  onChange={(e) => setAll({ ...values, size: { ...values.size, h: e.target.value } })}
                  validators={['required']}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="d"
                  type="number"
                  label="Depth"
                  value={values.size.d}
                  variant="outlined"
                  onChange={(e) => setAll({ ...values, size: { ...values.size, d: e.target.value } })}
                  validators={['required']}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="w"
                  type="number"
                  label="Width"
                  value={values.size.w}
                  variant="outlined"
                  onChange={(e) => setAll({ ...values, size: { ...values.size, w: e.target.value } })}
                  validators={['required']}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box my={4}>
              <Divider />
            </Box>
            <Box my={2}>
              <Typography variant="h6">Management</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <FormGroup
                  row
                  style={{
                    padding: '0 10px',
                    margin: '8px 0px',
                    justifyContent: 'flex-end'
                  }}
                >
                  <FormControlLabel
                    control={<Switch checked={values.forSale} onChange={setSwitch} name="forSale" color="primary" />}
                    label="Allow Purchase"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={<Switch checked={values.isArchive} onChange={setSwitch} name="isArchive" color="primary" />}
                    label="Archive"
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
                disabled={posting || !values.code || values.images.length < 1}
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
