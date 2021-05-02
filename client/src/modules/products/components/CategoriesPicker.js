import { useState, useContext, useEffect } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { useBreakpointUpCheck } from 'utils'
import request from 'utils/request'
import { SnackbarContext } from 'common/components/Snackbar'
import { queryGetCategoriesOption, queryGetSubCategoriesOption } from '../constant'


function CategoriesPicker({ category, sub, series, setText }) {
  const [categoryOption, setCategoryOption] = useState([])
  const [subcategoryOption, setSubCategoryOption] = useState([])
  const [seriesOption, setSeriesOption] = useState([])
  const { openSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    request(queryGetCategoriesOption)
      .then(res => {
        const { getCategoriesOption, errors } = res.data.data
        if (errors) {
          openSnackbar(
            errors.message,
            'error'
          )
        }
        if (getCategoriesOption) {
          setCategoryOption(getCategoriesOption)
        }
      })
  }, [])

  useEffect(() => {
    if (!category) return
    request(queryGetSubCategoriesOption, { id: category })
      .then(res => {
        const { getSubCategoriesOption, errors } = res.data.data
        if (errors) {
          openSnackbar(
            errors.message,
            'error'
          )
        }
        if (getSubCategoriesOption) {
          setSubCategoryOption(getSubCategoriesOption)
        }
      })
  }, [category])

  useEffect(() => {
    if (!sub) return
    const options = subcategoryOption.filter(option => option.sub === sub)
    if (options.length < 1) return
    setSeriesOption(options[0].series)
    console.log(options[0].series)
  }, [sub])

  return (
    <Grid container spacing={useBreakpointUpCheck('md') ? 4 : 0}>
      <Grid item xs={12} md={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="category-options">Category</InputLabel>
          <Select
            labelId="category-options"
            name="category"
            value={category}
            onChange={setText}
            label="Category"
          >
            {categoryOption.map(option => (
              <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="sub-options">Sub-Category</InputLabel>
          <Select
            labelId="sub-options"
            name="sub"
            value={sub}
            disabled={!category}
            onChange={setText}
            label="Sub-Category"
          >
            {subcategoryOption.map(option => (
              <MenuItem key={option.sub} value={option.sub}>{option.sub}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="sub-options">Series</InputLabel>
          <Select
            labelId="series-options"
            name="series"
            value={series}
            disabled={!sub || seriesOption.length < 1}
            onChange={setText}
            label="Series"
          >
            {seriesOption.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CategoriesPicker
