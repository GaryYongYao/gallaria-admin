import { useState, useContext } from 'react'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import {
  ArrowBackIos as BackIcon,
  AddCircle as AddIcon,
  HighlightOff as CloseIcon
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
  const { values, setText, setArray, setAll } = useForm({
    name: '',
    sub: [],
    series: []
  })
  const [posting, setPosting] = useState(false)
  const [subCat, setSubCat] = useState('')
  const [seriesName, setSeriesName] = useState('')
  const { openSnackbar } = useContext(SnackbarContext)
  const { history } = useRoutes()

  const handleSubmit = () => {
    setPosting(true)
    const { name, sub, series } = values

    request(mutationCreateCategory, {
      categoryInput: {
        name: name.trim(),
        sub,
        series,
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

  const addSeries = () => {
    if (subCat === '' || seriesName === '') return
    const newSeries = values.series
    newSeries.push({
      sub: subCat,
      name: seriesName.trim()
    })
    setArray(newSeries, 'series')
    setSubCat('')
    setSeriesName('')
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
            <Box> 
              <Divider orientation="horizontal" style={{ margin: 'auto' }} />
            </Box>
            <TextValidator
              name="sub"
              label="Sub-Categories"
              helperText="Enter to add sub-category"
              onKeyPress={e => {
                const { value, name } = e.target
                if (e.which !== 13 || value === ''|| values.sub.includes(value)) return
                const newSubs = values.sub
                newSubs.push(value.trim())
                setArray(newSubs, name)
                e.target.value = ''
              }}
              onBlur={e => {
                const { value, name } = e.target
                if (value === '' || values.sub.includes(value)) return
                const newSubs = values.sub
                newSubs.push(value)
                setArray(newSubs, name)
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
                    const oldSeries = values.series
                    const newSeries = oldSeries.filter((old) => old.sub !== item)
                    setAll({
                      name: values.name,
                      sub: newSubs,
                      series: newSeries
                    })
                  }}
                  style={{ margin: '2.5px 5px' }}
                />
              ))}
            </Box>
            {values.sub.length > 0 && (
              <>
                <Box my={3}> 
                  <Divider orientation="horizontal" />
                </Box>
                <Box mb={3}> 
                  <Typography variant="h6">Sub-Category Series</Typography>
                </Box>
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Grid item xs={12} md={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="category-options">Sub-Category</InputLabel>
                      <Select
                        labelId="category-options"
                        value={subCat}
                        onChange={e => setSubCat(e.target.value)}
                        label="Sub-Category"
                      >
                        {values.sub.map(s => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={11} md={8}>
                    <TextValidator
                      label="Series Name"
                      disabled={!subCat}
                      onKeyPress={e => {
                        if (e.which !== 13 || e.target.value === '') return
                        addSeries()
                      }}
                      value={seriesName}
                      onChange={e => setSeriesName(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      disabled={!seriesName && !subCat}
                      color="primary"
                      aria-label="Remove Series"
                      onClick={() => {
                        setSubCat('')
                        setSeriesName('')
                      }}
                      component="span"
                    >
                      <CloseIcon />
                    </IconButton>
                    <IconButton
                      disabled={!seriesName && !subCat}
                      color="primary"
                      aria-label="Add Series"
                      component="span"
                      onClick={addSeries}
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    {values.series.map((item, index) => (
                      <Chip
                        key={item.name}
                        label={
                          <div
                            onClick={() => {
                              if (subCat !== '' || seriesName !== '') return
                              setSubCat(item.sub)
                              setSeriesName(item.name)
                              const oldSeries = values.series
                              const newSeries = oldSeries.filter((old, oldIndex) => oldIndex !== index)
                              setArray(newSeries, 'series')
                            }}
                          >
                            {item.sub}: {item.name}
                          </div>
                        }
                        onDelete={() => {
                          const oldSeries = values.series
                          const newSeries = oldSeries.filter((old, oldIndex) => oldIndex !== index)
                          setArray(newSeries, 'series')
                        }}
                        style={{ margin: '2.5px 5px', cursor: 'pointer' }}
                      />
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
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
