import { ValidatorForm } from 'react-material-ui-form-validator'
import {
  Box,
  Button,
  Drawer,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const AddFeature = ({ value, isOpen, options, addProduct, closeEdit, setValue }) => (
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={() => closeEdit()}
  >
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box width="400px" p={3}>
        <Box mb={2}>
          <Typography variant="h5">Add product to be featured</Typography>
        </Box>
        <ValidatorForm onSubmit={addProduct}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="products-options">Product</InputLabel>
            <Select
              labelId="products-options"
              value={value}
              onChange={e => setValue(e.target.value)}
              label="Product"
            >
              {options.map(item => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box width="100%" textAlign="right">
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
              ADD
            </Button>
          </Box>
        </ValidatorForm>
      </Box>
    </MuiPickersUtilsProvider>
  </Drawer>
)

export default AddFeature
