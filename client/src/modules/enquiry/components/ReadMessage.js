import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  FormControlLabel,
  Grid
} from '@material-ui/core'
import moment from 'moment'

const ReadMessage = ({ chosen, isOpen, read, closeEdit, setReplied }) => (
  <Dialog
    open={isOpen}
    onClose={closeEdit}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogContent style={{ minWidth: '500px' }}>
      <DialogContentText>
        {moment(chosen.createdDate).format('DD/MM/YYYY (ddd) hh:mm A')}
      </DialogContentText>
      <Divider />
      <DialogContentText>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <b>From {chosen.name}</b>
          </Grid>
          <Grid item xs={6}>
            <b style={{ textTransform: 'capitalize' }}>Profile: {chosen.profile}</b>
          </Grid>
          <Grid item xs={6}>
            <b>Company name: </b>{chosen.company}
          </Grid>
        </Grid>
      </DialogContentText>
      <Divider />
      <DialogContentText>
        <b>Subject: </b>{chosen.subject}
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
      <DialogContentText>
        <Grid container spacing={1} style={{ marginBottom: '15px' }}>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <b>PRODUCT</b>
          </Grid>
          <Grid item xs={3}>
            <b>UNIT PRICE</b>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            <b>QUANTITY</b>
          </Grid>
        </Grid>
        <div>
          {chosen.products?.map((product, i) => (
            <Grid container spacing={1} style={{ marginBottom: '15px' }}>
              <Grid xs={1}>{i + 1}</Grid>
              <Grid xs={6}>
                <div>
                  <b>{product.info.name}</b>
                </div>
                <div>
                  {product.variant}
                </div>
              </Grid>
              <Grid xs={3}>AUD ${product.info.price}</Grid>
              <Grid xs={2} style={{ textAlign: 'right' }}>{product.quantity}</Grid>
            </Grid>
          ))}
        </div>
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
