import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import {
  Publish as UploadIcon
} from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'
import { mediaBaseURL } from 'utils'
import request from 'utils/request'
import { queryGetProductHighlight, queryGetProducts, mutationUpdateProductHighlight } from '../constant'

const HighlightTwo = () => {
  const [posting, setPosting] = useState(false)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [prodOne, setProdOne] = useState('')
  const [prodTwo, setProdTwo] = useState('')
  const [prodThree, setProdThree] = useState('')
  const [productOption, setProductOption] = useState([])
  const { openSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    getData()

    request(queryGetProducts)
      .then(res => {
        const { getProducts, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getProducts) {
          setProductOption(getProducts)
        }
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }, [])

  const getData = () => {
    setPosting(true)
    request(queryGetProductHighlight)
      .then(res => {
        const { getProductHighlight, errors } = res.data.data
        const data = getProductHighlight[0]
        setId(data._id)
        setTitle(data.title)
        setSubtitle(data.subtitle)
        setProdOne(data.products[0]._id)
        setProdTwo(data.products[1]._id)
        setProdThree(data.products[2]._id)
        setPosting(false)
        if (errors) openSnackbar( errors.message, 'error' )
      })
  }
  
  const updateHighlightProduct = () => {
    setPosting(true)
    request(mutationUpdateProductHighlight, {
      productHighlightInput: {
        _id: id,
        title,
        subtitle,
        products: [ prodOne, prodTwo, prodThree ]
      }
    })
      .then(res => {
        const { updateProductHighlight } = res.data.data
        openSnackbar(updateProductHighlight, 'success')
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
          setPosting(false)
        })
    }
  }

  return (
    <Grid container spacing={2} style={{ border: '1px solid #707070', borderRadius: '10px', marginBottom: '30px' }}>
      <Grid item xs={12} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
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
          <Typography variant="h6">Feature Section Two</Typography>
        </Box>

        <Box display="flex" pt={2} mb={2}>
          <Typography variant="body1"><b>Video:&nbsp;</b></Typography>
          <a href={`${mediaBaseURL}featureCatVideo/feature-video-2.mp4`} target="_blank">
            Preview featureCatVideo/feature-video-2.mp4
          </a>
          {posting && <CircularProgress size={14} style={{ marginLeft: 'auto' }} />}
          {!posting && (
            <label htmlFor="video-button-two" style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <IconButton color="primary" aria-label="Upload Video" component="span" style={{ padding: 0 }}>
                <UploadIcon />
              </IconButton>
              Upload Video
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
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="products-one-options">Product 1</InputLabel>
            <Select
              labelId="products-one-options"
              value={prodOne}
              onChange={e => setProdOne(e.target.value)}
              label="Product"
            >
              {productOption.map(item => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" pt={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="products-two-options">Product 2</InputLabel>
            <Select
              labelId="products-two-options"
              value={prodTwo}
              onChange={e => setProdTwo(e.target.value)}
              label="Product"
            >
              {productOption.map(item => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" pt={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="products-three-options">Product 3</InputLabel>
            <Select
              labelId="products-three-options"
              value={prodThree}
              onChange={e => setProdThree(e.target.value)}
              label="Product"
            >
              {productOption.map(item => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box textAlign="right">
          <Button
            disabled={posting}
            variant="contained"
            color="primary"
            onClick={updateHighlightProduct}
          >
            SAVE
          </Button>
        </Box>
        
      </Grid>
    </Grid>
  )
}

export default HighlightTwo