import { useState, useContext, useEffect } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import request from 'utils/request'
import { SnackbarContext } from 'common/components/Snackbar'
import { queryGetCategoriesOption, queryGetSubCategoriesOption } from '../constant'


function CategoriesPicker({ category, sub, setText }) {
  const [categoryOption, setCategoryOption] = useState([])
  const [subcategoryOption, setSubCategoryOption] = useState([])
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

  return (
    <Grid container justify="center" spacing={4}>
      <Grid item xs={6}>
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
      <Grid item xs={6}>
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
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CategoriesPicker
