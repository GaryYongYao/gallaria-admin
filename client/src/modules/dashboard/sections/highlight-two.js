import { useContext, useState } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Publish as UploadIcon
} from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'
import { mediaBaseURL } from 'utils'

const HighlightTwo = () => {
  const { openSnackbar } = useContext(SnackbarContext)

  const handleUploadVideo = (file) => {

    if (file) {
      setVideo('')
      const fileFormatName = 'feature-video-2'
      const upload = new FormData()
      
      upload.append('file', file)
      upload.append('fileName', fileFormatName)
      upload.append('bucketFolder', 'featureCatVideo')


      APIRequest('POST', '/api/file-upload', upload)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
          }
        })
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <input
          accept="video/mp4"
          id="video-button-two"
          type="file"
          onChange={e => {
            handleUploadVideo(e.target.files[0])
          }}
          style={{ display: 'none' }}
        />

        <Box display="flex" pt={2}>
          <Typography variant="h6">Feature Section One</Typography>
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Video: </b></Typography>
          <a href={`${mediaBaseURL}featureCatVideo/feature-video-2.mp4`} target="_blank">
            Preview featureCatVideo/feature-video-2.mp4
          </a>
          <label htmlFor="video-button-two" style={{ marginLeft: 'auto' }}>
            <IconButton color="primary" aria-label="Upload Video" component="span" style={{ padding: 0 }}>
              <UploadIcon />
            </IconButton>
            Upload Video
          </label>
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Title: </b></Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HighlightTwo
