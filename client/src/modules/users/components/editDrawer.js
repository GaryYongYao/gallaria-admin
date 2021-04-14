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
import { userRoles } from '../constant'

const EditDrawer = ({ chosen, isOpen, updateUser, closeEdit, setValue }) => (
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={() => closeEdit()}
  >
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box width="400px" p={3}>
        <Box mb={2}>
          <Typography variant="h5">Edit User - {chosen.username}</Typography>
        </Box>
        <ValidatorForm onSubmit={() => updateUser()}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="role-options">Role</InputLabel>
            <Select
              labelId="role-options"
              name="role"
              value={chosen.role}
              onChange={setValue}
              label="Role"
            >
              {userRoles.map(role => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box width="100%" textAlign="right">
            <Button
              variant="contained"
              onClick={() => closeEdit()}
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

export default EditDrawer
