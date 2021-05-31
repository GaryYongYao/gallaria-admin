import { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Drawer,
  Typography
} from '@material-ui/core'
import {
  AddCircle as AddIcon,
  HighlightOff as CloseIcon
} from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const EditDrawer = ({ chosen, isOpen, editCategory, closeEdit, setValue, setArray, setAll }) => {
  const [subCat, setSubCat] = useState('')
  const [seriesName, setSeriesName] = useState('')

  const addSeries = () => {
    if (subCat === '' || seriesName === '') return
    const newSeries = chosen.series
    newSeries.push({
      sub: subCat,
      name: seriesName.trim()
    })
    setArray(newSeries, 'series')
    setSubCat('')
    setSeriesName('')
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeEdit}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box width="400px" p={3}>
          <Box mb={2}>
            <Typography variant="h5">Edit Category - {chosen.name}</Typography>
          </Box>
          <ValidatorForm
            onSubmit={editCategory}
            onKeyPress={e => (e.which === 13) && e.preventDefault()}
          >
            <TextValidator
              name="name"
              label="Name"
              variant="outlined"
              value={chosen.name}
              onChange={setValue}
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
                const newSubs = chosen.sub
                newSubs.push(e.target.value.trim())
                setArray(newSubs, e.target.name)
                e.target.value = ''
              }}
              onBlur={e => {
                if (e.target.value === '') return
                const newSubs = chosen.sub
                newSubs.push(e.target.value.trim())
                setArray(newSubs, e.target.name)
                e.target.value = ''
              }}
              variant="outlined"
              fullWidth
            />
            <Box>
              {chosen.sub.map((item, index) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => {
                    const oldSubs = chosen.sub
                    const newSubs = oldSubs.filter((old, oldIndex) => oldIndex !== index)
                    const oldSeries = chosen.series
                    const newSeries = oldSeries.filter((old) => old.sub !== item)
                    setAll({
                      _id: chosen._id,
                      name: chosen.name,
                      sub: newSubs,
                      series: newSeries
                    })
                  }}
                  style={{ margin: '2.5px 5px' }}
                />
              ))}
            </Box>
            {chosen.sub.length > 0 && (
              <>
                <Box my={3}> 
                  <Divider orientation="horizontal" />
                </Box>
                <Box mb={3}> 
                  <Typography variant="h6">Sub-Category Series</Typography>
                </Box>
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Grid item xs={8}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="category-options">Sub-Category</InputLabel>
                      <Select
                        labelId="category-options"
                        value={subCat}
                        onChange={e => setSubCat(e.target.value)}
                        label="Sub-Category"
                      >
                        {chosen.sub.map(s => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
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
                  <Grid item xs={12}>
                    {chosen.series.map((item, index) => (
                      <Chip
                        key={item.name}
                        label={
                          <div
                            onClick={() => {
                              if (subCat !== '' || seriesName !== '') return
                              setSubCat(item.sub)
                              setSeriesName(item.name)
                              const oldSeries = chosen.series
                              const newSeries = oldSeries.filter((old, oldIndex) => oldIndex !== index)
                              setArray(newSeries, 'series')
                            }}
                          >
                            {item.sub}: {item.name}
                          </div>
                        }
                        onDelete={() => {
                          const oldSeries = chosen.series
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
            <Box width="100%" textAlign="right" mt={3}>
              <Button
                variant="contained"
                onClick={closeEdit}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </ValidatorForm>
        </Box>
      </MuiPickersUtilsProvider>
    </Drawer>
  )
}

export default EditDrawer
