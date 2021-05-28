import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core'
import {
  Publish as UploadIcon
} from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'
import { mediaBaseURL } from 'utils'
import request from 'utils/request'
import { queryGetCatHighlight, mutationUpdateCatHighlight } from '../constant'

const HighlightOne = () => {
  const [posting, setPosting] = useState(false)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [catOne, setCatOne] = useState('')
  const [catTwo, setCatTwo] = useState('')
  const { openSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setPosting(true)
    request(queryGetCatHighlight)
      .then(res => {
        const { getCatHighlight, errors } = res.data.data
        const data = getCatHighlight[0]
        setId(data._id)
        setTitle(data.title)
        setSubtitle(data.subtitle)
        setCatOne(data.cat[0])
        setCatTwo(data.cat[1])
        setPosting(false)
        if (errors) openSnackbar( errors.message, 'error' )
      })
  }
  
  const updateHighlightCat = () => {
    setPosting(true)
    request(mutationUpdateCatHighlight, {
      catHighlightInput: {
        _id: id,
        title,
        subtitle,
        cat: [ catOne, catTwo ]
      }
    })
      .then(res => {
        const { updateCatHighlight } = res.data.data
        openSnackbar(updateCatHighlight, 'success')
        getData()
        setPosting(false)
      })
      .catch(err => {
        openSnackbar(
          err.message,
          'error'
        )
        setPosting(false)
      })
  }

  const handleUploadVideo = (file) => {

    if (file) {
      setPosting(true)
      const fileFormatName = 'feature-video-1'
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
          setPosting(false)
        })
    }
  }
  
  const handleUploadImage = (file, fileName) => {
    if (file) {
      setPosting(true)
      const upload = new FormData()
      
      upload.append('file', file)
      upload.append('fileName', fileName)
      upload.append('bucketFolder', 'featureCatImg')


      APIRequest('POST', '/api/file-upload', upload)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
          }
          setPosting(false)
        })
    }
  }

  return (
    <Grid container spacing={2} style={{ border: '1px solid #707070', borderRadius: '10px' }}>
      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <input
          accept="video/mp4"
          id="video-button-one"
          type="file"
          disabled={posting}
          onChange={e => {
            handleUploadVideo(e.target.files[0])
          }}
          style={{ display: 'none' }}
        />

        <input
          accept="image/png"
          id="cat-photo-one"
          type="file"
          disabled={posting}
          onChange={e => {
            handleUploadImage(e.target.files[0], 'cat-one')
          }}
          style={{ display: 'none' }}
        />

        <input
          accept="image/png"
          id="cat-photo-two"
          type="file"
          disabled={posting}
          onChange={e => {
            handleUploadImage(e.target.files[0], 'cat-two')
          }}
          style={{ display: 'none' }}
        />

        <Box display="flex" pt={2}>
          <Typography variant="h6">Feature Section One</Typography>
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Video:&nbsp;</b></Typography>
          <a href={`${mediaBaseURL}featureCatVideo/feature-video-1.mp4`} target="_blank">
            Preview featureCatVideo/feature-video-1.mp4
          </a>
          {posting && <CircularProgress size={14} style={{ marginLeft: 'auto' }} />}
          {!posting && (
            <label htmlFor="video-button-one" style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <IconButton color="primary" aria-label="Upload Video" component="span" style={{ padding: 0 }}>
                <UploadIcon />
              </IconButton>
              Upload Video
            </label>
          )}
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Category One Photo:&nbsp;</b></Typography>
          <a href={`${mediaBaseURL}featureCatImg/cat-one.png`} target="_blank">
            Preview featureCatImg/cat-one.png
          </a>
          {posting && <CircularProgress size={14} style={{ marginLeft: 'auto' }} />}
          {!posting && (
            <label htmlFor="cat-photo-one" style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <IconButton color="primary" aria-label="Upload Image" component="span" style={{ padding: 0 }}>
                <UploadIcon />
              </IconButton>
              Upload Image for Category One
            </label>
          )}
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Category Two Photo:&nbsp;</b></Typography>
          <a href={`${mediaBaseURL}featureCatImg/cat-two.png`} target="_blank">
            Preview featureCatImg/cat-two.png
          </a>
          {posting && <CircularProgress size={14} style={{ marginLeft: 'auto' }} />}
          {!posting && (
            <label htmlFor="cat-photo-two" style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <IconButton color="primary" aria-label="Upload Image" component="span" style={{ padding: 0 }}>
                <UploadIcon />
              </IconButton>
              Upload Image for Category Two
            </label>
          )}
        </Box>

        <Box display="flex" pt={2}>
          <TextField 
            name="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" pt={2}>
          <TextField 
            name="subtitle"
            label="Subtitle"
            variant="outlined"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" pt={2}>
          <TextField 
            name="catOne"
            label="Category One"
            variant="outlined"
            value={catOne}
            onChange={(e) => setCatOne(e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" pt={2}>
          <TextField 
            name="catTwo"
            label="Category Two"
            variant="outlined"
            value={catTwo}
            onChange={(e) => setCatTwo(e.target.value)}
            fullWidth
          />
        </Box>
        <Box textAlign="right">
          <Button
            disabled={posting}
            variant="contained"
            color="primary"
            onClick={updateHighlightCat}
          >
            SAVE
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HighlightOne
