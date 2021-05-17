import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  FormControlLabel
} from '@material-ui/core'
import moment from 'moment'

const ReadMessage = ({ chosen, isOpen, read, closeEdit, setReplied }) => (
  <Dialog
    open={isOpen}
    onClose={closeEdit}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogContent style={{ minWidth: '400px' }}>
      <DialogContentText>
        <b>From {chosen.name}</b>
      </DialogContentText>
      <DialogContentText>
        <b>Company name: </b>{chosen.company}
      </DialogContentText>
      <Divider />
      <DialogContentText>
        {moment(chosen.createdDate).format('DD/MM/YYYY (ddd) hh:mm A')}
      </DialogContentText>
      <Divider />
      <DialogContentText>
        Email: <a href={`mailto: ${chosen.email}`}>{chosen.email}</a>
      </DialogContentText>
      <DialogContentText>
        Phone: {chosen.phone}
      </DialogContentText>
      <Divider />
      <DialogContentText>
        {chosen.message}
      </DialogContentText>
      <Divider />
    </DialogContent>
    <DialogActions>
      <FormControlLabel
        control={
          <Checkbox
            checked={chosen.replied}
            onChange={setReplied}
            name="replied"
            color="primary"
          />
        }
        label="Replied"
      />
      <Button
        onClick={() => {
          read()
          closeEdit()
        }}
        color="primary"
        autoFocus
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
)

export default ReadMessage
