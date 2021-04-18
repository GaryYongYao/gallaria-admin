import { Fragment } from 'react'
import {
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Delete as DeleteIcon
} from '@material-ui/icons'
import { TextValidator } from 'react-material-ui-form-validator'

function DetailsInput({ posting, details, setArray }) {
  const handleChange = (e, i) => {
    const newDetails = details
    newDetails[i][e.target.name] = e.target.value
    setArray(newDetails, 'details')
  }

  const handleDelete = (i) => {
    const newDetails = details
    newDetails.splice(i, 1)
    setArray(newDetails, 'details')
  }

  return (
    <Grid container spacing={3}>
      {details.length < 1 && (
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
          <Typography variant="body1">No Details Added</Typography>
          <Typography variant="body1">Add by Clicking on "ADD DETAILS" Button</Typography>
        </Grid>
      )}
      {details.map((detail, i) => (
        <Fragment key={`detail${i}`}>
          <Grid item xs={5}>
            <TextValidator
              name="title"
              label="Title"
              variant="outlined"
              value={detail.title}
              onChange={(e) => handleChange(e, i)}
              fullWidth
            />
            <IconButton
              disabled={posting}
              onClick={() => handleDelete(i)}
              aria-label={`Delete ${detail.title}`}
              style={{ padding: 0 }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
          <Grid item xs={7}>
            <TextValidator
              name="info"
              label="Info"
              multiline
              rows={7}
              variant="outlined"
              value={detail.info}
              onChange={(e) => handleChange(e, i)}
              fullWidth
            />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  )
}

export default DetailsInput