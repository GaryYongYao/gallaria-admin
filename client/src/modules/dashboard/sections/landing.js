import { useContext, useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'
import {
  Publish as UploadIcon
} from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'
import { mediaBaseURL } from 'utils'
import request from 'utils/request'
import { queryGetLandingMedia, mutationUpdateLandingMedia } from '../constant'

const LandingBackground = () => {
  const [posting, setPosting] = useState(false)
  const [desktop, setDesktop] = useState({})
  const [mobile, setMobile] = useState({})
  const { openSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setPosting(true)
    request(queryGetLandingMedia)
      .then(res => {
        const { getLandingMedia, errors } = res.data.data
        setDesktop(getLandingMedia[0])
        setMobile(getLandingMedia[1])
        setPosting(false)
        if (errors) openSnackbar( errors.message, 'error' )
      })
  }

  const handleUpload = (file, setting) => {

    if (file) {
      setPosting(true)
      const fileFormatName = `${file.name.split('.')[0]}`.replace(/ /g, '-').replace(/[\(\)']/g, '')
      const upload = new FormData()
      
      upload.append('file', file)
      upload.append('fileName', fileFormatName)
      upload.append('bucketFolder', 'landingBackground')

      APIRequest('POST', '/api/file-upload', upload)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            request(mutationUpdateLandingMedia, {
              landingMediaInput: {
                _id: setting._id,
                media: res.data.Key
              }
            })
              .then(res => {
                const { updateLandingMedia } = res.data.data
                openSnackbar(updateLandingMedia, 'success')
                getData()
              })
              .catch(err => {
                openSnackbar(
                  err.message,
                  'error'
                )
                setPosting(false)
              })
          }
        })
    }
  }

  return (
    <Grid container spacing={2} style={{ border: '1px solid #707070', borderRadius: '10px', marginBottom: '30px' }}>
      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <input
          accept="image/*,video/mp4"
          id="background-one-upload"
          type="file"
          onChange={e => {
            handleUpload(e.target.files[0], desktop)
          }}
          style={{ display: 'none' }}
        />

        <input
          accept="image/*"
          id="background-two-upload"
          type="file"
          onChange={e => {
            handleUpload(e.target.files[0], mobile)
          }}
          style={{ display: 'none' }}
        />

        <Box display="flex" pt={2}>
          <Typography variant="h6">Landing Background</Typography>
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Desktop Background:&nbsp;</b></Typography>
          <a href={`${mediaBaseURL}${encodeURIComponent(desktop?.media).replace('(', '%28').replace(')', '%29')}`} target="_blank">
            Preview
          </a>
          {posting && <CircularProgress size={14} style={{ marginLeft: 'auto' }} />}
          {!posting && (
            <label htmlFor="background-one-upload" style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <IconButton color="primary" aria-label="Upload Media" component="span" style={{ padding: 0 }}>
                <UploadIcon />
              </IconButton>
              Upload Media
            </label>
          )}
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Mobile Background:&nbsp;</b></Typography>
          <a href={`${mediaBaseURL}${encodeURIComponent(mobile?.media).replace('(', '%28').replace(')', '%29')}`} target="_blank">
            Preview
          </a>
          {posting && <CircularProgress size={14} style={{ marginLeft: 'auto' }} />}
          {!posting && (
            <label htmlFor="background-two-upload" style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <IconButton color="primary" aria-label="Upload Media" component="span" style={{ padding: 0 }}>
                <UploadIcon />
              </IconButton>
              Upload Media
            </label>
          )}
        </Box>
        
      </Grid>
    </Grid>
  )
}

export default LandingBackground