import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  Box,
  Button,
  Chip,
  Drawer,
  Typography
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const EditDrawer = ({ chosen, isOpen, editCategory, closeEdit, setValue, setArray }) => (
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
              newSubs.push(e.target.value)
              setArray(newSubs, e.target.name)
              e.target.value = ''
            }}
            onBlur={e => {
              if (e.target.value === '') return
              const newSubs = chosen.sub
              newSubs.push(e.target.value)
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
                  setArray(newSubs, 'sub')
                }}
                style={{ margin: '2.5px 5px' }}
              />
            ))}
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

export default EditDrawer
